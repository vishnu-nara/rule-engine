# Rule Engine Project

This project implements a rule engine with a backend server and a frontend interface. It allows users to create, combine, and evaluate rules using an Abstract Syntax Tree (AST) approach.

## Project Structure

```
project-root/
│
├── server.js
├── ruleController.js
├── database.js
├── ast.js
├── public/
│   ├── index.html
│   └── script.js
├── package.json
└── README.md
```

## Features

- Create rules with a simple string syntax
- Combine multiple rules
- Evaluate rules against provided data
- Store rules in an in-memory SQLite database
- Frontend interface for interacting with the rule engine

## Prerequisites

- Node.js (v12 or higher recommended)
- npm (usually comes with Node.js)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/rule-engine-project.git
   cd rule-engine-project
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the Application

1. Start the server:
   ```
   node server.js
   ```

2. Open a web browser and navigate to `http://localhost:3000`

## API Endpoints

- POST `/api/create_rule`: Create a new rule
- POST `/api/combine_rules`: Combine multiple rules
- POST `/api/evaluate_rule`: Evaluate a rule against provided data
- POST `/api/evaluate_ast`: Evaluate an AST directly
- GET `/api/get_rules`: Retrieve all stored rules

## Usage

### Creating a Rule

Enter a rule string in the format: `"field" operator value`
Example: `"temperature" > 30`

### Combining Rules

Enter the IDs of the rules you want to combine, separated by newlines.

### Evaluating a Rule

1. Enter the rule ID
2. Provide the data in JSON format
3. Click "Evaluate Rule"

### Evaluating an AST

1. Enter the AST in JSON format
2. Provide the data in JSON format
3. Click "Evaluate AST"

## Components

- `server.js`: Main server file
- `ruleController.js`: Handles API routes and logic
- `database.js`: Manages SQLite database operations
- `ast.js`: Implements the Abstract Syntax Tree logic
- `script.js`: Frontend JavaScript for interacting with the API

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- SQLite for providing a lightweight database solution
- Express.js for the web server framework

