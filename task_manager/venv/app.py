from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.ensemble import RandomForestClassifier
import joblib
import pandas as pd
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)
CORS(app, resources={
    r"/upload_task": {"origins": "http://localhost:3000"},
    r"/tasks": {"origins": "http://localhost:3000"},
    r"/users": {"origins": "http://localhost:3000"},
})

# Sample data for users and their skills
users_skills = pd.DataFrame([
    {"user": "Alice", "skill": "python"},
    {"user": "Bob", "skill": "javascript"},
    {"user": "Charlie", "skill": "communication"},
    {"user": "David", "skill": "react"}
])

# Default tasks
tasks = [
    {"task": "Build API endpoints", "skill_required": "python", "assigned_to": "Alice"},
    {"task": "Design frontend UI", "skill_required": "react", "assigned_to": "David"},
    {"task": "Project planning", "skill_required": "communication", "assigned_to": "Charlie"}
]

# Include a comprehensive set of skills
all_skills = ["python", "javascript", "communication", "react", "node"]

# Label encoders for skills
le_skill = LabelEncoder()
le_skill.fit(all_skills)
users_skills["skill_encoded"] = le_skill.fit_transform(users_skills["skill"])

# Train the model
X_train = users_skills[["skill_encoded"]]
y_train = users_skills["user"]
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save the model and label encoders
joblib.dump(model, "model.pkl")
joblib.dump(le_skill, "le_skill.pkl")

@app.route('/upload_task', methods=['POST'])
def upload_task():
    data = request.json
    if not data or 'task' not in data or 'skill_required' not in data:
        return jsonify({"error": "Invalid request format. Expecting JSON with 'task' and 'skill_required'."}), 400

    task = data.get('task')
    skill_required = data.get('skill_required')

    try:
        model = joblib.load("model.pkl")
        le_skill = joblib.load("le_skill.pkl")
    except FileNotFoundError:
        return jsonify({"error": "Model file or label encoders not found. Please train the model first."}), 500

    # Encode skill_required
    skill_encoded = le_skill.transform([skill_required])[0]

    # Predict the user for the new task
    user = model.predict([[skill_encoded]])[0]

    # Update the tasks list with the new task
    tasks.append({"task": task, "skill_required": skill_required, "assigned_to": user})

    return jsonify({"task": task, "assigned_to": user})

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/users', methods=['GET'])
def get_users():
    users = users_skills[["user", "skill"]].to_dict(orient='records')
    return jsonify(users)

if __name__ == '__main__':
    app.run(debug=True)
