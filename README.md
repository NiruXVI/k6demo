# K6 Direct Installation

https://github.com/grafana/k6/releases


# Project Layout

demo-project/
├─ backend/
│  ├─ app.py
│  └─ requirements.txt
├─ frontend/
│  └─ App.js
└─ loadtest/
   └─ login-test.js

# Run backend

cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py

# Test the /api/login route

Invoke-WebRequest -Uri "http://localhost:5000/api/login" `
  -Method POST `
  -Body '{"email":"test@example.com","password":"1234"}' `
  -ContentType "application/json"


# Run frontend

cd frontend
npm init -y
npm install expo react react-native
npx expo start

# Run k6

cd loadtest
k6 run loadtest.js

