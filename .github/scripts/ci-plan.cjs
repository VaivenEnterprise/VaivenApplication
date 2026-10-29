'use strict';
const fs = require('node:fs');
const { execFileSync } = require('node:child_process');

function plan(files, changed, force = false) {
  const present = new Set(files);
  const shared = force || changed.some(p => p.startsWith('.github/') ||
    ['.gitignore', '.gitattributes', 'go.work', 'go.work.sum', 'package.json', 'package-lock.json', 'tsconfig.json'].includes(p));
  const result = {};
  for (const [component, manifest, code] of [
    ['backend', 'backend/go.mod', /^backend\/(?!vendor\/).*\.go$/],
    ['mobile', 'mobile/package.json', /^mobile\/(?!node_modules\/).*\.(?:[cm]?js|jsx|tsx?)$/],
  ]) {
    const initialized = present.has(manifest);
    if (!initialized && files.some(p => code.test(p))) {
      throw new Error(component + ': hay codigo sin ' + manifest);
    }
    if (component === 'mobile' && initialized && !present.has('mobile/package-lock.json')) {
      throw new Error('mobile: falta package-lock.json para npm ci');
    }
    const touched = shared || changed.some(p => p.startsWith(component + '/'));
    result[component] = initialized && touched;
    result[component + '_state'] = !initialized ? 'not_initialized' : touched ? 'run' : 'unchanged';
  }
  return result;
}

function git(args) {
  return execFileSync('git', args, { encoding: 'utf8' }).split('\0').filter(Boolean);
}

function main() {
  const event = JSON.parse(fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8'));
  const isPR = process.env.GITHUB_EVENT_NAME === 'pull_request';
  const isPush = process.env.GITHUB_EVENT_NAME === 'push';
  const base = isPR ? event.pull_request.base.sha : event.before;
  const head = isPR ? event.pull_request.head.sha : event.after;
  const validSHA = value => typeof value === 'string' && /^[0-9a-f]{40}$/.test(value) && !/^0+$/.test(value);
  const force = (!isPR && !isPush) || !validSHA(base);
  if (!force && !validSHA(head)) throw new Error('Invalid event head SHA');
  const changed = force ? [] : git(['diff', '--name-only', '-z', base + (isPR ? '...' : '..') + head, '--']);
  const result = plan(git(['ls-files', '-z']), changed, force);
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, Object.entries(result).map(([k, v]) => k + '=' + v).join('\n') + '\n');
  }
  console.log(JSON.stringify(result));
}

module.exports = { plan };
if (require.main === module) main();
