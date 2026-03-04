# Color Department - Batch Board

A lightweight batch queue board for tracking paint/color batches across mixing bowls. Built with plain HTML, CSS, and JavaScript — no frameworks, no build step.

## Features

- **Kanban-style board** — each mixing bowl gets its own lane
- **Batch lifecycle** — move batches through Queued → Mixing → Complete
- **11 bowls** across 4 size classes (250, 575, 1,010, and 2,000 gallon)
- **Persistent storage** — batches are saved to `localStorage` so data survives page reloads
- **Responsive** — works on desktop and mobile
- **Dark theme** with status-colored cards and a pulse animation for active mixes

## Getting Started

No install or build required. Just open the file in a browser:

```bash
git clone https://github.com/SportMaster26/Color-Dept-Batches.git
cd Color-Dept-Batches
open index.html    # macOS
xdg-open index.html  # Linux
start index.html     # Windows
```

Or simply double-click `index.html`.

## Usage

1. Click **+ New Batch** to add a batch to the queue
2. Select a product name, bowl, gallon amount, and optional notes
3. Click **Start Mixing** on a queued batch to begin
4. Click **Mark Complete** when the batch is done
5. Use **Clear Completed** to remove all finished batches from the board

## Bowl Sizes

| Bowl | Capacity |
|------|----------|
| A, B | 575 gal |
| E, F | 250 gal |
| C, D, G, H, I | 1,010 gal |
| Big Iron, Thor's Hammer | 2,000 gal |

## Tech Stack

- HTML
- CSS (custom properties, grid layout, keyframe animations)
- Vanilla JavaScript (localStorage for persistence)
