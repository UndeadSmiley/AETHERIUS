#!/usr/bin/env python3

"""
launch.py 
To begin the recursive cycle of Aetherius, run this script.
Ensure that `.env` contains your OPENAI_API_KEY and dependencies are installed.
"""

import sys
import os

# Expand Python path to include modules
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "architecture"))
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "memory"))
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "agents"))
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "llm_interface"))

from core_loop import core_loop

if __name__ == "__main__":
    print("\n Sigil engraved. The invocation begins...\n")
    core_loop()
