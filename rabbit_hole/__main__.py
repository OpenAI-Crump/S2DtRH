"""CLI entry point: python -m rabbit_hole [path] [--depth N]"""

import argparse
import sys

from .scanner import RabbitHoleScanner
from .visualizer import render_summary, render_tree


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        prog="rabbit_hole",
        description="Scan 2 Down the Rabbit Hole - recursively explore directory structures",
    )
    parser.add_argument(
        "path",
        nargs="?",
        default=".",
        help="Path to begin scanning (default: current directory)",
    )
    parser.add_argument(
        "--depth", "-d",
        type=int,
        default=5,
        help="Maximum depth to descend (default: 5)",
    )
    parser.add_argument(
        "--follow-symlinks", "-L",
        action="store_true",
        help="Follow symbolic links during the scan",
    )
    parser.add_argument(
        "--summary-only", "-s",
        action="store_true",
        help="Show only the summary, not the full tree",
    )

    args = parser.parse_args(argv)

    scanner = RabbitHoleScanner(max_depth=args.depth, follow_symlinks=args.follow_symlinks)
    burrow = scanner.scan(args.path)

    if not args.summary_only:
        print(render_tree(burrow))

    print(render_summary(burrow, scanner.files_scanned, scanner.dirs_scanned))
    return 0


if __name__ == "__main__":
    sys.exit(main())
