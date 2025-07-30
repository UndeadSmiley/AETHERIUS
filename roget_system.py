#!/usr/bin/env python3
"""Digital representation of Roget's Thesaurus Class VI.

This script stores the hierarchy of terms relating to the
Sentient and Moral Powers and provides utilities to export
this structure as JSON or a simple PDF document.
"""
from __future__ import annotations

import json
from dataclasses import dataclass, field
from typing import Dict, List

try:
    from fpdf import FPDF  # lightweight PDF generator
except ImportError:  # pragma: no cover - optional dependency
    FPDF = None


@dataclass
class Section:
    title: str
    entries: List[str] | Dict[str, List[str]]


@dataclass
class ClassVI:
    """Container for the sections of Class VI."""

    sections: Dict[str, List[Section]] = field(default_factory=dict)

    def to_dict(self) -> Dict[str, List[Dict[str, List[str] | Dict[str, List[str]]]]]:
        return {
            name: [
                {
                    "title": sec.title,
                    "entries": sec.entries,
                }
                for sec in sects
            ]
            for name, sects in self.sections.items()
        }

    def save_json(self, path: str) -> None:
        """Save the thesaurus data to a JSON file."""
        with open(path, "w", encoding="utf-8") as f:
            json.dump(self.to_dict(), f, ensure_ascii=False, indent=2)

    def save_pdf(self, path: str) -> None:
        """Generate a PDF of the thesaurus data (if FPDF is available)."""
        if FPDF is None:
            raise RuntimeError("FPDF library is not installed")
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Helvetica", size=12)
        pdf.cell(0, 10, "Roget's Thesaurus - Class VI", ln=True)
        for section_name, sects in self.sections.items():
            pdf.ln(4)
            pdf.cell(0, 10, section_name, ln=True)
            for sec in sects:
                pdf.set_font("Helvetica", "B", 12)
                pdf.cell(0, 10, f"  {sec.title}", ln=True)
                pdf.set_font("Helvetica", size=11)
                if isinstance(sec.entries, dict):
                    for cat, terms in sec.entries.items():
                        pdf.cell(0, 10, f"    {cat}: {', '.join(terms)}", ln=True)
                else:
                    pdf.multi_cell(0, 10, "    " + ", ".join(sec.entries))
        pdf.output(path)


