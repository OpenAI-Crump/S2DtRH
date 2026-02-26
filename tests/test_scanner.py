"""Tests for the rabbit hole scanner."""

import os
import tempfile

from rabbit_hole.scanner import Burrow, RabbitHoleScanner


def _make_tree(base: str) -> None:
    """Create a small test directory tree."""
    os.makedirs(os.path.join(base, "level1", "level2", "level3"), exist_ok=True)
    for name in ("a.txt", "b.txt"):
        path = os.path.join(base, name)
        with open(path, "w") as f:
            f.write("hello")
    with open(os.path.join(base, "level1", "c.txt"), "w") as f:
        f.write("deeper")
    with open(os.path.join(base, "level1", "level2", "d.txt"), "w") as f:
        f.write("even deeper")
    with open(os.path.join(base, "level1", "level2", "level3", "e.txt"), "w") as f:
        f.write("wonderland")


class TestBurrow:
    def test_leaf_detection(self):
        b = Burrow(name="leaf", depth=0, kind="file")
        assert b.is_leaf is True

    def test_non_leaf(self):
        child = Burrow(name="child", depth=1, kind="file")
        parent = Burrow(name="parent", depth=0, kind="dir", children=[child])
        assert parent.is_leaf is False

    def test_walk_yields_all_nodes(self):
        grandchild = Burrow(name="gc", depth=2, kind="file", size=10)
        child = Burrow(name="c", depth=1, kind="dir", children=[grandchild])
        root = Burrow(name="r", depth=0, kind="dir", children=[child])
        names = [b.name for b in root.walk()]
        assert names == ["r", "c", "gc"]

    def test_total_size(self):
        c1 = Burrow(name="f1", depth=1, kind="file", size=100)
        c2 = Burrow(name="f2", depth=1, kind="file", size=200)
        root = Burrow(name="d", depth=0, kind="dir", children=[c1, c2])
        assert root.total_size() == 300

    def test_max_depth(self):
        deep = Burrow(name="deep", depth=3, kind="file")
        mid = Burrow(name="mid", depth=2, kind="dir", children=[deep])
        shallow = Burrow(name="shallow", depth=1, kind="dir", children=[mid])
        root = Burrow(name="root", depth=0, kind="dir", children=[shallow])
        assert root.max_depth() == 3


class TestRabbitHoleScanner:
    def test_scan_directory(self):
        with tempfile.TemporaryDirectory() as tmp:
            _make_tree(tmp)
            scanner = RabbitHoleScanner(max_depth=10)
            burrow = scanner.scan(tmp)
            assert burrow.kind == "dir"
            assert scanner.dirs_scanned >= 4  # root + level1 + level2 + level3
            assert scanner.files_scanned >= 5  # a.txt b.txt c.txt d.txt e.txt

    def test_max_depth_limits_descent(self):
        with tempfile.TemporaryDirectory() as tmp:
            _make_tree(tmp)
            scanner = RabbitHoleScanner(max_depth=1)
            burrow = scanner.scan(tmp)
            # Should not descend past depth 1
            assert burrow.max_depth() <= 1

    def test_scan_single_file(self):
        with tempfile.TemporaryDirectory() as tmp:
            fpath = os.path.join(tmp, "solo.txt")
            with open(fpath, "w") as f:
                f.write("alone")
            scanner = RabbitHoleScanner()
            burrow = scanner.scan(fpath)
            assert burrow.kind == "file"
            assert burrow.name == "solo.txt"
            assert burrow.size == 5

    def test_hidden_files_skipped(self):
        with tempfile.TemporaryDirectory() as tmp:
            with open(os.path.join(tmp, ".hidden"), "w") as f:
                f.write("secret")
            with open(os.path.join(tmp, "visible.txt"), "w") as f:
                f.write("hi")
            scanner = RabbitHoleScanner()
            burrow = scanner.scan(tmp)
            child_names = [c.name for c in burrow.children]
            assert ".hidden" not in child_names
            assert "visible.txt" in child_names

    def test_scan_empty_directory(self):
        with tempfile.TemporaryDirectory() as tmp:
            scanner = RabbitHoleScanner()
            burrow = scanner.scan(tmp)
            assert burrow.kind == "dir"
            assert burrow.is_leaf is True
