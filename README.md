# Markdown Note-Taking API

A powerful backend service for a note-taking application, built with Node.js, Express, and MongoDB. This API allows users to manage markdown notes with features like AI-powered grammar checking, HTML rendering, and file uploads.

This project was built based on the **[Backend Project Ideas from roadmap.sh](https://roadmap.sh/projects/markdown-note-taking-app)**.

---

## ✨ Features

* **User Authentication**: Secure user registration and login using JWT (JSON Web Tokens).
* **CRUD Operations for Notes**: Full Create, Read, Update, and Delete functionality for notes.
* **Role-Based Access Control**: Admins can view, update, and delete any user's notes, while regular users can only access their own.
* **Markdown File Uploads**: Create notes by uploading `.md` files directly.
* **Markdown-to-HTML Rendering**: An endpoint to convert a note's markdown content into HTML.
* **AI-Powered Grammar Checker**: A dedicated endpoint using the **Google Gemini API** to check the grammar of any given text.
* **Interactive API Documentation**: Full API documentation available via Swagger UI.

---

## 🛠️ Technology Stack

* **Backend**: Node.js, Express.js
* **Database**: MongoDB with Mongoose
* **Authentication**: JSON Web Tokens (JWT), bcryptjs
* **File Handling**: Multer
* **Markdown Parsing**: Marked
* **AI Grammar Checking**: Google Gemini (`@google/generative-ai`)
* **API Documentation**: Swagger UI Express
* **Development**: Nodemon, Morgan

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/try/download/community) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/amirs0b/Roadmap.sh-Markdown-Note-taking.git](https://github.com/amirs0b/Roadmap.sh-Markdown-Note-taking.git)
    cd Roadmap.sh-Markdown-Note-taking
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `config.env` file in the root of your project and add the following variables.

    ```env
    DATA_BASE=mongodb://localhost:27017/markdownnoteDb
    PORT=5000
    JWT_SECRET=your_super_secret_jwt_key
    GEMINI_API_KEY=your_google_gemini_api_key
    ```

### Running the Application

* **Development Mode** (with hot-reloading):
    ```bash
    npm run dev
    ```

* **Production Mode**:
    ```bash
    npm start
    ```

The server will be running on `http://localhost:5000`.

---

## 📚 API Documentation

This project includes interactive API documentation powered by Swagger. Once the server is running, you can access it at:

**[http://localhost:5000/api-docs](http://localhost:5000/api-docs)**

---

## 🗺️ API Endpoints

All endpoints are prefixed with `/api`.

| Feature                 | Method | Endpoint                | Protection | Description                                       |
| ----------------------- | ------ | ----------------------- | ---------- | ------------------------------------------------- |
| **Authentication** | `POST` | `/auth/register`        | Public     | Register a new user.                              |
|                         | `POST` | `/auth`                 | Public     | Log in to get a JWT token.                        |
| **Notes** | `POST` | `/notes`                | User       | Create a new note from raw text.                  |
|                         | `GET`  | `/notes`                | User       | Get all notes for the logged-in user (or all if admin). |
|                         | `GET`  | `/notes/{id}`           | User       | Get a single note by its ID.                      |
|                         | `PATCH`| `/notes/{id}`           | User       | Update a note by its ID.                          |
|                         | `DELETE`| `/notes/{id}`           | User       | Delete a note by its ID.                          |
|                         | `GET`  | `/notes/{id}/render`    | User       | Render a note's Markdown content as HTML.         |
| **File Upload** | `POST` | `/upload`               | User       | Create a note by uploading a `.md` file.          |
| **Grammar Checker** | `POST` | `/grammar/check`        | User       | Check the grammar of a piece of text.             |