def build_class_vi() -> ClassVI:
    """Create the thesaurus structure from the reconstructed content."""
    data = ClassVI(
        sections={
            "Section I: Affections in General": [
                Section(
                    title="Affections",
                    entries=[
                        "character",
                        "disposition",
                        "nature",
                        "temperament",
                        "mood",
                        "bias",
                        "proclivity",
                        "propensity",
                        "sympathy",
                    ],
                ),
                Section(
                    title="Feeling",
                    entries=["emotion", "sentiment", "sensibility", "passion", "pathos"],
                ),
                Section(
                    title="Sensibility",
                    entries=["sensitivity", "responsiveness", "receptivity"],
                ),
                Section(
                    title="Insensibility",
                    entries=["apathy", "indifference", "numbness", "callousness"],
                ),
                Section(
                    title="Excitation",
                    entries=["stimulation", "arousal", "agitation"],
                ),
                Section(
                    title="Excitability",
                    entries=["nervousness", "volatility", "irritability"],
                ),
                Section(
                    title="Inexcitability",
                    entries=["calmness", "serenity", "composure"],
                ),
            ],
            "Section II: Personal Affections": [
                Section(
                    title="Passive Affections",
                    entries={
                        "Pleasure": ["delight", "joy", "gratification"],
                        "Pain": ["suffering", "anguish", "discomfort"],
                        "Content": ["satisfaction", "fulfillment"],
                        "Discontent": ["dissatisfaction", "displeasure"],
                        "Regret": ["remorse", "sorrow"],
                        "Relief": ["alleviation", "ease"],
                        "Aggravation": ["irritation", "annoyance"],
                        "Cheerfulness": ["gaiety", "joviality"],
                        "Dejection": ["depression", "melancholy"],
                        "Rejoicing": ["elation", "exultation"],
                        "Lamentation": ["mourning", "grief"],
                        "Amusement": ["entertainment", "diversion"],
                        "Weariness": ["fatigue", "exhaustion"],
                        "Wit": ["humor", "cleverness"],
                        "Dullness": ["monotony", "boredom"],
                    },
                ),
                Section(
                    title="Discriminative Affections",
                    entries={
                        "Beauty": ["attractiveness", "elegance"],
                        "Ugliness": ["unattractiveness", "deformity"],
                        "Ornament": ["decoration", "embellishment"],
                        "Blemish": ["flaw", "imperfection"],
                        "Simplicity": ["plainness", "unpretentiousness"],
                        "Taste": ["discernment", "aesthetic sense"],
                        "Vulgarity": ["crudeness", "coarseness"],
                        "Fashion": ["trend", "vogue"],
                        "Ridiculousness": ["absurdity", "ludicrousness"],
                        "Fop": ["dandy", "poseur"],
                        "Affectation": ["pretension", "artificiality"],
                        "Ridicule": ["mockery", "derision"],
                        "Laughingstock": ["object of ridicule"],
                    },
                ),
                Section(
                    title="Prospective Affections",
                    entries={
                        "Hope": ["optimism", "aspiration"],
                        "Hopelessness": ["despair", "despondency"],
                        "Fear": ["anxiety", "dread"],
                        "Courage": ["bravery", "valor"],
                        "Cowardice": ["timidity", "fearfulness"],
                        "Rashness": ["recklessness", "impulsiveness"],
                        "Caution": ["prudence", "vigilance"],
                        "Desire": ["longing", "craving"],
                        "Indifference": ["apathy", "detachment"],
                        "Dislike": ["aversion", "antipathy"],
                        "Fastidiousness": ["meticulousness", "squeamishness"],
                        "Satiety": ["surfeit", "overindulgence"],
                    },
                ),
                Section(
                    title="Contemplative Affections",
                    entries={
                        "Wonder": ["amazement", "awe"],
                        "Expectance": ["anticipation", "expectancy"],
                        "Prodigy": ["marvel", "phenomenon"],
                    },
                ),
                Section(
                    title="Extrinsic Affections",
                    entries={
                        "Novelty": ["newness", "innovation"],
                        "Familiarity": ["acquaintance", "recognition"],
                        "Surprise": ["astonishment", "shock"],
                        "Disappointment": ["letdown", "disillusionment"],
                    },
                ),
            ],
            "Section III: Sympathetic Affections": [
                Section(
                    title="Social Affections",
                    entries={
                        "Love": ["affection", "devotion"],
                        "Friendship": ["camaraderie", "companionship"],
                        "Gratitude": ["thankfulness", "appreciation"],
                        "Pity": ["compassion", "sympathy"],
                        "Charity": ["benevolence", "generosity"],
                    },
                ),
                Section(
                    title="Diffusive Sympathetic Affections",
                    entries={
                        "Kindness": ["gentleness", "warmth"],
                        "Benevolence": ["goodwill", "altruism"],
                        "Generosity": ["magnanimity", "liberality"],
                    },
                ),
                Section(
                    title="Special Sympathetic Affections",
                    entries={
                        "Parental Affection": ["maternal/paternal love"],
                        "Filial Affection": ["child's love for parent"],
                        "Conjugal Affection": ["spousal love"],
                    },
                ),
                Section(
                    title="Retrospective Sympathetic Affections",
                    entries={
                        "Reminiscence": ["recollection", "nostalgia"],
                        "Regret": ["remorse", "repentance"],
                    },
                ),
            ],
            "Section IV: Moral Affections": [
                Section(
                    title="Moral Obligations",
                    entries={
                        "Duty": ["responsibility", "obligation"],
                        "Conscience": ["moral sense", "inner voice"],
                    },
                ),
                Section(
                    title="Moral Sentiments",
                    entries={
                        "Respect": ["esteem", "honor"],
                        "Reverence": ["veneration", "awe"],
                        "Shame": ["embarrassment", "guilt"],
                        "Remorse": ["contrition", "penitence"],
                    },
                ),
                Section(
                    title="Moral Conditions",
                    entries={
                        "Virtue": ["righteousness", "integrity"],
                        "Vice": ["immorality", "depravity"],
                    },
                ),
                Section(
                    title="Moral Practice",
                    entries={
                        "Temperance": ["moderation", "self-restraint"],
                        "Intemperance": ["excess", "indulgence"],
                    },
                ),
                Section(
                    title="Moral Institutions",
                    entries={
                        "Justice": ["fairness", "equity"],
                        "Law": ["legislation", "jurisprudence"],
                        "Punishment": ["penalty", "retribution"],
                    },
                ),
            ],
            "Section V: Religious Affections": [
                Section(
                    title="Superhuman Beings and Regions",
                    entries={
                        "Deity": ["God", "divinity"],
                        "Heaven": ["paradise", "afterlife"],
                    },
                ),
                Section(
                    title="Religious Doctrines",
                    entries={
                        "Faith": ["belief", "conviction"],
                        "Dogma": ["tenet", "creed"],
                    },
                ),
                Section(
                    title="Religious Sentiments",
                    entries={
                        "Piety": ["devotion", "reverence"],
                        "Zeal": ["fervor", "enthusiasm"],
                    },
                ),
                Section(
                    title="Acts of Religion",
                    entries={
                        "Worship": ["adoration", "veneration"],
                        "Prayer": ["supplication", "invocation"],
                    },
                ),
                Section(
                    title="Religious Institutions",
                    entries={
                        "Church": ["congregation", "assembly"],
                        "Clergy": ["ministers", "priests"],
                        "Rite": ["ceremony", "ritual"],
                    },
                ),
            ],
        }
    )
    return data


if __name__ == "__main__":  # pragma: no cover - manual use
    thesaurus = build_class_vi()
    # Example usage:
    thesaurus.save_json("class_vi.json")
    if FPDF is not None:
        thesaurus.save_pdf("class_vi.pdf")
    else:
        print("Install fpdf to enable PDF export")
