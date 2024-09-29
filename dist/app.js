import inquirer from 'inquirer';
import { pool, connectToDb } from './db.js';
await connectToDb();
async function startApp() {
    const questions = [
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'View employees by manager',
                'View employees by department',
                'View total budget by department',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ];
    const response = await inquirer.prompt(questions);
    switch (response.action) {
        case 'View all departments':
            await viewDepartments();
            break;
        case 'View all roles':
            await viewRoles();
            break;
        case 'View all employees':
            await viewEmployees();
            break;
        case 'Add a department':
            await addDepartment();
            break;
        case 'Add a role':
            await addRole();
            break;
        case 'Add an employee':
            await addEmployee();
            break;
        case 'Update an employee role':
            await updateEmployeeRole();
            break;
        case 'View employees by manager':
            await viewEmployeesByManager();
            break;
        case 'View employees by department':
            await viewEmployeesByDepartment();
            break;
        case 'View total budget by department':
            await TotalBudgetByDepartment();
            break;
        case 'Exit':
            process.exit(0);
    }
    startApp(); // Restart the application
}
async function viewDepartments() {
    try {
        const res = await pool.query('SELECT * FROM department');
        console.table(res.rows);
    }
    catch (error) {
        console.error('Error fetching departments:', error);
    }
}
async function viewRoles() {
    try {
        const res = await pool.query('SELECT * FROM role');
        console.table(res.rows);
    }
    catch (error) {
        console.error('Error fetching roles:', error);
    }
}
async function viewEmployees() {
    try {
        const res = await pool.query('SELECT * FROM employee');
        console.table(res.rows);
    }
    catch (error) {
        console.error('Error fetching employees:', error);
    }
}
async function viewEmployeesByManager() {
    try {
        const res = await pool.query('SELECT e.first_name, e.last_name, r.title as his/her manager FROM employee e left join role r on r.id = e.manager_id ORDER BY r.title');
        console.table(res.rows);
    }
    catch (error) {
        console.error('Error fetching employees:', error);
    }
}
async function viewEmployeesByDepartment() {
    try {
        const res = await pool.query('SELECT e.first_name, e.last_name, d.name as Deparment FROM employee e left join role r on r.id = e.role_id left join department d on d.id = r.department_id ORDER BY d.name');
        console.table(res.rows);
    }
    catch (error) {
        console.error('Error fetching employees:', error);
    }
}
async function addDepartment() {
    try {
        const { name } = await inquirer.prompt({
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:',
        });
        await pool.query('INSERT INTO department (name) VALUES ($1)', [name]);
        console.log(`Department ${name} added.`);
    }
    catch (error) {
        console.error('Error adding department:', error);
    }
}
async function addRole() {
    try {
        const { title, salary, departmentId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the name of the role:',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary for the role:',
            },
            {
                type: 'input',
                name: 'departmentId',
                message: 'Enter the department ID for this role:',
            },
        ]);
        await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
        console.log(`Role ${title} added.`);
    }
    catch (error) {
        console.error('Error adding role:', error);
    }
}
async function addEmployee() {
    try {
        const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the employee\'s first name:',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the employee\'s last name:',
            },
            {
                type: 'input',
                name: 'roleId',
                message: 'Enter the role ID for this employee:',
            },
            {
                type: 'input',
                name: 'managerId',
                message: 'Enter the manager ID for this employee (leave blank if none):',
            },
        ]);
        // Handle empty managerId
        const managerIdValue = managerId ? managerId : null;
        await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerIdValue]);
        console.log(`Employee ${firstName} ${lastName} added.`);
    }
    catch (error) {
        console.error('Error adding employee:', error);
    }
}
async function updateEmployeeRole() {
    try {
        // Fetch all employees to display for selection
        const employeeRes = await pool.query('SELECT id, first_name, last_name FROM employee');
        const employees = employeeRes.rows;
        // Prompt user to select an employee
        const { employeeId } = await inquirer.prompt({
            type: 'list',
            name: 'employeeId',
            message: 'Select an employee to update their role:',
            choices: employees.map(emp => ({
                name: `${emp.first_name} ${emp.last_name}`,
                value: emp.id,
            })),
        });
        // Fetch all roles to display for selection
        const roleRes = await pool.query('SELECT id, title FROM role');
        const roles = roleRes.rows;
        // Prompt user to select a new role
        const { roleId } = await inquirer.prompt({
            type: 'list',
            name: 'roleId',
            message: 'Select the new role for this employee:',
            choices: roles.map(role => ({
                name: role.title,
                value: role.id,
            })),
        });
        // Update the employee's role in the database
        await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
        console.log(`Employee's role updated successfully.`);
    }
    catch (error) {
        console.error('Error updating employee role:', error);
    }
}
async function TotalBudgetByDepartment() {
    try {
        const res = await pool.query('SELECT d.name as Department, sum(r.salary) as Total_Budget FROM department d, role r where d.id = r.department_id group by d.name');
        console.table(res.rows);
    }
    catch (error) {
        console.error('Error fetching employees:', error);
    }
}
startApp();
export default startApp;
