import http from "k6/http";
import { check, sleep } from "k6";

// Backend URL
const url = "http://192.168.1.8:5000/api/login";

// Simulated users
const users = [
    { email: "test@example.com", password: "1234" },
    { email: "user1@example.com", password: "1234" },
    { email: "user2@example.com", password: "abcd" },
    { email: "user3@example.com", password: "1234" }
];

export const options = {
    vus: 10,       // 10 virtual users
    duration: "10s" // run for 30 seconds
};

export default function () {
    // Pick a random user
    const user = users[Math.floor(Math.random() * users.length)];

    const payload = JSON.stringify(user);
    const params = { headers: { "Content-Type": "application/json" } };

    // Send POST request to /api/login
    const res = http.post(url, payload, params);

    // Check if response is 200 OK
    check(res, { "status is 200": (r) => r.status === 200 });

    sleep(1); // wait 1 second between iterations
}
