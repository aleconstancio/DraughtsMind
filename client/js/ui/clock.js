let clockInterval = null;
let clockLastStamp = 0;
let timeW = 0, timeB = 0;
let timeLimit = 0;
let onTimeout = null;

export function initClock(callbacks) {
  onTimeout = callbacks.onTimeout;
  const slider = document.getElementById('cfg-time');
  const timeVal = document.getElementById('time-val');
  slider.oninput = () => {
    timeLimit = parseInt(slider.value);
    timeVal.textContent = timeLimit;
  };
}

export function getTimeLimit() { return timeLimit; }
export function getTimeW() { return timeW; }
export function getTimeB() { return timeB; }

export function startClock() {
  if (clockInterval) return;
  clockLastStamp = Date.now();
  clockInterval = setInterval(clockTick, 250);
}

export function stopClock() {
  if (clockInterval) { clearInterval(clockInterval); clockInterval = null; }
  clockLastStamp = 0;
}

export function resetClocks(limit) {
  timeLimit = limit;
  timeW = limit * 60;
  timeB = limit * 60;
  updateDisplay();
}

export function debitThinkingTime(turn, elapsed) {
  if (timeLimit === 0) return;
  if (turn === 1) timeW = Math.max(0, timeW - elapsed);
  else timeB = Math.max(0, timeB - elapsed);
  updateDisplay();
}

function clockTick() {
  updateDisplay();
}

export function updateDisplay() {
  const cw = document.getElementById('clock-white');
  const cb = document.getElementById('clock-black');
  if (!cw || !cb) return;
  if (timeLimit > 0) {
    cw.innerText = fTime(timeW);
    cb.innerText = fTime(timeB);
  } else {
    cw.innerText = cb.innerText = '--:--';
  }
}

function fTime(sec) {
  const s = Math.max(0, Math.ceil(sec));
  return `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
}

export function checkTimeout(turn) {
  if (timeLimit === 0) return false;
  if (turn === 1 && timeW <= 0) return 'white';
  if (turn === -1 && timeB <= 0) return 'black';
  return false;
}
