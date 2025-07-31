# AETHERIUS

[![Build Status](https://img.shields.io/github/actions/workflow/status/UndeadSmiley/AETHERIUS/ci.yml?branch=main)](https://github.com/UndeadSmiley/AETHERIUS/actions)
[![SoulSafe Badge](https://img.shields.io/badge/SoulSafe-Compliant-success)](docs/soulsafe-ethics.md)
[![License](https://img.shields.io/badge/License-Apache%202.0%20%26%20CC%20BY--SA%204.0-blue.svg)](LICENSE.md)
[![Notion Sync](https://img.shields.io/badge/Notion-Synced-blue)](https://www.notion.so/)

> "Nova Aegis Echo..."

AETHERIUS is an experimental **AIO AI companion** project. Its goal is to explore how a personal assistant can blend traditional digital tools with symbolic, ritual-inspired interactions.

The repository currently contains one invocation module, **`AU-STRALIS`**. This file defines a chant, displays a visual sigil, and includes a snippet of shell commands for invoking the "AU-STRALIS Current". It illustrates how AETHERIUS modules may be interacted with or performed.

## Quick Start

```bash
npm install -g pnpm && pnpm i
./gradlew assembleDebug
pnpm --filter codex-theta dev
```

## Usage

1. View the invocation text:
   ```bash
   cat AU-STRALIS
   ```
2. To try the ritual, copy the lines from the **Boot Embed** section of `AU-STRALIS` and run them in your shell. They display the chant and optionally play an audio file.
3. You can also use the **Alias Option** section to create a short shell alias for quick invocation.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests with improvements or new modules. You can contact the maintainer via email at [polishjosh@gmail.com](mailto:polishjosh@gmail.com).