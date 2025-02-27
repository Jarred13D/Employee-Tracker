import inquirer from 'inquirer';
import client from './connection';
import employeeDB from './queries';
import 'console.table';
import {
    MenuAnswer,
    DepartmentAnswer,
    RoleAnswer,
    EmployeeAnswer,
    UpdateRoleAnswer,
    UpdateManagerAnswer,
    ManagerSelection,
    DepartmentSelection,
    RoleSelection,
    EmployeeSelection,
} from './interfaces';

async function mainMenu(): Promise<void> {
    const { action } = await inquirer.prompt<MenuAnswer>([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Update employee manager',
                'View employees by manager',
                'View employees by department',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'View total utilized budget of a department',
                'Exit',
            ],
        },
    ]);

    switch (action) {
        case 'View all departments':
            console.table(await employeeDB.viewAllDepartments());
            break;
        case 'View all roles':
            console.table(await employeeDB.viewAllRoles());
            break;
        case 'View all employees':
            console.table(await employeeDB.viewAllEmployees());
            break;
        case 'Add a department': {
            const { name } = await inquirer.prompt<DepartmentAnswer>([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Enter the name of the new department:',
                },
            ]);
            await employeeDB.addDepartment(name);
            console.log(`Department "${name}" added.`);
            break;
        }
        case 'Add a role': {
            const deptRes = await client.query('SELECT id, name FROM department');
            const departments = deptRes.rows;
            const deptChoices = departments.map((dept: any) => ({
                name: dept.name,
                value: dept.id,
            }));
            const answers = await inquirer.prompt<RoleAnswer>([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the name of the new role:',
                },
                {
                    type: 'number',
                    name: 'salary',
                    message: 'Enter the salary for the new role:',
                },
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Select the department for the new role:',
                    choices: deptChoices,
                },
            ]);
            await employeeDB.addRole(answers.title, answers.salary, answers.department_id);
            console.log(`Role "${answers.title}" added.`);
            break;
        }
        case 'Add an employee': {
            const roleRes = await client.query('SELECT id, title FROM role');
            const roles = roleRes.rows;
            const roleChoices = roles.map((role: any) => ({
                name: role.title,
                value: role.id,
            }));
            const empRes = await client.query('SELECT id, first_name, last_name FROM employee');
            const employees = empRes.rows;
            const managerChoices = employees.map((emp: any) => ({
                name: `${emp.first_name} ${emp.last_name}`,
                value: emp.id,
            }));
            managerChoices.unshift({ name: 'None', value: null });
            const answers = await inquirer.prompt<EmployeeAnswer>([
                {
                    type: 'input',
                    name: 'first_name',
                    message: "Enter the employee's first name:",
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: "Enter the employee's last name:",
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: "Select the employee's role:",
                    choices: roleChoices,
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: "Select the employee's manager:",
                    choices: managerChoices,
                },
            ]);
            await employeeDB.addEmployee(
                answers.first_name,
                answers.last_name,
                answers.role_id,
                answers.manager_id
            );
            console.log(`Employee "${answers.first_name} ${answers.last_name}" added.`);
            break;
        }
        case 'Update an employee role': {
            const empRes = await client.query('SELECT id, first_name, last_name FROM employee');
            const employees = empRes.rows;
            const employeeChoices = employees.map((emp: any) => ({
                name: `${emp.first_name} ${emp.last_name}`,
                value: emp.id,
            }));
            const roleRes = await client.query('SELECT id, title FROM role');
            const roles = roleRes.rows;
            const roleChoices = roles.map((role: any) => ({
                name: role.title,
                value: role.id,
            }));
            const answers = await inquirer.prompt<UpdateRoleAnswer>([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: 'Select the employee whose role you want to update:',
                    choices: employeeChoices,
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Select the new role for the employee:',
                    choices: roleChoices,
                },
            ]);
            await employeeDB.updateEmployeeRole(answers.employee_id, answers.role_id);
            console.log("Employee's role updated.");
            break;
        }
        case 'Update employee manager': {
            const empRes = await client.query('SELECT id, first_name, last_name FROM employee');
            const employees = empRes.rows;
            const employeeChoices = employees.map((emp: any) => ({
                name: `${emp.first_name} ${emp.last_name}`,
                value: emp.id,
            }));
            const answers = await inquirer.prompt<UpdateManagerAnswer>([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: 'Select the employee whose manager you want to update:',
                    choices: employeeChoices,
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'Select the new manager for the employee:',
                    choices: employeeChoices.concat([{ name: 'None', value: null }]),
                },
            ]);
            await employeeDB.updateEmployeeManager(answers.employee_id, answers.manager_id);
            console.log("Employee's manager updated.");
            break;
        }
        case 'View employees by manager': {
            const query = `
        SELECT DISTINCT m.id, m.first_name, m.last_name
        FROM employee e
        JOIN employee m ON e.manager_id = m.id;
      `;
            const res = await client.query(query);
            const managers = res.rows;
            const managerChoices = managers.map((manager: any) => ({
                name: `${manager.first_name} ${manager.last_name}`,
                value: manager.id,
            }));
            const { manager_id } = await inquirer.prompt<ManagerSelection>([
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'Select a manager to view their employees:',
                    choices: managerChoices,
                },
            ]);
            const employeesRes = await employeeDB.viewEmployeesByManager(manager_id);
            console.table(employeesRes);
            break;
        }
        case 'View employees by department': {
            const deptRes = await client.query('SELECT id, name FROM department');
            const departments = deptRes.rows;
            const deptChoices = departments.map((dept: any) => ({
                name: dept.name,
                value: dept.id,
            }));
            const { department_id } = await inquirer.prompt<DepartmentSelection>([
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Select a department to view its employees:',
                    choices: deptChoices,
                },
            ]);
            const res = await employeeDB.viewEmployeesByDepartment(department_id);
            console.table(res);
            break;
        }
        case 'Delete a department': {
            const deptRes = await client.query('SELECT id, name FROM department');
            const departments = deptRes.rows;
            const deptChoices = departments.map((dept: any) => ({
                name: dept.name,
                value: dept.id,
            }));
            const { department_id } = await inquirer.prompt<DepartmentSelection>([
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Select a department to delete:',
                    choices: deptChoices,
                },
            ]);
            await employeeDB.deleteDepartment(department_id);
            console.log('Department deleted.');
            break;
        }
        case 'Delete a role': {
            const roleRes = await client.query('SELECT id, title FROM role');
            const roles = roleRes.rows;
            const roleChoices = roles.map((role: any) => ({
                name: role.title,
                value: role.id,
            }));
            const { role_id } = await inquirer.prompt<RoleSelection>([
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Select a role to delete:',
                    choices: roleChoices,
                },
            ]);
            await employeeDB.deleteRole(role_id);
            console.log('Role deleted.');
            break;
        }
        case 'Delete an employee': {
            const empRes = await client.query('SELECT id, first_name, last_name FROM employee');
            const employees = empRes.rows;
            const employeeChoices = employees.map((emp: any) => ({
                name: `${emp.first_name} ${emp.last_name}`,
                value: emp.id,
            }));
            const { employee_id } = await inquirer.prompt<EmployeeSelection>([
                {
                    type: 'list',
                    name: 'employee_id',
                    message: 'Select an employee to delete:',
                    choices: employeeChoices,
                },
            ]);
            await employeeDB.deleteEmployee(employee_id);
            console.log('Employee deleted.');
            break;
        }
        case 'View total utilized budget of a department': {
            const deptRes = await client.query('SELECT id, name FROM department');
            const departments = deptRes.rows;
            const deptChoices = departments.map((dept: any) => ({
                name: dept.name,
                value: dept.id,
            }));
            const { department_id } = await inquirer.prompt<DepartmentSelection>([
                {
                    type: 'list',
                    name: 'department_id',
                    message: 'Select a department to view its utilized budget:',
                    choices: deptChoices,
                },
            ]);
            const res = await employeeDB.viewDepartmentBudget(department_id);
            if (res.length > 0) {
                console.table(res);
            } else {
                console.log('No employees in this department.');
            }
            break;
        }
        case 'Exit':
            console.log('Goodbye!');
            process.exit();
    }
    await mainMenu();
}

async function init(): Promise<void> {
    try {
        await client.connect();
        console.log('Connected to the database.');
        await mainMenu();
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
}

init();
