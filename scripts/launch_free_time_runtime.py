#!/usr/bin/env python3

import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), "..", "architecture"))

from runtime_core import runtime_core


if __name__ == "__main__":
    print("\nAETHERIUS free-time runtime scaffold initializing...\n")
    runtime_core(run_idle_first=True)
