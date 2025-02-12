# groq api
from flask_cors import CORS

api_key = "" # Hidden

### Step 6 and 7###
from flask import Flask, request, jsonify
from transformers import pipeline  # HF inference API
from groq import Groq
import json
from flask_cors import CORS

# Creating Flask instance
app = Flask(__name__)
CORS(app)

# Loading models
custom_model = pipeline(model="L-e-e-v-i/IMDB-Distilbert-LLMsCourse")

# Get sentiment and confidence scores
def analyze_sentiment(text, model):
    if model == "custom":
        result = custom_model(text)[0]
        if result["label"] == "LABEL_1":
            sentiment = "positive"
        else:
            sentiment = "negative"
        confidence = result["score"]
        response = {"sentiment": sentiment, "confidence": confidence}

    if model == "llama":
        client = Groq(
            api_key=api_key,
        )

        sys_prompt = (
            """
            You are a data analyst API capable of sentiment analysis on IMDB movie reviews
            that responds in JSON. The user will provide only the movie review.
            The JSON output should include 
            {"sentiment": "string (positive, negative)", "confidence": "number (0-1)"}
            """
        )
        user_prompt = text
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": sys_prompt},
                {"role": "user", "content": user_prompt}
            ],
            model="llama3-70b-8192"
        )

        response = json.loads(chat_completion.choices[0].message.content)
    return response

@app.route("/analyze/", methods=["POST"])
def analyze():
    data = request.get_json()
    text = data.get("text")
    model = data.get("model")

    response = analyze_sentiment(text, model)

    return jsonify(response)

app.run(host="0.0.0.0", port=8080)