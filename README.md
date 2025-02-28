# Employee Tracker CLI

Employee Tracker CLI is a command‑line application for managing a company’s employee database. Built with Node.js, Inquirer, PostgreSQL, and TypeScript, this tool allows users to view, add, update, and delete departments, roles, and employees. It also provides advanced functionalities like viewing employees by manager or department and calculating departmental budgets.

---

## Features

- **View Departments, Roles, and Employees:**  
  Displays data from the company’s database in a clear, tabulated format.

- **Add, Update, and Delete Records:**  
  - Add new departments, roles, and employees.  
  - Update employee roles and managers.  
  - Delete departments, roles, and employees with validation to prevent data inconsistency (for example, preventing the deletion of a department that is still referenced by roles).

- **Advanced Reporting:**  
  - View employees by manager or by department.
  - Calculate and display the total utilized budget of a department.

- **Interactive CLI Interface:**  
  Uses Inquirer for an interactive menu, making it easy to navigate and manage your data.

---

## Getting Started

Follow these instructions to set up and run the application on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org) (v12 or higher recommended)
- [PostgreSQL](https://www.postgresql.org)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/employee-tracker-cli.git
   cd employee-tracker-cli

2. **Install Dependencies:**

    npm install

### Database Setup

1. **Configure PostgreSQL:**
    - Create a new PostgreSQL database (for example, employee_db).
    - Update the connection details in the connection.ts file with your PostgreSQL credentials.

2. **Seed the Database:**
    - A seeds.sql file is provided to create the necessary tables and populate sample data. The schema includes:
        - department table with columns: id, name
        - role table with columns: id, title, salary, department (a foreign key referencing department.id)
        - employee table with columns: id, first_name, last_name, role_id, manager_id

Run the following command (replace your_pg_username with your PostgreSQL username):

    psql -U your_pg_username -d employee_db -f seeds.sql

### Running the Application

To start the application, use the following command:
    
    npx ts-node index.ts

### Walkthrough Guide

### Contributing

Contributions are welcome! If you find a bug or have an enhancement idea, please open an issue or submit a pull request.

1. Fork the repository.
2. Create your feature branch (git checkout -b feature/YourFeature).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/YourFeature).
5. Open a pull request.

### License

This project is licensed under the MIT License.