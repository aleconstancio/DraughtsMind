import { State } from './state.js';

let gameState = new State();
let selIdx = -1;
let valTgt = [];
let lastM = null;

export function getState() { return gameState; }
export function setState(s) { gameState = s; }
export function getSelection() { return { selIdx, valTgt, lastM }; }
export function selectSquare(idx) {
  if (gameState.board[idx] !== 0 && Math.sign(gameState.board[idx]) === gameState.turn) {
    selIdx = idx;
    valTgt = gameState.getMoves().filter(m => m.from === idx);
  } else {
    selIdx = -1;
    valTgt = [];
  }
}
export function clearSelection() { selIdx = -1; valTgt = []; }
export function findMoveTo(idx) { return valTgt.find(m => m.to === idx); }
export function applyMove(m) {
  gameState.applyMove(m);
  lastM = m;
  selIdx = -1;
  valTgt = [];
}
export function resetState() {
  gameState = new State();
  selIdx = -1;
  valTgt = [];
  lastM = null;
}
