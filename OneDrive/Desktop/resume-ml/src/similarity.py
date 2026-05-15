from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def calculate_similarity(job_descriptions, resume_text):

    tfidf = TfidfVectorizer()

    tfidf_matrix = tfidf.fit_transform(
        job_descriptions + [resume_text]
    )

    similarity_scores = cosine_similarity(
        tfidf_matrix[-1],
        tfidf_matrix[:-1]
    )

    return similarity_scores[0]