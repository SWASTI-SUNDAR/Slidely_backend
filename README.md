# Desktop App and Backend Server for Form Submissions

## Overview

This project includes a Windows Desktop App built with Visual Basic and a backend server using Express with TypeScript. The app allows users to create, view, edit, delete, and search form submissions.

## Frontend

### Requirements

- Windows Desktop App
- Visual Studio (not Visual Studio Code)
- Visual Basic

### Features

- **View Submissions**
  - Navigate through submissions with "Previous" (Ctrl + P) and "Next" (Ctrl + N) buttons.
- **Create New Submission**
  - Submit a new form with "Submit" (Ctrl + S) and toggle a stopwatch with "Toggle Stopwatch" (Ctrl + T).
- **Keyboard Shortcuts**
  - View Submissions: Ctrl + V
  - Create New Submission: Ctrl + N
`

## Backend

### Requirements

- Express server with TypeScript
- JSON file as a database (`db.json`)

### Endpoints

- **/ping** - GET request to check server status
- **/submit** - POST request to submit a new form
- **/read** - GET request to read a form by index
- **/read-all** - GET request to read all forms
- **/delete** - DELETE request to delete a form by index
- **/update** - PUT request to update a form by index
- **/search** - GET request to search forms by email

### Installation

1. Install dependencies:
    ```sh
    npm install
    ```

2. Run the server:
    ```sh
    npm start
    ```



### Database

- **db.json**
    ```json
    [
      {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "1234567890",
        "github_link": "https://github.com/johndoe",
        "stopwatch_time": "00:00:00"
      }
    ]
    ```

## License

This project is licensed under the MIT License.
