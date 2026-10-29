'use strict';
const {test} = require('node:test');
const assert = require('node:assert/strict');
const {check, goCoverage, mobileCoverage} = require('./coverage.cjs');
test('Go counts statements rather than blocks', () => {
  const g = goCoverage('mode: atomic\nexample/internal/domain/a.go:1.1,2.2 8 1\nexample/internal/domain/a.go:3.1,4.2 2 0\nexample/internal/usecase/a.go:1.1,2.2 1 1\n');
  assert.deepEqual(g.domain, {total:10,covered:8}); check(g);
});
test('low coverage fails', () => assert.throws(() => check({domain:{total:10,covered:7}}), /inferior/));
test('declaration-only Go packages have no measurable statements', () => check(goCoverage('mode: atomic\n')));
test('malformed Go report fails', () => assert.throws(() => goCoverage('mode: atomic\nbad\n'), /Invalid/));
test('mobile considers only lib and feature hooks', () => {
  const metric = {total:10,covered:8};
  const counters = {statements:metric,branches:metric,functions:metric,lines:metric};
  const groups = mobileCoverage({'/repo/mobile/src/lib/a.ts':counters, '/repo/mobile/src/features/auth/hooks/a.ts':counters,
    '/repo/mobile/src/components/Button.tsx':{statements:{total:100,covered:0}}});
  assert.equal(groups['lib/statements'].covered, 8); assert.equal(groups['hooks/lines'].total, 10); check(groups);
});
test('mobile Windows paths are normalized', () => {
  const m = {total:1,covered:1};
  assert.ok(mobileCoverage({'C:\\repo\\mobile\\src\\lib\\a.ts':{statements:m,branches:m,functions:m,lines:m}})['lib/lines']);
});
