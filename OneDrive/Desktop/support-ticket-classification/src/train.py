import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# Load dataset
df = pd.read_csv("data/tickets.csv")

# Features and labels
X = df['ticket_text']
y = df['category']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42
)

# Create pipeline
model = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('classifier', LogisticRegression())
])

# Train model
model.fit(X_train, y_train)

# Save model
joblib.dump(model, 'models/ticket_classifier.pkl')

print("Model trained and saved successfully!")