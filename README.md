# 🏠 Blockchain-Based Land Registry System

A secure and decentralized **Land Registry System** built using **Hyperledger Fabric**, **Node.js**, **CouchDB**, **HTML**, **CSS**, and **JavaScript**. This system enables secure land registration, ownership transfer, property search, mortgage filing, and account management using blockchain technology.

---

# 📌 Features

- 📄 Register New Land
- 🔍 Search Land Records
- 🔁 Transfer Land Ownership
- 🏦 Mortgage E-Filing
- 👤 My Account
- 🗺️ Interactive Map using Leaflet
- 🔐 Blockchain-based Data Storage
- 📦 CouchDB World State Database
- ⚡ Node.js REST API

---

# 🛠️ Technologies Used

## Frontend

- HTML5
- CSS3
- JavaScript
- Leaflet.js

## Backend

- Node.js
- Express.js
- CORS

## Blockchain

- Hyperledger Fabric
- Smart Contracts (Chaincode)
- CouchDB

## Tools

- Docker Desktop
- Git
- GitHub
- VS Code

---

# 📂 Project Structure

```
Blockchain-project/

│── frontend/
│     │── index.html
│     │── search.html
│     │── transfer.html
│     │── mortgage.html
│     │── myaccount.html
│     │── style.css
│     │── script.js
│
│── backend/
│     │── app.js
│     │── fabric.js
│     │── connection-org1.json
│     │── wallet/
│     │── package.json
│
│── chaincode/
│     │── land.js
│
│── fabric-samples/
│
└── README.md
```

---

# ⚙️ Prerequisites

Before running the project install:

- Node.js
- Docker Desktop
- Git
- Hyperledger Fabric Samples
- Visual Studio Code

---

# 📥 Clone the Repository

```bash
git clone https://github.com/your-username/Blockchain-project.git

cd Blockchain-project
```

---

# 📦 Backend Installation

Navigate to backend

```bash
cd backend
```

Initialize project

```bash
npm init -y
```

Install dependencies

```bash
npm install
```

or

```bash
npm install express cors body-parser fabric-network
```

---

# 🌐 Running Backend

```bash
node app.js
```

Server starts at

```
http://localhost:3000
```

---

# 💻 Running Frontend

Open

```
frontend/index.html
```

using Live Server in VS Code.

---

# 🐳 Docker Commands

Check Docker Version

```bash
docker --version
```

Check Running Containers

```bash
docker ps
```

Check All Containers

```bash
docker ps -a
```

Stop Containers

```bash
docker stop <container-id>
```

Remove Containers

```bash
docker rm <container-id>
```

---

# ⛓️ Hyperledger Fabric Setup

Go to test network

```bash
cd fabric-samples/test-network
```

Stop Existing Network

```bash
./network.sh down
```

Start Network

```bash
./network.sh up createChannel -ca
```

Deploy Chaincode

```bash
./network.sh deployCC -ccn land -ccp ../../chaincode -ccl javascript
```

---

# 👤 Create Identity

Go to

```bash
cd ../test-application/javascript
```

Enroll Admin

```bash
node enrollAdmin.js
```

Register User

```bash
node registerUser.js
```

---

# 🔗 Connect Backend with Fabric

Copy

```
connection-org1.json
```

From

```
fabric-samples/test-network/organizations/peerOrganizations/org1.example.com
```

To

```
backend/
```

---

# 📊 CouchDB

CouchDB stores the blockchain world state.

Features

- Fast Queries
- JSON Storage
- Rich Queries
- World State Database

---

# 🔐 Blockchain Workflow

```
User

↓

Frontend

↓

Node.js Backend

↓

Hyperledger Fabric

↓

Chaincode

↓

CouchDB
```

---

# 📌 APIs

### Register Land

```
POST /register
```

### Search Lands

```
GET /lands
```

### Transfer Ownership

```
POST /transfer
```

### Mortgage

```
POST /mortgage
```

---

# 🚀 Future Enhancements

- Aadhaar Authentication
- QR Code Verification
- IPFS Document Storage
- Digital Signature
- Email Notifications
- Admin Dashboard
- Blockchain Analytics

---

# 👨‍💻 Developed By

**Kushal Kumar G D**

Computer Science & Engineering

GM Institute of Technology

---

# 📄 License

This project is developed for educational and academic purposes.
