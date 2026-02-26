"""Visualize the rabbit hole as a tree, showing how deep the scan went."""

from __future__ import annotations

from .scanner import Burrow

ICONS = {
    "dir": "/",
    "file": "",
    "symlink": " ->",
    "unknown": "?",
}

DEPTH_MARKERS = [
    "  ~  surface",
    " ~~  shallow burrow",
    "~~~  deeper underground",
    " *   wonderland approaches",
    "**   curiouser and curiouser",
    "***  down the rabbit hole",
]


def format_size(size: int) -> str:
    """Format byte size to human-readable string."""
    for unit in ("B", "KB", "MB", "GB", "TB"):
        if size < 1024:
            return f"{size:.1f} {unit}" if unit != "B" else f"{size} {unit}"
        size /= 1024
    return f"{size:.1f} PB"


def render_tree(burrow: Burrow, prefix: str = "", is_last: bool = True) -> str:
    """Render the burrow as an indented tree string."""
    lines: list[str] = []

    connector = "=> " if burrow.depth == 0 else ("\\-- " if is_last else "|-- ")
    icon = ICONS.get(burrow.kind, "")
    size_str = f" ({format_size(burrow.size)})" if burrow.kind == "file" else ""
    lines.append(f"{prefix}{connector}{burrow.name}{icon}{size_str}")

    child_prefix = prefix + ("    " if is_last else "|   ")
    for i, child in enumerate(burrow.children):
        lines.append(
            render_tree(child, prefix=child_prefix, is_last=(i == len(burrow.children) - 1))
        )

    return "\n".join(lines)


def render_summary(burrow: Burrow, files_scanned: int, dirs_scanned: int) -> str:
    """Render a summary of the rabbit hole exploration."""
    deepest = burrow.max_depth()
    total = burrow.total_size()
    marker_idx = min(deepest, len(DEPTH_MARKERS) - 1)
    depth_label = DEPTH_MARKERS[marker_idx]

    lines = [
        "",
        "=== Rabbit Hole Scan Summary ===",
        f"  Deepest level reached : {deepest} [{depth_label}]",
        f"  Directories explored  : {dirs_scanned}",
        f"  Files discovered      : {files_scanned}",
        f"  Total size            : {format_size(total)}",
        "================================",
    ]
    return "\n".join(lines)
