def rank_jobs(df):
    
    ranked_df = df.sort_values(
        by='similarity_score',
        ascending=False
    )

    return ranked_df