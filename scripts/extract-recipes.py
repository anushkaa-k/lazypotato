"""Extract recipes from the source cookbook (Markdown, converted from the .docx with
`pandoc -t markdown source.docx -o docs/source/30-easy-recipes.md`) into
src/data/recipes.generated.json.

Every string is kept verbatim from the source. Parsed fields (quantity, unit, item)
sit alongside the original text so nothing is lost.

Usage: python3 scripts/extract-recipes.py
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "docs/source/30-easy-recipes.md"
OUT = ROOT / "src/data/recipes.generated.json"

UNITS = ["cups", "cup", "tbsp", "tsp", "g", "clove", "cloves", "pinch", "pieces", "piece", "slices", "slice"]


def clean(text: str) -> str:
    text = re.sub(r"\s+", " ", text).strip()
    text = text.replace("\\'", "'").replace("--", "–")
    return text


def slugify(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def parse_ingredient(line: str) -> dict:
    m = re.match(r"^(\d+(?:\.\d+)?)\s+(.*)$", line)
    if not m:
        return {"text": line, "quantity": None, "unit": None, "item": line}
    qty = float(m.group(1))
    rest = m.group(2)
    unit = None
    for u in UNITS:
        if rest == u or rest.startswith(u + " "):
            unit = u
            rest = rest[len(u):].strip()
            break
    return {"text": line, "quantity": qty, "unit": unit, "item": rest}


def main() -> int:
    md = SRC.read_text()
    category = None
    recipes = []
    problems = []
    blocks = re.split(r"^(# .*|## .*)$", md, flags=re.M)
    i = 1
    while i < len(blocks):
        head, body = blocks[i], blocks[i + 1]
        i += 2
        if head.startswith("# "):
            category = head[2:].strip()
            continue
        name = head[3:].strip()
        meta = re.search(r"Serves:\s*(\d+)\s*\\\|\s*Prep:\s*(\d+)\s*min\s*\\\|\s*Cook:\s*(\d+)\s*min\s*\\\|\s*Difficulty:\s*(\w+)", body)
        if not meta:
            problems.append(f"{name}: metadata line not found")
            continue
        parts = re.split(r"^### (.*)$", body, flags=re.M)
        sections = {parts[k].strip(): parts[k + 1] for k in range(1, len(parts), 2)}
        ing_raw = re.findall(r"^-\s+(.*?)(?=\n\s*\n|\Z)", sections.get("Ingredients", ""), flags=re.M | re.S)
        ingredients = [parse_ingredient(clean(x)) for x in ing_raw]
        method = [clean(s) for s in re.findall(r"^\d+\\\.\s+(.*?)(?=\n\s*\n|\Z)", sections.get("Method", ""), flags=re.M | re.S)]
        script_body = sections.get("Cook with me script", "").split("*Review notes")[0]
        script = [clean(s) for s in re.findall(r"^\d+\.\s+Step \d+:\s+(.*?)(?=\n\s*\n|\Z)", script_body, flags=re.M | re.S)]
        if not ingredients:
            problems.append(f"{name}: no ingredients")
        if not method:
            problems.append(f"{name}: no method")
        if script != method:
            problems.append(f"{name}: cook-with-me script differs from method")
        recipes.append({
            "id": slugify(name),
            "name": name,
            "sourceCategory": category,
            "serves": int(meta.group(1)),
            "prepMinutes": int(meta.group(2)),
            "cookMinutes": int(meta.group(3)),
            "difficulty": meta.group(4),
            "ingredients": ingredients,
            "method": method,
            "cookWithMe": script,
        })
    ids = [r["id"] for r in recipes]
    if len(set(ids)) != len(ids):
        problems.append("duplicate ids")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(recipes, indent=2, ensure_ascii=False) + "\n")
    print(f"Extracted {len(recipes)} recipes -> {OUT.relative_to(ROOT)}")
    for p in problems:
        print("PROBLEM:", p)
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
