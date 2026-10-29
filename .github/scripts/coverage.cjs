'use strict';
const fs = require('node:fs');

function check(groups, threshold = 80) {
  for (const [name, counts] of Object.entries(groups)) {
    const total = counts.total;
    if (!total) { console.log(name + ': sin sentencias medibles'); continue; }
    const percent = counts.covered / total * 100;
    console.log(name + ': ' + percent.toFixed(2) + '%');
    if (percent < threshold) throw new Error(name + ': cobertura inferior a ' + threshold + '%');
  }
}
function goCoverage(text) {
  const groups = {domain:{total:0,covered:0}, usecase:{total:0,covered:0}};
  for (const line of text.trim().split(/\r?\n/).slice(1)) {
    const m = /^(.+):\d+\.\d+,\d+\.\d+\s+(\d+)\s+(\d+)$/.exec(line);
    if (!m) throw new Error('Invalid Go coverage record');
    const group = /\/internal\/(domain|usecase)\//.exec(m[1]);
    if (group) {
      groups[group[1]].total += Number(m[2]);
      if (Number(m[3]) > 0) groups[group[1]].covered += Number(m[2]);
    }
  }
  return groups;
}
function mobileCoverage(summary) {
  const groups = {};
  for (const [file, counters] of Object.entries(summary)) {
    const path = file.replaceAll('\\', '/');
    if (file === 'total' || !/\/src\/(?:lib\/|features\/[^/]+\/hooks\/)/.test(path)) continue;
    for (const metric of ['statements', 'branches', 'functions', 'lines']) {
      if (!counters[metric]) throw new Error('Missing coverage metric: ' + metric);
      const key = (/\/src\/lib\//.test(path) ? 'lib' : 'hooks') + '/' + metric;
      groups[key] ||= {total:0,covered:0};
      groups[key].total += counters[metric].total;
      groups[key].covered += counters[metric].covered;
    }
  }
  return groups;
}
module.exports = { check, goCoverage, mobileCoverage };
if (require.main === module) {
  const [kind, path] = process.argv.slice(2);
  if (kind === 'go') check(goCoverage(fs.readFileSync(path, 'utf8')));
  else if (kind === 'mobile') check(mobileCoverage(JSON.parse(fs.readFileSync(path, 'utf8'))));
  else throw new Error('Use coverage.cjs go|mobile <report>');
}
