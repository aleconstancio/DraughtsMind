# DraughtsMind

Elite Brazilian Draughts AI engine. Play against a powerful AI with opening book, iterative deepening, alpha-beta pruning, transposition tables, and more.

## Quick Start

```bash
./scripts/setup.sh
./scripts/start.sh
```

Open http://localhost:3000 in your browser.

## Game Modes

- **PvP** — Player vs Player (local)
- **PvA** — Player vs AI (you play white, AI plays black)
- **AvA** — AI vs AI (watch the engine play itself)

## Features

- CBD (Confederação Brasileira de Damas) rules
- Opening book from Brazilian Championships (4,780+ lines)
- Negamax alpha-beta search with iterative deepening
- Transposition table (4M entries), null move pruning, LMR, quiescence
- Match save/resume via SQLite
- PDN import/export

## Tech Stack

- **Frontend:** Vanilla JS (ES modules), custom CSS
- **Backend:** Node.js, Express, better-sqlite3
- **AI:** Client-side search engine with opening book served from server

## License

GPL-3.0-or-later
