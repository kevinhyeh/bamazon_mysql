var mysql = require('mysql');
var inquirer = require('inquirer');
var cTable = require('console.table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});

connection.connect(function(err) {
    supervisorCommand();
});

function supervisorCommand() {
    inquirer.prompt({
        type: 'list',
        message: 'Choose Command',
        choices: ['View Product Sales by Department', 'Create New Department'],
        name: 'commandLine'
    }).then(function(inquirerResponse) {
        if (inquirerResponse.commandLine == 'View Product Sales by Department') {
            viewDepartments();
        } else {
            createDepartment();
        }
    })
}

function viewDepartments() {
    connection.query('SELECT departments.department_id, departments.department_name, SUM(departments.over_head_costs) AS over_head_costs, SUM(products.product_sales) AS product_sales, SUM(product_sales - departments.over_head_costs) AS total_profits FROM departments LEFT JOIN products ON departments.department_name = products.department_name GROUP BY departments.department_id', function(err, res) {
        console.table(res);
        setTimeout(supervisorCommand, 0300);
    })
}

function createDepartment() {
    inquirer.prompt([{
            type: 'input',
            message: 'Name of Department',
            name: 'departmentname'
        },
        {
            type: 'input',
            message: 'Department ID',
            name: 'departmentid'
        },
        {
            type: 'input',
            message: 'Over Head Cost',
            name: 'overheadcost'
        }
    ]).then(function(inquirerResponse) {
        var newDepart = 
        {
            department_id: inquirerResponse.departmentid,
            department_name: inquirerResponse.departmentname,
            over_head_costs: inquirerResponse.overheadcost
        }
        connection.query('INSERT INTO departments SET ?', newDepart, function(err, res) {
            console.table(res);
        });

    });
}