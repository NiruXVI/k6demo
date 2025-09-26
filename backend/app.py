from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    if email == "test@example.com" and password == "1234":
        return jsonify({"status": "success"})
    return jsonify({"status": "fail"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
