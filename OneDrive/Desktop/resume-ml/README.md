# Resume Screening System using Machine Learning

## 📌 Project Overview

This project is a Machine Learning based Resume Screening System developed as part of the Future Interns ML Internship Program.

The system automatically:
- Cleans and preprocesses job descriptions
- Extracts important skills
- Matches resumes with job roles
- Calculates similarity scores
- Ranks candidates/jobs
- Identifies missing skills

This project demonstrates practical applications of:
- Natural Language Processing (NLP)
- TF-IDF Vectorization
- Cosine Similarity
- Skill Extraction
- Candidate Ranking Systems

---

## 🚀 Technologies Used

- Python
- Pandas
- NumPy
- Scikit-learn
- spaCy
- NLTK
- Matplotlib
- Jupyter Notebook

---

## 📂 Project Structure

``` id="lz1zvk"
resume-ml/
│
├── data/
│   └── raw/
│
├── notebooks/
│
├── src/
│   ├── preprocessing.py
│   ├── similarity.py
│   ├── ranking.py
│   └── skill_extraction.py
│
├── output/
│   ├── ranked_candidates.csv
│   ├── candidate_scores.png
│   └── reports/
│
├── models/
│
├── app/
│
├── requirements.txt
├── README.md
└── main.py
```

---

## ⚙️ Features

- Resume and job description preprocessing
- NLP-based text cleaning
- TF-IDF vectorization
- Cosine similarity scoring
- Candidate/job ranking
- Skill gap identification
- CSV export
- Data visualization

---

## ▶️ How to Run

### 1. Create virtual environment

```bash id="e5vhjlwm"
python -m venv venv
```

### 2. Activate environment

```bash id="njlwm9"
source venv/Scripts/activate
```

### 3. Install dependencies

```bash id="kmm4l7"
pip install -r requirements.txt
```

### 4. Run project

```bash id="j8y2zr"
python main.py
```

---

## 📊 Output

The system generates:
- Ranked candidate/job CSV
- Similarity score visualization
- Resume screening report

---

## 📷 Screenshots

Add screenshots inside the `screenshots/` folder.

---

## 👨‍💻 Author

Developed by s.Lakshmi Abhishiktha as part of Future Interns Machine Learning Internship.