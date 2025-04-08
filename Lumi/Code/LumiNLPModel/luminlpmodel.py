"""LumiNLPModel.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1ecvrKpkND6wLqDSMw1FWKu_eYkKOesot
"""

from transformers import pipeline
import logging

# Initialize logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("LumiSentimentModel")

# Load pre-trained pipelines
logger.info("Loading sentiment and emotion analysis models...")
sentiment_pipeline = pipeline("sentiment-analysis", model="distilbert/distilbert-base-uncased-finetuned-sst-2-english")
emotion_pipeline = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", return_all_scores=True)

# Save sentiment model and emotion model
sentiment_pipeline.model.save_pretrained("/content/sentiment_model")
sentiment_pipeline.tokenizer.save_pretrained("/content/sentiment_model")

emotion_pipeline.model.save_pretrained("/content/emotion_model")
emotion_pipeline.tokenizer.save_pretrained("/content/emotion_model")

# Keywords and phrases indicating harmful intent
HARMFUL_KEYWORDS = [
    "suicide", "kill myself", "want to die", "no reason to live",
    "end it all", "can't go on", "worthless", "hopeless",
    "disappear forever", "I hate myself", "self-harm"
]

def analyze_entry(text):
    """Analyze sentiment and emotion."""
    sentiment = sentiment_pipeline(text)[0]
    emotions = emotion_pipeline(text)[0]
    emotion_sorted = sorted(emotions, key=lambda x: x['score'], reverse=True)

    top_emotion = emotion_sorted[0]['label']
    confidence = emotion_sorted[0]['score']

    return {
        "sentiment": sentiment['label'],
        "sentiment_score": sentiment['score'],
        "top_emotion": top_emotion,
        "emotion_confidence": confidence,
        "emotions_full": emotions
    }

def detect_harmful_language(text):
    """Detect harmful/self-harm language."""
    text_lower = text.lower()
    for phrase in HARMFUL_KEYWORDS:
        if phrase in text_lower:
            return True
    return False

def process_journal_entry(entry_text):
    """Process journal entry and analyze emotional state."""
    logger.info("Processing journal entry...")
    analysis = analyze_entry(entry_text)
    is_harmful = detect_harmful_language(entry_text)

    result = {
        "analysis": analysis,
        "harmful_language_detected": is_harmful
    }

    if is_harmful:
        logger.warning("Harmful language detected! Emergency response may be needed.")
        # Here you'd trigger a real alert to your backend system or human reviewer.

    return result

# Example usage
if __name__ == "__main__":
    sample_journals = [
        "I had such an amazing day at the park today! I laughed so much and felt truly at peace.",
        "Everyone got a promotion except me. I'm trying to be happy for them, but it's hard not to feel jealous.",
        "I don’t even know what’s wrong with me. I just feel so empty lately.",
        "Life is beautiful and I’m so grateful for my friends and family.",
        "I can't do this anymore. It all feels like too much to handle.",
        "My heart is pounding—I’m so excited for tomorrow’s presentation!"
    ]

for entry in sample_journals:
  print(f"\nJournal Entry: {entry}")
  output = process_journal_entry(entry)
  print("Analysis Result:", output)
