// Import required k6 modules
import http from "k6/http";           // For making HTTP requests
import { check, sleep } from "k6";    // check: for assertions, sleep: for delays

// Backend URL - the endpoint we want to load test
const url = "http://192.168.1.8:5000/api/login";

// Array of simulated users with different credentials
// This allows testing with multiple user accounts to simulate real-world scenarios
const users = [
    { email: "test@example.com", password: "1234" },
    { email: "user1@example.com", password: "1234" },
    { email: "user2@example.com", password: "abcd" },
    { email: "user3@example.com", password: "1234" }
];

// Test configuration options
export const options = {
    vus: 600,       // Number of Virtual Users (VUs) - simulates 200 concurrent users
    duration: "20s" // How long to run the test - 20 seconds total
};

// Main test function - executed by each virtual user repeatedly during the test duration
export default function () {
    // Randomly select a user from the users array
    // This distributes login attempts across different user accounts
    const user = users[Math.floor(Math.random() * users.length)];

    // Convert user object to JSON string for the request body
    const payload = JSON.stringify(user);
    
    // Set request headers - specify that we're sending JSON data
    const params = { headers: { "Content-Type": "application/json" } };

    // Send POST request to the login endpoint with user credentials
    const res = http.post(url, payload, params);

    // Validate the response - check if the server returned HTTP 200 (success)
    // This creates a metric that k6 will track and report
    check(res, { 
        "status is 200": (r) => r.status === 200 
    });

    // Wait 1 second before the next iteration
    // This simulates realistic user behavior (users don't spam requests immediately)
    // and helps control the request rate
    sleep(1);
}