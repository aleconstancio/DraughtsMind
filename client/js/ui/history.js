import { move2Str } from '../game/constants.js';

let history = [];

export function addMove(move, moveStr) {
    history.push({
        move,
        str: moveStr || move2Str(move),
        ply: history.length
    });
}

export function clearHistory() {
    history = [];
}

export function getHistory() {
    return history.slice();
}

export function getPDN() {
    let pdn = '';
    for (let i = 0; i < history.length; i++) {
        const plyNum = Math.floor(i / 2) + 1;
        if (i % 2 === 0) {
            pdn += `${plyNum}. `;
        }
        pdn += history[i].str;
        if (i % 2 === 0 && i < history.length - 1) pdn += ' ';
    }
    return pdn.trim();
}

export function renderHistory() {
    const el = document.getElementById('move-list');
    if (!el) return;
    el.innerHTML = '';
    for (let i = 0; i < history.length; i++) {
        const plyNum = Math.floor(i / 2) + 1;
        if (i % 2 === 0) {
            const numSpan = document.createElement('span');
            numSpan.className = 'ply-num';
            numSpan.textContent = `${plyNum}. `;
            el.appendChild(numSpan);
        }
        const ms = document.createElement('span');
        ms.className = (i === history.length - 1) ? 'active-move' : 'move-link';
        ms.textContent = history[i].str;
        el.appendChild(ms);
        el.appendChild(document.createTextNode(' '));
    }
    const active = el.querySelector('.active-move');
    if (active) active.scrollIntoView({ block: 'nearest' });
}
