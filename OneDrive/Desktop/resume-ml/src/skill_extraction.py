def extract_skills(resume_text, required_skills):
    
    matched_skills = []

    for skill in required_skills:

        if skill.lower() in resume_text.lower():

            matched_skills.append(skill)

    return matched_skills