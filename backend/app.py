# Import required Flask modules and CORS for cross-origin requests
from flask import Flask, request, jsonify
from flask_cors import CORS

# Create Flask application instance
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) for all routes
# This allows frontend applications (like React Native) running on different 
# domains/ports to make requests to this API
CORS(app)

# Define the login endpoint route
@app.route("/api/login", methods=["POST"])
def login():
    """
    Handle user login requests
    
    Expected JSON payload:
    {
        "email": "user@example.com",
        "password": "userpassword"
    }
    
    Returns JSON response with login status
    """
    # Extract JSON data from the incoming request
    data = request.json
    
    # Get email and password from the request data
    # .get() method safely retrieves values, returns None if key doesn't exist
    email = data.get("email")
    password = data.get("password")
    
    # Simple authentication check (hardcoded for demo purposes)
    # In production, this would check against a database with hashed passwords
    if email == "test@example.com" and password == "1234":
        # Return success response as JSON
        return jsonify({"status": "success"})
    
    # Return failure response for any other email/password combination
    return jsonify({"status": "fail"})

# Run the application only if this file is executed directly (not imported)
if __name__ == "__main__":
    # Start the Flask development server
    app.run(
        host="0.0.0.0",  # Listen on all available network interfaces
                         # This allows external devices to connect to the API
        port=5000,       # Run on port 5000 (matches the URL in your other code)
        debug=True       # Enable debug mode for development
                         # - Provides detailed error messages
                         # - Automatically restarts server when code changes
                         # - Should be False in production for security
    )