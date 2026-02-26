"""Tests for the rabbit hole visualizer."""

from rabbit_hole.scanner import Burrow
from rabbit_hole.visualizer import format_size, render_summary, render_tree


class TestFormatSize:
    def test_bytes(self):
        assert format_size(512) == "512 B"

    def test_kilobytes(self):
        result = format_size(2048)
        assert "KB" in result

    def test_megabytes(self):
        result = format_size(5 * 1024 * 1024)
        assert "MB" in result

    def test_zero(self):
        assert format_size(0) == "0 B"


class TestRenderTree:
    def test_single_file(self):
        b = Burrow(name="test.py", depth=0, kind="file", size=42)
        output = render_tree(b)
        assert "test.py" in output
        assert "42 B" in output

    def test_directory_with_children(self):
        child = Burrow(name="child.txt", depth=1, kind="file", size=10)
        root = Burrow(name="root", depth=0, kind="dir", children=[child])
        output = render_tree(root)
        assert "root/" in output
        assert "child.txt" in output

    def test_nested_structure(self):
        deep = Burrow(name="deep.txt", depth=2, kind="file", size=5)
        mid = Burrow(name="mid", depth=1, kind="dir", children=[deep])
        root = Burrow(name="top", depth=0, kind="dir", children=[mid])
        output = render_tree(root)
        lines = output.split("\n")
        assert len(lines) == 3


class TestRenderSummary:
    def test_summary_contains_stats(self):
        b = Burrow(name="root", depth=0, kind="dir", size=0)
        output = render_summary(b, files_scanned=10, dirs_scanned=3)
        assert "10" in output
        assert "3" in output
        assert "Rabbit Hole" in output

    def test_depth_label_surface(self):
        b = Burrow(name="root", depth=0, kind="dir")
        output = render_summary(b, 0, 1)
        assert "surface" in output

    def test_depth_label_deep(self):
        deep = Burrow(name="d", depth=5, kind="file")
        mid = Burrow(name="m", depth=4, kind="dir", children=[deep])
        root = Burrow(name="r", depth=0, kind="dir", children=[mid])
        output = render_summary(root, 1, 2)
        assert "rabbit hole" in output
