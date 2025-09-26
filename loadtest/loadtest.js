import http from "k6/http";
import { check, sleep } from "k6";

const url = "http://192.168.1.8:5000/api/login";

const users = [
    { email: "test@example.com", password: "1234" },
    { email: "user1@example.com", password: "1234" },
    { email: "user2@example.com", password: "abcd" },
    { email: "user3@example.com", password: "1234" }
];

export const options = {
    vus: 600,
    duration: "20s"
};

export default function () {
    const user = users[Math.floor(Math.random() * users.length)];
    const payload = JSON.stringify(user);
    const params = { headers: { "Content-Type": "application/json" } };
    const res = http.post(url, payload, params);
    check(res, { "status is 200": (r) => r.status === 200 });
    sleep(1);
}