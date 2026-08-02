const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const http = require("http");

const app = express();
const port = process.env.PORT || 5000;
const dbPath = path.join(__dirname, "data", "users.json");
const studentsPath = path.join(__dirname, "data", "students.json");
const dataDir = path.dirname(dbPath);

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify([], null, 2));
}

if (!fs.existsSync(studentsPath)) {
  fs.writeFileSync(studentsPath, JSON.stringify([], null, 2));
}

app.use(cors());
app.use(bodyParser.json());

const readUsers = () => JSON.parse(fs.readFileSync(dbPath, "utf8"));
const writeUsers = (users) => fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
const readStudents = () => JSON.parse(fs.readFileSync(studentsPath, "utf8"));
const writeStudents = (students) => fs.writeFileSync(studentsPath, JSON.stringify(students, null, 2));

const createCaptcha = () => {
  const random = Math.floor(1000 + Math.random() * 9000);
  return random.toString();
};

const captchaStore = new Map();

app.get("/api/captcha", (req, res) => {
  const captcha = createCaptcha();
  const token = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  captchaStore.set(token, captcha);
  res.json({ token, captcha });
});

app.post("/api/register", async (req, res) => {
  const { name, email, password, captcha, token } = req.body;

  if (!name || !email || !password || !captcha || !token) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const expectedCaptcha = captchaStore.get(token);
  if (!expectedCaptcha || expectedCaptcha !== captcha) {
    return res.status(400).json({ message: "Captcha does not match." });
  }

  captchaStore.delete(token);

  const users = readUsers();
  const existingUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return res.status(409).json({ message: "User already exists." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now(),
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeUsers(users);

  return res.status(201).json({ message: "User registered successfully." });
});

app.post("/api/login", async (req, res) => {
  const { email, password, captcha, token } = req.body;

  if (!email || !password || !captcha || !token) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const expectedCaptcha = captchaStore.get(token);
  if (!expectedCaptcha || expectedCaptcha !== captcha) {
    return res.status(400).json({ message: "Captcha does not match." });
  }

  captchaStore.delete(token);

  const users = readUsers();
  const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  return res.json({
    message: "Login successful",
    user: { id: user.id, name: user.name, email: user.email },
  });
});

const faceService = {
  host: process.env.FACE_BACKEND_HOST || "127.0.0.1",
  port: process.env.FACE_BACKEND_PORT || 8001,
};

const forwardFaceRequest = (req, res, endpoint) => {
  const requestBody = JSON.stringify(req.body);
  const options = {
    hostname: faceService.host,
    port: faceService.port,
    path: endpoint,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };

  const proxy = http.request(options, (response) => {
    let data = "";
    response.on("data", (chunk) => {
      data += chunk;
    });
    response.on("end", () => {
      try {
        const payload = JSON.parse(data);
        res.status(response.statusCode || 200).json(payload);
      } catch (error) {
        res.status(response.statusCode || 500).json({ ok: false, message: "Face service error" });
      }
    });
  });

  proxy.on("error", () => {
    res.status(502).json({ ok: false, message: "Face backend unavailable" });
  });

  proxy.write(requestBody);
  proxy.end();
};



app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/students", (req, res) => {
  try {
    const students = readStudents();
    res.json(students);
    console.log("Students fetched successfully");
  } catch (error) {
    res.status(500).json({ message: "Failed to read students" });
  }
});

app.put("/api/students", (req, res) => {
  try {
    const students = req.body;
    if (!Array.isArray(students)) {
      return res.status(400).json({ message: "Students payload must be an array." });
    }

    writeStudents(students);
    return res.json({ message: "Students saved successfully", students });
  } catch (error) {
    return res.status(500).json({ message: "Failed to save students" });
  }
});

app.post("/api/face/register", (req, res) => {
  forwardFaceRequest(req, res, "/register");
});

app.post("/api/face/verify", (req, res) => {
  forwardFaceRequest(req, res, "/verify");
});

app.listen(port, () => {
  console.log(`Auth server running on http://localhost:${port}`);
  console.log(`Face backend expected on http://${faceService.host}:${faceService.port}`);
});
