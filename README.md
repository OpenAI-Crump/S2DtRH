# S2DtRH - Scan 2 Down the Rabbit Hole

A recursive directory structure scanner that descends into nested filesystems
and produces a visual tree with depth-aware summaries.

## Usage

```bash
python -m rabbit_hole [path] [--depth N] [--follow-symlinks] [--summary-only]
```

## Running Tests

```bash
python -m pytest tests/ -v
```
