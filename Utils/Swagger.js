export const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        version: "1.0.0",
        title: "Markdown Note-Taking API",
        description: "A RESTful API for creating, managing, and processing markdown notes.",
        contact: {
            name: "Amir Sobhani",
            url: "https://github.com/amirs0b"
        }
    },
    servers: [
        {
            url: "http://localhost:5000/api",
            description: "Local development server"
        }
    ],
    components: {
        schemas: {
            User: {
                type: "object",
                properties: {
                    id: { type: "string", example: "60d0fe4f5311236168a109ca" },
                    username: { type: "string", example: "testuser" },
                    email: { type: "string", example: "test@example.com" },
                    role: { type: "string", enum: ["user", "admin"], example: "user" }
                }
            },
            Note: {
                type: "object",
                properties: {
                    _id: { type: "string", example: "60d0fe4f5311236168a109cb" },
                    title: { type: "string", example: "My First Note" },
                    content: { type: "string", example: "# Hello World\nThis is my first note." },
                    tags: { type: "array", items: { type: "string" }, example: ["welcome", "tutorial"] },
                    user: { type: "string", example: "60d0fe4f5311236168a109ca" },
                    createdAt: { type: "string", format: "date-time", example: "2025-09-26T17:30:00.000Z" },
                    updatedAt: { type: "string", format: "date-time", example: "2025-09-26T17:30:00.000Z" }
                }
            }
        },
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    },
    paths: {
        "/auth/register": {
            post: {
                tags: ["Authentication"],
                summary: "Register a new user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    username: { type: "string" },
                                    email: { type: "string" },
                                    password: { type: "string" }
                                }
                            },
                            examples: {
                                "New User": {
                                    value: {
                                        username: "newuser",
                                        email: "newuser@example.com",
                                        password: "password123"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "201": { description: "User registered successfully" }
                }
            }
        },
        "/auth": {
            post: {
                tags: ["Authentication"],
                summary: "Login a user",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    username: { type: "string" },
                                    password: { type: "string" }
                                }
                            },
                            examples: {
                                "Valid User": {
                                    value: {
                                        username: "newuser",
                                        password: "password123"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Successful login, returns JWT token and user info",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        token: { type: "string" },
                                        user: { "$ref": "#/components/schemas/User" }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/notes": {
            post: {
                tags: ["Notes"],
                summary: "Create a new note from text",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    title: { type: "string" },
                                    content: { type: "string" },
                                    tags: { type: "array", items: { type: "string" } }
                                }
                            },
                            examples: {
                                "New Note Example": {
                                    value: {
                                        title: "My Awesome Note",
                                        content: "## This is a heading\n\n* And a list item.",
                                        tags: ["getting-started", "markdown"]
                                    }
                                }
                            }
                        }
                    }
                },
                responses: { "201": { description: "Note created successfully" } }
            }
        },
        "/notes/{id}": {
            get: {
                tags: ["Notes"],
                summary: "Get a single note by ID",
                security: [{ bearerAuth: [] }],
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                responses: {
                    "200": {
                        description: "Single note object",
                        content: {
                            "application/json": {
                                schema: {
                                    properties: {
                                        status: { type: "string", example: "success" },
                                        data: {
                                            properties: {
                                                note: { "$ref": "#/components/schemas/Note" }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            patch: {
                tags: ["Notes"],
                summary: "Update a note by ID",
                security: [{ bearerAuth: [] }],
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    title: { type: "string" },
                                    content: { type: "string" }
                                }
                            },
                            examples: {
                                "Update Title and Content": {
                                    value: {
                                        title: "My Updated Awesome Note",
                                        content: "The content has been updated!"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: { "200": { description: "Note updated successfully" } }
            },
            delete: {
                tags: ["Notes"],
                summary: "Delete a note by ID",
                security: [{ bearerAuth: [] }],
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                responses: { "204": { description: "Note deleted successfully" } }
            }
        },
        "/notes/{id}/render": {
            get: {
                tags: ["Notes"],
                summary: "Render a note's content as HTML",
                security: [{ bearerAuth: [] }],
                parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
                responses: {
                    "200": {
                        description: "Rendered HTML content",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: { type: "string" },
                                        data: {
                                            properties: {
                                                html: { type: "string" }
                                            }
                                        }
                                    }
                                },
                                examples: {
                                    "Rendered HTML": {
                                        value: {
                                            status: "success",
                                            data: {
                                                html: "<h2>This is a heading</h2>\n<ul>\n<li>And a list item.</li>\n</ul>\n"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/upload": {
            post: {
                tags: ["Notes"],
                summary: "Create a note by uploading a Markdown file",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "multipart/form-data": {
                            schema: {
                                type: "object",
                                properties: {
                                    noteFile: {
                                        type: "string",
                                        format: "binary",
                                        description: "The .md file to upload."
                                    }
                                }
                            }
                        }
                    }
                },
                responses: { "201": { description: "Note created from file" } }
            }
        },
        "/grammar/check": {
            post: {
                tags: ["Utilities"],
                summary: "Check grammar using Gemini AI",
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    text: { type: "string" }
                                }
                            },
                            examples: {
                                "Text with Errors": {
                                    value: {
                                        text: "helo world. this is a testt."
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Grammar check results",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        corrections: { type: "array" }
                                    }
                                },
                                examples: {
                                    "Correction Response": {
                                        value: {
                                            status: "success",
                                            data: {
                                                corrections: [
                                                    {
                                                        type: "Spelling",
                                                        original: "helo",
                                                        suggestion: "hello",
                                                        explanation: "'helo' is a common misspelling of 'hello'."
                                                    },
                                                    {
                                                        type: "Spelling",
                                                        original: "testt",
                                                        suggestion: "test",
                                                        explanation: "'testt' is a misspelling of 'test'."
                                                    }
                                                ]
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};