"""Roget's Thesaurus Class VI: Sentient and Moral Powers.

This module provides a structured representation of Roget's Thesaurus
Class VI. The `RogetClassVI` class offers access to each section and a
utility to search for terms across categories.
"""

from dataclasses import dataclass, field
from typing import Dict, List


@dataclass
class RogetClassVI:
    """Data container for Class VI of Roget's Thesaurus."""

    sections: Dict[str, Dict[str, List[str]]] = field(default_factory=dict)

    def __post_init__(self) -> None:
        self.sections = {
            "Affections in General": {
                "Affections": [
                    "character", "disposition", "nature", "temperament",
                    "mood", "bias", "proclivity", "propensity", "sympathy",
                ],
                "Feeling": ["emotion", "sentiment", "sensibility", "passion", "pathos"],
                "Sensibility": ["sensitivity", "responsiveness", "receptivity"],
                "Insensibility": ["apathy", "indifference", "numbness", "callousness"],
                "Excitation": ["stimulation", "arousal", "agitation"],
                "Excitability": ["nervousness", "volatility", "irritability"],
                "Inexcitability": ["calmness", "serenity", "composure"],
            },
            "Personal Affections": {
                "Passive Affections": [
                    "delight", "joy", "gratification", "suffering", "anguish",
                    "discomfort", "satisfaction", "fulfillment", "dissatisfaction",
                    "displeasure", "remorse", "sorrow", "alleviation", "ease",
                    "irritation", "annoyance", "gaiety", "joviality", "depression",
                    "melancholy", "elation", "exultation", "mourning", "grief",
                    "entertainment", "diversion", "fatigue", "exhaustion", "humor",
                    "cleverness", "monotony", "boredom",
                ],
                "Discriminative Affections": [
                    "attractiveness", "elegance", "unattractiveness", "deformity",
                    "decoration", "embellishment", "flaw", "imperfection",
                    "plainness", "unpretentiousness", "discernment", "aesthetic sense",
                    "crudeness", "coarseness", "trend", "vogue", "absurdity",
                    "ludicrousness", "dandy", "poseur", "pretension", "artificiality",
                    "mockery", "derision", "object of ridicule",
                ],
                "Prospective Affections": [
                    "optimism", "aspiration", "despair", "despondency", "anxiety",
                    "dread", "bravery", "valor", "timidity", "fearfulness",
                    "recklessness", "impulsiveness", "prudence", "vigilance",
                    "longing", "craving", "apathy", "detachment", "aversion",
                    "antipathy", "meticulousness", "squeamishness", "surfeit",
                    "overindulgence",
                ],
                "Contemplative Affections": [
                    "amazement", "awe", "anticipation", "expectancy", "marvel", "phenomenon"
                ],
                "Extrinsic Affections": [
                    "newness", "innovation", "acquaintance", "recognition",
                    "astonishment", "shock", "letdown", "disillusionment",
                ],
            },
            "Sympathetic Affections": {
                "Social Affections": [
                    "affection", "devotion", "camaraderie", "companionship",
                    "thankfulness", "appreciation", "compassion", "sympathy",
                    "benevolence", "generosity",
                ],
                "Diffusive Sympathetic Affections": [
                    "gentleness", "warmth", "goodwill", "altruism",
                    "magnanimity", "liberality",
                ],
                "Special Sympathetic Affections": [
                    "maternal love", "paternal love", "child's love for parent",
                    "spousal love",
                ],
                "Retrospective Sympathetic Affections": [
                    "recollection", "nostalgia", "remorse", "repentance"
                ],
            },
            "Moral Affections": {
                "Moral Obligations": [
                    "responsibility", "obligation", "moral sense", "inner voice"
                ],
                "Moral Sentiments": [
                    "esteem", "honor", "veneration", "awe",
                    "embarrassment", "guilt", "contrition", "penitence",
                ],
                "Moral Conditions": ["righteousness", "integrity", "immorality", "depravity"],
                "Moral Practice": ["moderation", "self-restraint", "excess", "indulgence"],
                "Moral Institutions": ["fairness", "equity", "legislation", "jurisprudence", "penalty", "retribution"],
            },
            "Religious Affections": {
                "Superhuman Beings and Regions": ["God", "divinity", "paradise", "afterlife"],
                "Religious Doctrines": ["belief", "conviction", "tenet", "creed"],
                "Religious Sentiments": ["devotion", "reverence", "fervor", "enthusiasm"],
                "Acts of Religion": ["adoration", "veneration", "supplication", "invocation"],
                "Religious Institutions": ["congregation", "assembly", "ministers", "priests", "ceremony", "ritual"],
            },
        }

    def get_section(self, name: str) -> Dict[str, List[str]]:
        """Return a section by name."""
        return self.sections.get(name, {})

    def find_term(self, term: str) -> List[str]:
        """Search for a term and return matching categories."""
        term_lower = term.lower()
        results = []
        for section, categories in self.sections.items():
            for category, terms in categories.items():
                if any(term_lower == t.lower() for t in terms):
                    results.append(f"{section} -> {category}")
        return results
