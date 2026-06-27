import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { idx2Str, move2Str, getPieceIdx, EMPTY, W_MAN, B_MAN, W_KING, B_KING } from '../client/js/game/constants.js';

describe('constants', () => {
  it('idx2Str converts correctly', () => {
    assert.equal(idx2Str(0), 'a1');
    assert.equal(idx2Str(7), 'h1');
    assert.equal(idx2Str(63), 'h8');
    assert.equal(idx2Str(27), 'd4');
  });

  it('getPieceIdx maps pieces correctly', () => {
    assert.equal(getPieceIdx(W_MAN), 0);
    assert.equal(getPieceIdx(B_MAN), 1);
    assert.equal(getPieceIdx(W_KING), 2);
    assert.equal(getPieceIdx(B_KING), 3);
  });

  it('move2Str formats simple moves', () => {
    const m = { from: 9, to: 18, path: [18], captured: [], promo: false, isPawn: true, capKings: 0 };
    assert.equal(move2Str(m), 'b2-c3');
  });

  it('move2Str formats captures', () => {
    // Single capture: b2(9) captures c3(18) lands on d4(27)
    const m = { from: 9, to: 27, path: [27], captured: [18], promo: false, isPawn: true, capKings: 0 };
    assert.equal(move2Str(m), 'b2xd4');
  });

  it('idx2Str covers all corners', () => {
    assert.equal(idx2Str(0), 'a1');
    assert.equal(idx2Str(7), 'h1');
    assert.equal(idx2Str(56), 'a8');
    assert.equal(idx2Str(63), 'h8');
  });

  it('move2Str formats multi-capture moves', () => {
    const m = { from: 0, to: 27, path: [9, 18, 27], captured: [9, 18], promo: false, isPawn: true, capKings: 0 };
    assert.equal(move2Str(m), 'a1xb2xc3xd4');
  });

  it('move2Str handles promotion moves', () => {
    // b2(9) → g7(54) is a promotion (row 7)
    const m = { from: 9, to: 54, path: [54], captured: [], promo: true, isPawn: true, capKings: 0 };
    assert.equal(move2Str(m), 'b2-g7');
  });
});
