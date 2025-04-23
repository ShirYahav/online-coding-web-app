# Online Coding Web App

> A real-time collaborative JavaScript coding platform with mentor and student roles.

---

⚠️ **IMPORTANT:** Since this app is hosted using the free version of Render, the first time you open the link it may show only the title while the service spins up. Please wait ~1 minute for the server to come online.

---

## Table of Contents

- [Demo & Screenshots](#demo--screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture & Folder Structure](#architecture--folder-structure)
- [Environment Variables](#environment-variables)
- [Installation & Database Seeding](#installation--database-seeding)
- [Usage](#usage)

---

## Demo & Screenshots

- **Live App:**  
  [https://online-coding-web-app-client-hnla.onrender.com/](https://online-coding-web-app-client-hnla.onrender.com/)

- **Lobby Page:**  
  ![Lobby Page](https://github.com/user-attachments/assets/d9fe696a-49cf-423a-a18d-cd04fae6c0e3)

- **Demo Example:**  
  [![Click to watch the demo](https://img.shields.io/badge/Watch-Demo%20Video-blue?style=for-the-badge&logo=github)](https://github.com/user-attachments/assets/25f99701-ee8f-4282-835e-66bb4fc1c71b)  
  _Click to watch the full walkthrough._

---

## Features

- Lobby with “Choose code block”
- Real-time collaborative editor via Socket.IO
- Role assignment (mentor vs. student)
- Session termination on mentor disconnect
  - Deletes room state
  - Redirects all students back to Lobby
- Syntax highlighting
- Live student-count display
- Big smiley celebration when:
  - Student matches the correct solution
  - OR passes all test cases
- Interactive sandbox to run code and validate against predefined tests
- Hint system: Request incremental hints to guide through challenges
- Fully mobile responsive

---

## Tech Stack

- **Client:** React, React Router, Tailwind CSS, shadcn
- **Server:** Node.js, Express, Socket.IO
- **Database:** MongoDB (via Mongoose)
- **Deployment:** Docker (for local dev), Render (for live hosting)

---

## Architecture & Folder Structure

```
├── Client
│   ├── dist
│   ├── node_modules
│   ├── public
│   ├── src
│   ├── .env
│   ├── .env.production
│   ├── index.html
│   ├── jsconfig.json
│   ├── package-lock.json
│   └── package.json
├── mongo-seed
│   └── moveoapp
│       └── codeblocks.json
├── Server
│   ├── node_modules
│   ├── src
│   ├── .env
│   ├── .env.production
│   ├── package.json
│   ├── package-lock.json
│   └── seed.js
├── .gitignore
└── docker-compose.yml
```

---

## Environment Variables

Create a `.env` file in **both** the `Server` and `Client` directories **before starting the app**.

### 📁 Server/.env

| Variable       | Value                              |
| -------------- | ---------------------------------- |
| `NODE_ENV`     | development                        |
| `MONGO_DB_URI` | mongodb://localhost:27017/moveoapp |

### 📁 Client/.env

| Variable        | Value                  |
| --------------- | ---------------------- |
| `VITE_API_ROOT` | http://localhost:3001/ |

---

## Installation & Database Seeding

### Step 1: Clone & install

```
git clone https://github.com/ShirYahav/online-coding-web-app.git
cd online-coding-web-app
```

- **Client:**

```
cd Client
npm install
```

- **Server:**

```
cd ../Server
npm install
```

### Step 2: Start MongoDB (with Docker)

_Make sure your Server/.env has:_

```
MONGO_DB_URI=mongodb://localhost:27017/moveoapp
```

From the root of the project (where docker-compose.yml lives), run:

```
docker-compose up -d mongo
```

This will launch MongoDB on localhost:27017

### Step 3: Seed the database

```
cd Server
npm run seed
```

This reads mongo-seed/moveoapp/codeblocks.json and populates the moveoapp database.

### Step 4: Start the Server

```
npm run dev
```

The Express API will run at: http://localhost:3001

### Step 5: Start the Client

Open a new terminal:

```
cd Client
npm start
```

The React app will run at: http://localhost:5173

---

## Usage

- **Select a code block:**  
  Click the desired code block to open it in the editor.

- **Request hints:**  
  Click **Get Hint** to reveal the next hint. You can also click a hint’s header to collapse it again.  
  _(Note: Mentors cannot request hints.)_

- **Run your code:**  
  Click **Run** to execute your code in the sandbox. It will automatically check against the exercise’s tests.  
  Passing all tests triggers a big smiley celebration!

- **Role indicator:**  
  Your current role (**mentor** or **student**) is displayed in the top-right corner of the screen.

- **Return to Lobby:**  
  Click the back arrow in the top-left corner at any time to leave the session and return to the lobby.

---
