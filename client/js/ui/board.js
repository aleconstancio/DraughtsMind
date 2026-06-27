import { EMPTY, W_MAN, B_MAN, W_KING, B_KING, idx2Str, move2Str } from '../game/constants.js';
import { State } from '../game/state.js';

let gameState = new State();
let selIdx = -1;
let validMoves = [];
let lastMove = null;
let moveCallback = null;

const squares = [];

export function initDOM() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    squares.length = 0;
    for (let r = 7; r >= 0; r--) {
        for (let c = 0; c < 8; c++) {
            const idx = r * 8 + c;
            const dark = (r + c) % 2 === 0;
            const sq = document.createElement('div');
            sq.className = `square ${dark ? 'sq-dark' : 'sq-light'}`;
            sq.id = `sq-${idx}`;
            sq.onclick = () => onSquareClick(idx);
            board.appendChild(sq);
            squares[idx] = sq;
        }
    }
}

function onSquareClick(idx) {
    if (moveCallback) {
        const m = validMoves.find(m => m.to === idx);
        if (m) {
            moveCallback(m);
            return;
        }
        if (gameState.board[idx] !== EMPTY && Math.sign(gameState.board[idx]) === gameState.turn) {
            selIdx = idx;
            validMoves = gameState.getMoves().filter(m => m.from === idx);
        } else {
            selIdx = -1;
            validMoves = [];
        }
        render();
    }
}

export function render() {
    const capturePathSquares = new Set();
    const captureVictimSquares = new Set();
    if (selIdx !== -1 && validMoves.length > 0 && validMoves[0].captured.length > 0) {
        for (const m of validMoves) {
            for (const sq of m.path) capturePathSquares.add(sq);
            for (const sq of m.captured) captureVictimSquares.add(sq);
        }
    }

    for (let i = 0; i < 64; i++) {
        const sq = squares[i];
        if (!sq) continue;
        const isDark = ((i >> 3) + (i & 7)) % 2 === 0;
        let cn = `square ${isDark ? 'sq-dark' : 'sq-light'}`;
        if (selIdx === i) cn += ' highlight';
        else if (lastMove && (lastMove.from === i || lastMove.to === i)) cn += ' last-move';
        if (validMoves.find(m => m.to === i)) cn += ' suggestion';
        else if (isDark && captureVictimSquares.has(i)) cn += ' capture-hint';
        sq.className = cn;
        const p = gameState.board[i];
        sq.innerHTML = p !== EMPTY
            ? `<div class="piece ${Math.sign(p) === 1 ? 'white' : 'black'} ${Math.abs(p) === 2 ? 'king' : ''}"></div>`
            : '';
    }
    const be = document.getElementById('board');
    if (getFlipped()) be.classList.add('rotated');
    else be.classList.remove('rotated');
}

export function setMoveCallback(cb) {
    moveCallback = cb;
}

export function getGameState() {
    return gameState;
}

export function setGameState(s) {
    gameState = s;
}

export function selectSquare(idx) {
    selIdx = idx;
    validMoves = gameState.getMoves().filter(m => m.from === idx);
}

export function findMoveTo(idx) {
    return validMoves.find(m => m.to === idx);
}

export function applyMove(m) {
    gameState.applyMove(m);
    lastMove = m;
    selIdx = -1;
    validMoves = [];
}

export function resetBoard() {
    gameState = new State();
    selIdx = -1;
    validMoves = [];
    lastMove = null;
}

export function updateCoords(flipped) {
    const numDiv = document.getElementById('coord-numbers');
    const letDiv = document.getElementById('coord-letters');
    if (!numDiv || !letDiv) return;
    numDiv.innerHTML = '';
    letDiv.innerHTML = '';
    for (let i = 0; i < 8; i++) {
        const n = flipped ? (i + 1) : (8 - i);
        const el = document.createElement('div');
        el.className = 'coord-label';
        el.textContent = n;
        numDiv.appendChild(el);
    }
    for (let i = 0; i < 8; i++) {
        const c = flipped ? String.fromCharCode(72 - i) : String.fromCharCode(65 + i);
        const el = document.createElement('div');
        el.className = 'coord-label';
        el.textContent = c;
        letDiv.appendChild(el);
    }
}

let _flipped = false;
export function getFlipped() { return _flipped; }
export function setFlipped(f) { _flipped = f; }
