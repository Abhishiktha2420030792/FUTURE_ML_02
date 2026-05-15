import joblib

model = joblib.load('../models/ticket_classifier.pkl')

ticket = ["Payment failed but amount deducted"]

prediction = model.predict(ticket)

print(prediction)