'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { plan } = require('./ci-plan.cjs');
const initialized = ['backend/go.mod', 'backend/main.go', 'mobile/package.json', 'mobile/package-lock.json', 'mobile/src/app.tsx'];

test('documentation-only repository is explicitly uninitialized', () => {
  assert.deepEqual(plan(['README.md', 'backend/AGENTS.md', 'mobile/constitution.md'], ['.github/workflows/ci.yml']),
    {backend:false, backend_state:'not_initialized', mobile:false, mobile_state:'not_initialized'});
});
test('backend changes run only backend', () => {
  const p = plan(initialized, ['backend/main.go']);
  assert.equal(p.backend, true); assert.equal(p.mobile, false);
});
test('mobile changes run only mobile', () => {
  const p = plan(initialized, ['mobile/src/app.tsx']);
  assert.equal(p.backend, false); assert.equal(p.mobile, true);
});
test('shared workflow changes run both initialized components', () => {
  const p = plan(initialized, ['.github/workflows/ci.yml']);
  assert.equal(p.backend, true); assert.equal(p.mobile, true);
});
test('root documentation skips both initialized components', () => {
  const p = plan(initialized, ['README.md']);
  assert.equal(p.backend_state, 'unchanged'); assert.equal(p.mobile_state, 'unchanged');
});
test('manual and new-branch runs cover both components', () => {
  const p = plan(initialized, [], true);
  assert.equal(p.backend, true); assert.equal(p.mobile, true);
});
test('adding a module activates backend', () => {
  assert.equal(plan(['backend/go.mod'], ['backend/go.mod']).backend, true);
});
test('Go source without manifest fails instead of skipping', () => {
  assert.throws(() => plan(['backend/main.go'], ['backend/main.go']), /go.mod/);
});
test('mobile source without manifest fails instead of skipping', () => {
  assert.throws(() => plan(['mobile/app.config.ts'], ['mobile/app.config.ts']), /package.json/);
});
test('mobile manifest without lockfile fails', () => {
  assert.throws(() => plan(['mobile/package.json'], ['mobile/package.json']), /package-lock/);
});
test('deleted and renamed component paths still trigger CI', () => {
  assert.equal(plan(initialized, ['backend/deleted.go', 'mobile/old.tsx']).backend, true);
  assert.equal(plan(initialized, ['backend/deleted.go', 'mobile/old.tsx']).mobile, true);
});
test('similar directory prefixes do not trigger unrelated jobs', () => {
  const p = plan(initialized, ['backend-old/main.go', 'mobile-old/app.tsx']);
  assert.equal(p.backend, false); assert.equal(p.mobile, false);
});
