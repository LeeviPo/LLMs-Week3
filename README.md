# LLMs-Week3
Coursework

# Sentiment Analysis System with Custom Fine-Tuned Model and Llama 3

This repository implements a sentiment analysis system that allows users to analyze movie reviews using two models:
- **Custom Model:** A fine-tuned transformer on the IMDB dataset.
- **Llama 3:** A pre-trained model accessed via the Groq Cloud API.

The system comprises three main parts:
1. **Dataset Preparation and Fine-Tuning:** Jupyter notebooks for data preprocessing, model training, and evaluation.
2. **Backend API:** A API built with Flask that accepts review text and a model choice, then returns the sentiment and confidence score.
3. **React UI:** A web interface where users can input a review, select a model, and view the analysis results.

## Repository Structure
```
.  
├── notebooks/                 # Jupyter notebooks for data preprocessing and fine-tuning  
├── backend/                   # Backend API code (Flask app)  
│  ├── app.py                  # Main API application  
│  └── requirements.txt        # Python dependencies for the backend  
├── UI/                        # React UI code  
│  ├── public/                 # Public assets  
│  ├── src/  
│  │  ├── App.js               # Main React component  
│  │  ├── App.css              # Styles for the UI  
│  │  └── …                    # Other UI components and assets  
│  └── package.json            # Node.js dependencies for the UI  
└── README.md                  # This file  
```


## Installation and Running

### Prerequisites
- **Python**
- **Node.js**
- **Git**

### Setting Up the Backend
**1. Install the dependencies**
```
pip install -r requirements.txt
```
**2. Add own groq API key to backend.py**
```
backend.py
line 2:
  api_key = "" <- Here
```
**3. Run backend.py**
```
cd backend

python backend.py
```
**4. Run App.js**
```
cd UI

npm start
```
**5. Access the React UI at URL**
http://localhost:3000


## Using the endpoints
### Analyze Sentiment API
**URL:** http://localhost:8080/analyze/  
**Method:** POST  
**Request Body Example:**
```
{
  "model": "custom",  // or "llama"
  "text": "Great movie"
}
```  

**Response Example:**
```
{
  "sentiment": "positive",
  "confidence": 0.95
}
```

### Using the API
**Postman**
Create a POST request to http://localhost:8080/analyze/ with the JSON body as shown above.  

**cURL**
```
curl -X POST http://localhost:8080/analyze/ \
     -H "Content-type: application/json" \
     -d '{"model": "custom", "text": "Great movie"}'
```

**Python request**
```
import requests

url = "http://localhost:8080/analyze/"
payload = {"model": "custom", "text": "Great movie"}
response = requests.post(url, json=payload)
print(response.json())
```

