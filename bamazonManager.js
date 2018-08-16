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
    userCommand();
});

function userCommand() {
    inquirer.prompt([{
            type: 'list',
            message: 'Choose Command:',
            choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product'],
            name: 'commandList'
        }
    ]).then(function(inquirerResponse) {
        var command = inquirerResponse.commandList;
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
}

function readProducts() {
    connection.query('SELECT * FROM products', function(err, res) {
        console.log("ID" + ", " + "Price" + ", " + "Product" + ", " + "Quantity");
        for (var i in res) {
            console.log(res[i].item_id + ", $" + res[i].price + ".00, " + res[i].product_name + ", " + res[i].quantity);
        }
    });
    setTimeout(userCommand, 0100);
}

function lowInventory() {
    connection.query('SELECT * FROM products WHERE quantity < ?', [5], function(err, res) {
        var lowInv = res[0]
        console.log(lowInv.item_id + ", $" + lowInv.price + ".00, " + lowInv.product_name + ", " + lowInv.quantity);
    });
    setTimeout(userCommand, 0100);
}

function addInventory() {
    inquirer.prompt([{
            type: 'input',
            message: 'Choose Item: ',
            name: 'chosenAddItem'
        },
        {
            type: 'input',
            message: 'How many would you like to add?',
            name: 'quantityAdded'
        }
    ]).then(function(inquirerResponse) {
        connection.query('UPDATE products SET quantity = quantity + ? WHERE item_id = ?', [inquirerResponse.quantityAdded, inquirerResponse.chosenAddItem], function(err, res) {
            console.log('*******************');
            console.log('Item Succesfully Updated');
            console.log('*******************');
        });
        setTimeout(userCommand, 0300);
    });
}

function addProduct() {
    inquirer.prompt([{
            type: 'input',
            message: 'Product Name: ',
            name: 'productname'
        },
        {
            type: 'input',
            message: 'Department: ',
            name: 'department'
        },
        {
            type: 'input',
            message: 'Price: ',
            name: 'price'
        },
        {
            type: 'input',
            message: 'Quantity: ',
            name: 'quantity'
        }
    ]).then(function(inquirerResponse) {
        var data = {
            product_name: inquirerResponse.productname,
            department_name: inquirerResponse.department,
            price: parseInt(inquirerResponse.price),
            quantity: parseInt(inquirerResponse.quantity)
        }
        connection.query('INSERT INTO products SET ?', data, function(err, res) {
            if (err) throw err;
            console.log('Item Succesfully Added');
        });
        setTimeout(userCommand, 0100);
    });
}












