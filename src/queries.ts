import client from './connection';

class employeeDB {
  async viewAllDepartments() {
    const res = await client.query('SELECT id, name FROM department ORDER BY id');
    return res.rows;
  }

  async viewAllRoles() {
    const query = `
      SELECT role.id, role.title, department.name AS department, role.salary
      FROM role
      JOIN department ON role.department = department.id
      ORDER BY role.id;
    `;
    const res = await client.query(query);
    return res.rows;
  }

  async viewAllEmployees() {
    const query = `
      SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department,
             role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employee e
      LEFT JOIN role ON e.role_id = role.id
      LEFT JOIN department ON role.department = department.id
      LEFT JOIN employee m ON e.manager_id = m.id
      ORDER BY e.id;
    `;
    const res = await client.query(query);
    return res.rows;
  }

  async addDepartment(name: string) {
    await client.query('INSERT INTO department (name) VALUES ($1)', [name]);
  }

  async addRole(title: string, salary: number, department: number) {
    await client.query(
      'INSERT INTO role (title, salary, department) VALUES ($1, $2, $3)',
      [title, salary, department]
    );
  }

  async addEmployee(first_name: string, last_name: string, role_id: number, manager_id: number | null) {
    await client.query(
      'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
      [first_name, last_name, role_id, manager_id]
    );
  }

  async updateEmployeeRole(employee_id: number, role_id: number) {
    await client.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
  }

  async updateEmployeeManager(employee_id: number, manager_id: number | null) {
    await client.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [manager_id, employee_id]);
  }

  async deleteDepartment(department: number) {
    await client.query('DELETE FROM department WHERE id = $1', [department]);
  }

  async deleteRole(role_id: number) {
    await client.query('DELETE FROM role WHERE id = $1', [role_id]);
  }

  async deleteEmployee(employee_id: number) {
    await client.query('DELETE FROM employee WHERE id = $1', [employee_id]);
  }

  async viewDepartmentBudget(department: number) {
    const query = `
      SELECT department.name AS department, SUM(role.salary) AS utilized_budget
      FROM employee
      JOIN role ON employee.role_id = role.id
      JOIN department ON role.department = department.id
      WHERE department.id = $1
      GROUP BY department.name;
    `;
    const res = await client.query(query, [department]);
    return res.rows;
  }

  async viewEmployeesByManager(manager_id: number) {
    const res = await client.query(
      'SELECT id, first_name, last_name FROM employee WHERE manager_id = $1',
      [manager_id]
    );
    return res.rows;
  }

  async viewEmployeesByDepartment(department: number) {
    const query = `
      SELECT e.id, e.first_name, e.last_name, role.title
      FROM employee e
      JOIN role ON e.role_id = role.id
      WHERE role.department = $1;
    `;
    const res = await client.query(query, [department]);
    return res.rows;
  }
}

export default new employeeDB();