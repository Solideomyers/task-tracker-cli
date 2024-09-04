# Task CLI - Command Line Task Manager

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## Description

**Task CLI** is a Node.js application that allows you to manage tasks directly from the command line. This project is designed to help developers keep track of their pending tasks, organize them, and manage them efficiently without the need for graphical interfaces. The tool is fully modular and scalable, allowing for easy adaptation and expansion according to your needs.

## Technologies Used

- **TypeScript**: Ensures type safety and improves code maintainability.
- **Joi**: Used for validating task data.
- **Jest**: A testing framework to ensure the robustness of the application.
- **Node.js**: The runtime environment for executing the CLI.

## Methodologies

This project follows the following practices and methodologies:

- **SOLID Principles**: Ensuring clean and maintainable code.
- **Testing with Jest**: Every critical function is accompanied by unit tests to ensure correct functionality.
- **Documentation**: The code is documented to facilitate understanding and expansion.

## Project Structure

- **src/**: Contains the project's source code.
- **controllers/**: Handles the CLI operations.
- **models/**: Contains model definitions and enums.
- **services/**: Business logic related to tasks.
- **validators/**: Validations using Joi.
- **errors/**: Custom error handlers.
- **tests/**: Contains unit tests written in Jest.
- **dist/**: Contains the compiled JavaScript code.

## Installation

To install and run this application locally, follow these steps:

```bash
# Clone the repository
git clone https://github.com/Solideomyers/task-tracker-cli.git

# Navigate to the project directory
cd task-cli

# Install dependencies
npm install

# Build the project
npm run build

# Run the application
node dist/index.js [command]
```

---

## NOTE:

    To use the task-cli command from any directory, you can add `task-cli.bat` to the PATH.

---

## Usage

Run `task-cli` followed by a command to interact with the application:

```bash
# Add a new task
task-cli add

# Update an existing task
task-cli update

# Delete a task by ID
task-cli delete <id>

# List all tasks or filter by status
task-cli list [todo|in-progress|done]

# Mark a task as in progress
task-cli mark-in-progress <id>

# Mark a task as completed
task-cli mark-done <id>

# Delete all tasks
task-cli delete-all
```

For more details on the commands, you can run:

```bash
task-cli --help
```

## Contributions

Contributions are welcome. You can open an issue or submit a pull request on the [GitHub repository](https://github.com/Solideomyers/task-tracker-cli).

## Contact

![GitHub](https://img.shields.io/badge/GitHub-solideomyers-181717?style=for-the-badge&logo=github)
![LinkedIn](https://img.shields.io/badge/LinkedIn-franciscomyers-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)

If you have any questions or suggestions, feel free to contact me through [GitHub](https://github.com/solideomyers) or [LinkedIn](https://www.linkedin.com/in/franciscomyers/).
