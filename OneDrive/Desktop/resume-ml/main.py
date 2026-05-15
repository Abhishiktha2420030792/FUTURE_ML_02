import pandas as pd
import matplotlib.pyplot as plt

from src.preprocessing import clean_text
from src.similarity import calculate_similarity
from src.ranking import rank_jobs
from src.skill_extraction import extract_skills


# Load dataset
df = pd.read_csv("data/raw/job_descriptions.csv")

# Keep important columns
df = df[['Job Title', 'Job Description', 'skills']]

# Remove null rows
df.dropna(inplace=True)

# Clean descriptions
df['cleaned_description'] = df['Job Description'].apply(clean_text)

# Sample resume
sample_resume = """
Python developer with experience in machine learning,
NLP, Flask, SQL, pandas, numpy and scikit-learn.
"""

# Calculate similarity
scores = calculate_similarity(
    df['cleaned_description'].tolist(),
    sample_resume
)

# Add scores
df['similarity_score'] = scores

# Rank jobs
ranked_df = rank_jobs(df)

# Required skills
required_skills = [
    'python',
    'machine learning',
    'nlp',
    'sql',
    'flask',
    'pandas',
    'numpy',
    'scikit-learn'
]

# Skill matching
matched_skills = extract_skills(
    sample_resume,
    required_skills
)

missing_skills = [
    skill for skill in required_skills
    if skill not in matched_skills
]

# Skill percentage
skill_score = (
    len(matched_skills) / len(required_skills)
) * 100

# Save ranked jobs
ranked_df.to_csv(
    "output/ranked_candidates.csv",
    index=False
)

# Plot top jobs
top_jobs = ranked_df.head(10)

plt.figure(figsize=(10, 6))

plt.barh(
    top_jobs['Job Title'],
    top_jobs['similarity_score']
)

plt.xlabel("Similarity Score")
plt.ylabel("Job Title")
plt.title("Top Matching Jobs")

plt.gca().invert_yaxis()

plt.savefig("output/candidate_scores.png")

# Final report
with open(
    "output/reports/screening_report.txt",
    "w"
) as file:

    file.write("===== Resume Screening Report =====\n\n")

    file.write(f"Matched Skills: {matched_skills}\n\n")

    file.write(f"Missing Skills: {missing_skills}\n\n")

    file.write(f"Skill Match Percentage: {skill_score:.2f}%\n")

print("Project executed successfully!")