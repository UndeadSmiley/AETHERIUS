# AETHERIUS

AIO AI Companion

## Roget Class VI Module

The repository contains `roget_class_vi.py`, a Python module providing
an in-memory representation of *Roget's Thesaurus* Class VI: Sentient and
Moral Powers. The `RogetClassVI` class exposes two utility methods:

- `get_section(name)`: Retrieve all categories and terms for a section.
- `find_term(term)`: Locate which categories include a given term.

Example usage:

```python
from roget_class_vi import RogetClassVI
rc = RogetClassVI()
print(rc.get_section("Moral Affections"))
print(rc.find_term("charity"))
```
