import nltk
import re
import pymongo
import pandas as pd
import google.generativeai as genai
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.classify import NaiveBayesClassifier
from nltk.classify.util import accuracy
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
# from flask import Flask, request, render_template, jsonify
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client["IIITLU"]
collection = db['complaints']

# Download necessary NLTK resources
nltk.download('stopwords')
nltk.download('punkt')

# Configure Google Gemini AI
genai.configure(api_key="AIzaSyBhVmcYdTwmddy6f5N64DQFEfjfeTHjQDI")

# Load dataset
file_path = "C:/Users/Ch_Kumar_Kartik/Coding Resources/Projects/Hackathons/IIIT Lucknow Hackathon/categorized_grievances_dataset.csv"
df = pd.read_csv(file_path)

# Handle missing values
df.dropna(subset=["Description", "Category"], inplace=True)

# Splitting dataset
X_train, X_test, y_train, y_test = train_test_split(df["Description"], df["Category"], test_size=0.2, random_state=42)

# Convert text data into TF-IDF vectors
vectorizer = TfidfVectorizer()
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

# Convert TF-IDF vectors to feature dictionaries for NLTK
def convert_to_features(tfidf_matrix):
    return [{str(i): round(tfidf_matrix[row, i], 2) for i in range(tfidf_matrix.shape[1])} 
            for row in range(tfidf_matrix.shape[0])]

train_features = list(zip(convert_to_features(X_train_tfidf), y_train))
test_features = list(zip(convert_to_features(X_test_tfidf), y_test))

# Train Naïve Bayes classifier for department classification
classifier = NaiveBayesClassifier.train(train_features)

# Function to predict department
def predict_department(grievance_description):
    grievance_tfidf = vectorizer.transform([grievance_description])
    features = convert_to_features(grievance_tfidf)[0]
    return classifier.classify(features)

# Function to get Gemini AI response
def get_gemini_response(prompt):
    model = genai.GenerativeModel("gemini-pro")
    response = model.generate_content(f"{prompt} Suggest a solution to department for this consumer complaint in a single sentence (6-8 words).")
    return response.text

# Define critical keywords
critical_keywords = set([
    "murder", "robbery", "assault", "fire", "violence", "accident", "death", "emergency",
    "threat", "harassment", "corruption", "fraud", "police", "bribery", "collapsed", "riot",
    "criminal", "hijack", "abuse", "molestation", "rape", "kidnap", "illegal", "scam"
])

# Function to clean text
def clean_text(text):
    text = str(text).lower()  # Convert to lowercase
    text = re.sub(r'\W', ' ', text)  # Remove special characters
    text = re.sub(r'\s+', ' ', text).strip()  # Remove extra spaces
    words = text.split()
    words = [word for word in words if word not in stopwords.words('english')]  # Remove stopwords
    return " ".join(words)

# Function to classify grievances as Critical or Non-Critical
def classify_grievance(text):
    for word in critical_keywords:
        if word in text:
            return "Critical"
    return "Non-Critical"


# Apply text cleaning & classification to dataset
df['Cleaned_Description'] = df['Description'].apply(clean_text)
df['Grievance_Type'] = df['Cleaned_Description'].apply(classify_grievance)

# Encode labels (Critical = 1, Non-Critical = 0)
y = df['Grievance_Type'].apply(lambda x: 1 if x == "Critical" else 0)

# Split dataset for classification model
X_train_text, X_test_text, y_train, y_test = train_test_split(
    df['Cleaned_Description'], y, test_size=0.2, random_state=42
)

# Vectorize text data (TF-IDF)
vectorizer_criticality = TfidfVectorizer(max_features=500)
X_train = vectorizer_criticality.fit_transform(X_train_text).toarray()
X_test = vectorizer_criticality.transform(X_test_text).toarray()

# Train Logistic Regression model for criticality classification
model = LogisticRegression()
model.fit(X_train, y_train)

# Function to predict grievance priority
def predict_grievance(grievance_description):
    cleaned_desc = clean_text(grievance_description)
    transformed_desc = vectorizer_criticality.transform([cleaned_desc]).toarray()
    prediction = model.predict(transformed_desc)
    return "Critical" if prediction[0] == 1 else "Non-Critical"

# main function to predict everything
def predict():
    
    latest_record = collection.find_one(sort=[("_id", -1)])
    
    grievance_description = latest_record.get("description") if latest_record else None
    
    latest_name = latest_record.get("name")
    
    # Predict department
    department = predict_department(grievance_description)
    
    # Predict Priority
    priority = predict_grievance(grievance_description)
    
    # Get Gemini solution
    solution = get_gemini_response(grievance_description)
    
    filter_query = {"name": latest_name}  # Find the existing document

    # Define the update operation
    update_data = {
        "$set": {
            "department": department,
            "priority": priority,
            "solution": solution
        }
    }

    # Update the document if it exists, otherwise insert it
    collection.update_one(filter_query, update_data, upsert=True)

if __name__ == "__main__":
    predict()

