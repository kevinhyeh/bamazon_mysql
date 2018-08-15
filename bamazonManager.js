var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon'
});

connection.connect(function(err) {
    inquirer.prompt([{
            type: 'list',
            message: 'Choose Command:',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
            name: 'commandList'
        },
        {
            type: "confirm",
            message: "Are you sure:",
            name: "confirm",
            default: true
        }
    ]).then(function(inquirerResponse) {
        var command = inquirerResponse.name;
        if (command == 'View Products for Sale') {
            readProducts();
        } else if (command == 'View Low Inventory') {
            lowInventory();
        } else if (command == 'Add to Inventory') {
            addInventory();
        } else if (command == 'Add New Product') {
            addProduct();
        }
    });
});

function readProducts() {
    connection.query('SELECT * FROM products', function(err, res) {
        console.log("ID" + ", " + "Price" + ", " + "Product");
        for (var i in res) {
            console.log(res[i].item_id + ", " + "$" + res[i].price + ".00, " + res[i].product_name);
        }
    });
}

function lowInventory() {
    
}

function addInventory() {

}

function addProduct() {
    
}











