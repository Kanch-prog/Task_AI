# Task Manager with AI-based Assignment

This project is a full-stack task management application that leverages machine learning to automatically assign tasks to users based on their skills. The frontend is built with React and Bootstrap, while the backend is implemented using Flask and a RandomForestClassifier from scikit-learn.

## Features

- **Task Submission:** Users can submit tasks along with the required skill.
- **Automatic Assignment:** Tasks are automatically assigned to the most suitable user based on their skills.
- **Task Display:** Displays a list of all tasks with assigned users.
- **User Management:** Displays a list of users and their skills.

## Technologies Used

### Frontend

- React
- Bootstrap
- Axios

### Backend

- Flask
- scikit-learn
- pandas
- joblib

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js and npm
- Python 3
- Flask

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/task-manager-ai.git
   cd task-manager-ai
Install frontend dependencies:

2. ```bash
cd frontend
npm install
Install backend dependencies:

3. ```bash
cd ../backend
pip install -r requirements.txt
Running the Application
Start the Flask server:

4. ```bash
cd backend
python app.py
Start the React app:

5. ```bash
cd ../frontend
npm start
