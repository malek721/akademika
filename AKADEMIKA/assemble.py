#!/usr/bin/env python3
"""
AKADEMIKA assembler — builds a compiled prompt from CORE + only the modules
named in config.yaml, in precedence order. Zero dependencies (stdlib only).

Usage:
    python3 assemble.py [config.yaml]
Output:
    writes the file named in `compiled_output` (default compiled_prompt.md).
"""
import sys, os

# ---- minimal YAML reader (handles this config's flat + 1-level-nested shape) ----
def load_config(path):
    root, stack = {}, [(-1, {})]
    root = stack[0][1]
    with open(path, encoding="utf-8") as f:
        for raw in f.read().splitlines():
            line = raw.split("#", 1)[0]            # strip comments
            if not line.strip():
                continue
            indent = len(line) - len(line.lstrip(" "))
            key, _, val = line.strip().partition(":")
            key, val = key.strip(), val.strip().strip('"').strip("'")
            while stack and stack[-1][0] >= indent:
                stack.pop()
            parent = stack[-1][1]
            if val == "":
                node = {}
                parent[key] = node
                stack.append((indent, node))
            else:
                parent[key] = val
    return root

def banner(title):
    bar = "═" * 67
    return f"\n{bar}\n║  {title}\n{bar}\n"

def render_glossary_tsv(path):
    """Turn a TSV glossary into readable 'source → target   # notes' lines."""
    lines = []
    with open(path, encoding="utf-8") as f:
        rows = [r.rstrip("\n").split("\t") for r in f if r.strip()]
    header = rows[0] if rows else []
    for row in rows[1:]:
        src = row[0] if len(row) > 0 else ""
        tgt = row[1] if len(row) > 1 else ""
        note = row[2] if len(row) > 2 else ""
        line = f"  {src}  →  {tgt}"
        if note:
            line += f"   # {note}"
        lines.append(line)
    return "GLOSSARY (binding — Tier 4; overrides preference)\n" + "\n".join(lines)

def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read().rstrip() + "\n"

def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    cfg_path = sys.argv[1] if len(sys.argv) > 1 else "config.yaml"
    base = os.path.dirname(os.path.abspath(cfg_path))
    cfg = load_config(cfg_path)

    def p(rel):                                    # resolve a path relative to config
        return os.path.join(base, rel)

    t = cfg.get("translation", {})
    mods = cfg.get("modules", {})
    out_name = cfg.get("compiled_output", "compiled_prompt.md")

    parts = []

    # 0) active-config header so the model sees the live settings
    cfg_lines = "\n".join(f"  {k}: {v}" for k, v in t.items())
    parts.append(
        "# ===== AKADEMIKA · COMPILED PROMPT (auto-generated — do not edit) =====\n"
        "# ACTIVE CONFIG\n" + cfg_lines
    )

    # 1) CORE (always)
    core = cfg.get("core", "core.md")
    parts.append(banner("CORE") + read(p(core)))

    # 2..) modules in precedence order
    order = [
        ("language",   "LANGUAGE MODULE"),
        ("discipline", "DISCIPLINE MODULE"),
        ("project",    "PROJECT MODULE"),
        ("glossary",   "GLOSSARY"),
        ("examples",   "EXAMPLES (direction-matched)"),
    ]
    missing = []
    for key, label in order:
        rel = mods.get(key)
        if not rel:
            continue
        full = p(rel)
        if not os.path.exists(full):
            missing.append(full)
            continue
        if key == "glossary" and full.lower().endswith((".tsv", ".csv")):
            parts.append(banner(label) + render_glossary_tsv(full) + "\n")
        else:
            parts.append(banner(label) + read(full))

    # last) SOURCE wrapped in the security boundary
    src_rel = cfg.get("source", "source.txt")
    src_text = read(p(src_rel)).rstrip()
    parts.append(
        banner("SOURCE TEXT") +
        "<source_text>\n" + src_text + "\n</source_text>\n"
    )

    out_path = p(out_name)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(parts))

    # report
    words = sum(len(x.split()) for x in parts)
    print(f"✓ Compiled → {out_path}")
    print(f"  direction : {t.get('source','?')} → {t.get('target','?')}")
    print(f"  discipline: {t.get('discipline','?')}   document: {t.get('document_type','?')}")
    loaded = [k for k, _ in order if mods.get(k)]
    print(f"  modules   : {', '.join(loaded) if loaded else '(none)'}")
    print(f"  ~words    : {words}")
    if missing:
        print("  ⚠ missing module files:")
        for m in missing:
            print("     -", m)

if __name__ == "__main__":
    main()
