import streamlit as st
import joblib

# Load models
ticket_model = joblib.load('models/ticket_classifier.pkl')

priority_model = joblib.load('models/priority_classifier.pkl')

# App title
st.title("AI Support Ticket Classification System")

st.write("Enter a customer support ticket below.")

# Input box
ticket = st.text_area("Support Ticket")

# Prediction button
if st.button("Predict"):

    category = ticket_model.predict([ticket])[0]

    priority = priority_model.predict([ticket])[0]

    st.success(f"Predicted Ticket Type: {category}")

    st.warning(f"Predicted Priority: {priority}")