"""Extract reveal-mask centerlines from existing PNG ink; never modify the PNGs.

Run with Python + Pillow + NumPy. The generated JSON is consumed by GSAP's
SVG masks; coverage is measured against the source ink before saving.
"""

import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public/illustrations/project-concepts"
SLUGS = ["regula", "e-food", "e-play", "to-do", "spider-verse",
         "clone-disney", "hoje-ta-doce", "whatsapp-sender"]


def skeletonize(ink):
    """Zhang-Suen thinning preserves intersections and open line endpoints."""
    grid = np.pad(ink, 1).astype(np.uint8)
    while True:
        removed = 0
        for phase in range(2):
            p = [grid[:-2, 1:-1], grid[:-2, 2:], grid[1:-1, 2:],
                 grid[2:, 2:], grid[2:, 1:-1], grid[2:, :-2],
                 grid[1:-1, :-2], grid[:-2, :-2]]
            neighbors = sum(p)
            transitions = sum((p[i] == 0) & (p[(i + 1) % 8] == 1)
                              for i in range(8))
            if phase == 0:
                keep_a, keep_b = p[0] * p[2] * p[4], p[2] * p[4] * p[6]
            else:
                keep_a, keep_b = p[0] * p[2] * p[6], p[0] * p[4] * p[6]
            delete = ((grid[1:-1, 1:-1] == 1) & (neighbors >= 2)
                      & (neighbors <= 6) & (transitions == 1)
                      & (keep_a == 0) & (keep_b == 0))
            removed += int(delete.sum())
            grid[1:-1, 1:-1][delete] = 0
        if not removed:
            return grid[1:-1, 1:-1].astype(bool)


def simplify(points, tolerance=1.1):
    if len(points) < 3:
        return points
    start, end = np.array(points[0]), np.array(points[-1])
    points_array = np.array(points)
    direction = end - start
    norm = np.linalg.norm(direction)
    if norm == 0:
        distances = np.linalg.norm(points_array - start, axis=1)
    else:
        relative = points_array - start
        distances = np.abs(direction[0] * relative[:, 1]
                           - direction[1] * relative[:, 0]) / norm
    index = int(np.argmax(distances))
    if distances[index] <= tolerance:
        return [points[0], points[-1]]
    return simplify(points[:index + 1], tolerance)[:-1] + simplify(points[index:], tolerance)


def trace(skeleton):
    pixels = {(int(x), int(y)) for y, x in np.argwhere(skeleton)}

    def adjacent(point):
        x, y = point
        return [(x + dx, y + dy) for dy in (-1, 0, 1) for dx in (-1, 0, 1)
                if (dx or dy) and (x + dx, y + dy) in pixels
                and not (dx and dy and ((x + dx, y) in pixels or (x, y + dy) in pixels))]

    graph = {point: adjacent(point) for point in sorted(pixels, key=lambda p: (p[1], p[0]))}
    visited = set()
    paths = []

    def walk(start, following):
        points = [start]
        current = start
        while True:
            visited.add(tuple(sorted((current, following))))
            points.append(following)
            previous, current = current, following
            candidates = [point for point in graph[current] if point != previous]
            if len(graph[current]) != 2 or not candidates:
                break
            following = candidates[0]
            if tuple(sorted((current, following))) in visited:
                break
        if len(points) >= 6:
            paths.append(points)

    for point, neighbors in graph.items():
        if len(neighbors) != 2:
            for neighbor in neighbors:
                if tuple(sorted((point, neighbor))) not in visited:
                    walk(point, neighbor)
    # Include closed loops such as buttons, berries and envelope seals.
    for point, neighbors in graph.items():
        for neighbor in neighbors:
            if tuple(sorted((point, neighbor))) not in visited:
                walk(point, neighbor)
    return paths


def build(slug):
    source = Image.open(ASSETS / f"{slug}.png").convert("RGBA")
    pixels = np.asarray(source)
    ink = (pixels[:, :, 3] > 48) & (pixels[:, :, :3].mean(axis=2) < 160)
    paths = trace(skeletonize(ink))
    paths.sort(key=lambda points: (-len(points), points[0][1], points[0][0]))
    width = 16
    mask = Image.new("L", source.size)
    drawing = ImageDraw.Draw(mask)
    output = []
    total_length = 0
    for path in paths:
        path = simplify(path)
        length = sum(np.hypot(b[0] - a[0], b[1] - a[1]) for a, b in zip(path, path[1:]))
        total_length += length
        drawing.line(path, fill=255, width=width, joint="curve")
        for x, y in (path[0], path[-1]):
            drawing.ellipse((x - width / 2, y - width / 2,
                             x + width / 2, y + width / 2), fill=255)
        output.append({"d": "M" + " L".join(f"{x} {y}" for x, y in path),
                       "length": round(length, 1)})
    coverage = float((ink & (np.asarray(mask) > 0)).sum() / ink.sum())
    if coverage < 0.97:
        raise ValueError(f"{slug}: insufficient ink coverage {coverage:.2%}")
    result = {"width": source.width, "height": source.height,
              "strokeWidth": width, "inkCoverage": round(coverage, 4),
              "totalLength": round(total_length, 1), "paths": output}
    (ASSETS / f"{slug}.draw.json").write_text(json.dumps(result, separators=(",", ":")), encoding="utf-8")
    print(f"{slug}: {len(paths)} paths, {coverage:.2%} ink coverage")


if __name__ == "__main__":
    for slug in SLUGS:
        build(slug)
