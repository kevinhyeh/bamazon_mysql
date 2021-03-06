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
    readProducts();
    setTimeout(purchase, 0100);
});

function readProducts() {
    connection.query('SELECT * FROM products', function(err, res) {
        console.table(res);
    });
}

function purchase() {
    inquirer.prompt([{
            type: 'input',
            message: 'Which item would you like to purchase? (type item ID)',
            name: 'purchase'
        },
        {
            type: 'input',
            message: 'How many would you like to buy?',
            name: 'quantity'
        }
    ]).then(function(inquirerResponse) {
        connection.query('SELECT * FROM products WHERE item_id = ?', [inquirerResponse.purchase], function(err, res) {
            var currentQuant = res[0].quantity;
            var custQuant = parseInt(inquirerResponse.quantity);
            var newQuant = currentQuant - custQuant;
            var data = [{
                    quantity: newQuant
                },
                {
                    item_id: inquirerResponse.purchase
                }
            ];
            var boughtProduct = res[0].product_name;
            var boughtPrice = res[0].price;
            var boughtQuantity = inquirerResponse.quantity;
            var boughtTotal = boughtPrice * boughtQuantity;
            var productSales = [{
                    product_sales: res[0].product_sales + boughtTotal
                },
                {
                    item_id: inquirerResponse.purchase
                }
            ]
            if (custQuant < currentQuant) {
                console.log("Purchased");
                connection.query('UPDATE products SET ? WHERE ?', data)
                console.log("Below is a copy of your reciept");
                console.log("Item purchased: " + boughtProduct);
                console.log("Price: $" + boughtPrice + ".00")
                console.log("Quantity: " + boughtQuantity);
                console.log("Your Total: $" + boughtTotal + ".00")
                connection.query('UPDATE products SET ? WHERE ?', productSales);
                readProducts();
                setTimeout(purchase, 0500);

            } else {
                console.log("Sorry, can't fulfill order");
                purchase();
            }
        });
    });
}