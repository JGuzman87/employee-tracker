const inquirer = require("inquirer");
const { Pool } = require("pg");

const pool = new Pool(
  {
    user: "postgres",
    password: "Pa$$word",
    host: "localhost",
    database: "employees_db",
  },
  console.log("Connected to the employees_db database")
);
pool.connect();

const employees_db = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then((answers) => {
      const { options } = answers;

      switch (options) {
        case "View all departments":
          showDepartments();
          break;
        case "View all roles":
          showRoles();
          break;
        case "View all employees":
          showEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
          case "Update an employee role":
            updateEmployeeRole();
            break;
        default:
          console.log(`Invalid option: ${options}`);
      }
    });
};

const showDepartments = () => {
  pool.query("SELECT id, name FROM department", (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.table(res.rows);
    employees_db();
  });
};

const showRoles = () => {
  pool.query("SELECT id, title, salary, department_id FROM role", (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.table(res.rows);
    console.log("Showing all roles");
    employees_db();
  });
  
};

const showEmployees = () => {
  pool.query("SELECT id, first_name, last_name, role_id, manager_id FROM employee", (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.table(res.rows);
    console.log("Showing all employees");
    employees_db();
  });
};

const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the new department:',
    },
  ]).then((answers) => {
    const { departmentName } = answers;
    pool.query('INSERT INTO department (name) VALUES ($1)',
      [departmentName], (err, res) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`Added department: ${departmentName}`);
        employees_db();
      }
    );
  });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "Enter the name of the new role:",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Enter the salary for new role:",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Enter salary for new role:",
      },
      {
        type: "input",
        name: "roleDepartment",
        message: "Enter department id for new role:",
      },
    ])
    .then((answers) => {
      const { roleName, roleSalary, roleDepartment } = answers;
      pool.query(
        "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)",
        [roleName, roleSalary, roleDepartment],
        (err, res) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(`Added role: ${roleName}`);
          employees_db();
        }
      );
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter the first name of the new employee:",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the last name of the new employee:",
      },
      {
        type: "input",
        name: "roleId",
        message: "Enter the role ID of the new employee:",
      },
      {
        type: "input",
        name: "managerId",
        message: "Enter the manager ID of the new employee:",
      },
    ])
    .then((answers) => {
      const { firstName, lastName, roleId, managerId } = answers;
      pool.query(
        "INSERT INTO employee (first_name, last_name, role_Id, manager_Id) VALUES ($1, $2, $3, $4)",
        [firstName, lastName, roleId, managerId],
        (err, res) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(`Added employee: ${firstName} ${lastName}`);
          employees_db();
        }
      );
    });
};

const updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeId",
        message: "Enter ID of new employee update:",
      },
      {
        type: "input",
        name: "newRoleId",
        message: "Enter the new role ID for the employee:",
      },
    ])
    .then((answers) => {
      const { employeeId, newRoleId } = answers;
      pool.query(
        "UPDATE employee SET role_id = $1 WHERE id = $2",
        [newRoleId, employeeId],
        (err, res) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(`Updated employee ID ${employeeId} with new role ID ${newRoleId}`);
          employees_db();
        }
      );
    });
};

employees_db();
