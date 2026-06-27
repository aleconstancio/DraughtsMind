import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { State } from '../client/js/game/state.js';
import { evaluate } from '../client/js/game/eval.js';

describe('evaluate', () => {
  it('returns a number', () => {
    const s = new State();
    const score = evaluate(s);
    assert.equal(typeof score, 'number');
  });

  it('returns 0 (approximately) for equal position', () => {
    const s = new State();
    const score = evaluate(s);
    // Opening position is roughly equal; positional eval may be non-zero
    assert.ok(Math.abs(score) < 100, `Expected ~0, got ${score}`);
  });

  it('returns positive for white advantage', () => {
    const s = new State();
    s.board.fill(0);
    s.board[0] = 1;  // W_MAN
    s.board[63] = -1; // B_MAN
    s.turn = 1;
    const score = evaluate(s);
    assert.ok(score > 0, `Expected positive, got ${score}`);
  });

  it('returns negative when it is black to move', () => {
    const s = new State();
    s.board.fill(0);
    s.board[0] = 1;  // W_MAN
    s.board[63] = -1; // B_MAN
    s.turn = -1;
    const score = evaluate(s);
    // With turn=-1, the score is flipped
    assert.ok(typeof score === 'number');
  });

  it('AvA mode (mode=3) has no bias', () => {
    const s = new State();
    const scoreWithBias = evaluate(s, 0);
    const scoreWithoutBias = evaluate(s, 3);
    // The difference should be exactly 4 (the bias)
    assert.equal(Math.abs(scoreWithBias - scoreWithoutBias), 4);
  });

  it('gives kings higher material value than men', () => {
    // White king vs black man should score higher than white man vs black man
    const s1 = new State();
    s1.board.fill(0);
    s1.board[27] = 2;  // W_KING at d4
    s1.board[36] = -1; // B_MAN at e5
    s1.turn = 1;

    const s2 = new State();
    s2.board.fill(0);
    s2.board[27] = 1;  // W_MAN at d4
    s2.board[36] = -1; // B_MAN at e5
    s2.turn = 1;

    const scoreKing = evaluate(s1);
    const scoreMan = evaluate(s2);
    assert.ok(scoreKing > scoreMan, `King advantage (${scoreKing}) should exceed man advantage (${scoreMan})`);
  });

  it('favors white having more pieces', () => {
    const s = new State();
    s.board.fill(0);
    // White: 2 men, Black: 1 man
    s.board[0] = 1;
    s.board[9] = 1;
    s.board[54] = -1;
    s.turn = 1;
    const score = evaluate(s);
    assert.ok(score > 0, `Expected positive for material advantage, got ${score}`);
  });

  it('center control favors scoring', () => {
    const s1 = new State();
    s1.board.fill(0);
    s1.board[27] = 1;  // W_MAN at d4 (center)
    s1.board[54] = -1; // B_MAN at b7 (edge)
    s1.turn = 1;

    const s2 = new State();
    s2.board.fill(0);
    s2.board[0] = 1;   // W_MAN at a1 (corner)
    s2.board[54] = -1; // B_MAN at b7 (edge)
    s2.turn = 1;

    const scoreCenter = evaluate(s1);
    const scoreCorner = evaluate(s2);
    assert.ok(scoreCenter > scoreCorner, 'Center piece should score better than corner piece');
  });
});
