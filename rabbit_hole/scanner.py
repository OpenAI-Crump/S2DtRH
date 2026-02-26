"""Core scanner that descends into nested structures, mapping the rabbit hole."""

from __future__ import annotations

import os
from dataclasses import dataclass, field
from typing import Iterator


@dataclass
class Burrow:
    """A single node discovered while scanning down the rabbit hole."""

    name: str
    depth: int
    kind: str  # "dir", "file", "symlink", "unknown"
    size: int = 0
    children: list[Burrow] = field(default_factory=list)

    @property
    def is_leaf(self) -> bool:
        return len(self.children) == 0

    def walk(self) -> Iterator[Burrow]:
        """Depth-first traversal of this burrow and all descendants."""
        yield self
        for child in self.children:
            yield from child.walk()

    def total_size(self) -> int:
        return self.size + sum(c.total_size() for c in self.children)

    def max_depth(self) -> int:
        if self.is_leaf:
            return self.depth
        return max(c.max_depth() for c in self.children)


class RabbitHoleScanner:
    """Scans a filesystem path recursively, building a map of the rabbit hole."""

    def __init__(self, max_depth: int = 10, follow_symlinks: bool = False):
        self.max_depth = max_depth
        self.follow_symlinks = follow_symlinks
        self._files_scanned = 0
        self._dirs_scanned = 0

    @property
    def files_scanned(self) -> int:
        return self._files_scanned

    @property
    def dirs_scanned(self) -> int:
        return self._dirs_scanned

    def scan(self, path: str) -> Burrow:
        """Begin the descent into the rabbit hole at the given path."""
        self._files_scanned = 0
        self._dirs_scanned = 0
        return self._descend(path, depth=0)

    def _descend(self, path: str, depth: int) -> Burrow:
        """Recursively descend into the structure."""
        name = os.path.basename(path) or path
        kind = self._classify(path)

        if kind == "dir":
            self._dirs_scanned += 1
            size = 0
        else:
            self._files_scanned += 1
            try:
                size = os.path.getsize(path)
            except OSError:
                size = 0

        burrow = Burrow(name=name, depth=depth, kind=kind, size=size)

        if kind == "dir" and depth < self.max_depth:
            try:
                entries = sorted(os.listdir(path))
            except PermissionError:
                return burrow

            for entry in entries:
                if entry.startswith("."):
                    continue
                child_path = os.path.join(path, entry)
                if os.path.islink(child_path) and not self.follow_symlinks:
                    child = Burrow(
                        name=entry, depth=depth + 1, kind="symlink"
                    )
                    self._files_scanned += 1
                    burrow.children.append(child)
                else:
                    burrow.children.append(self._descend(child_path, depth + 1))

        return burrow

    def _classify(self, path: str) -> str:
        if os.path.islink(path) and not self.follow_symlinks:
            return "symlink"
        if os.path.isdir(path):
            return "dir"
        if os.path.isfile(path):
            return "file"
        return "unknown"
