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
    readProducts();
    setTimeout(purchase, 0100);
});

function readProducts() {
    connection.query('SELECT * FROM products', function(err, res) {
        console.log("ID" + ", " + "Price" + ", " + "Product" + ", " + "Quantity Left");
        for (var i in res) {
            console.log(res[i].item_id + ", " + "$" + res[i].price + ".00, " + res[i].product_name + ", " + res[i].quantity);
        }
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
        },
        {
            type: "confirm",
            message: "Are you sure:",
            name: "confirm",
            default: true
        }
    ]).then(function(inquirerResponse) {
        connection.query('SELECT quantity FROM products WHERE item_id = ?', [inquirerResponse.purchase], function(err, res) {
            var currentQuant = res[0].quantity;
            var custQuant = parseInt(inquirerResponse.quantity);
            var newQuant = currentQuant - custQuant;
            var data = [{
                quantity: newQuant
            },
            {
                item_id: inquirerResponse.purchase
            }];
            if (custQuant < currentQuant) {
                console.log("Purchased");
                connection.query('UPDATE products SET ? WHERE ?', data, function(err, res) {
                    console.log(res);
                });
            } else {
                console.log("Sorry, can't fulfill order");
                purchase();

            }
        });
    });
}

// function purchase() {
//     connection.query('SELECT * FROM products', function(err, res) {
//         inquirer.prompt([{
//                 type: 'input',
//                 message: 'Which item would you like to purchase? (type item ID)',
//                 name: 'purchase'
//             },
//             {
//                 type: 'input',
//                 message: 'How many would you like to buy?',
//                 name: 'quantity'
//             },
//             {
//                 type: "confirm",
//                 message: "Are you sure:",
//                 name: "confirm",
//                 default: true
//             }
//         ]).then(function(inquirerResponse) {
//             var id = parseInt(inquirerResponse.purchase);
//             var purchasedItem = res[(id - 1)];
//             var newQuantity = res[id].quantity - inquirerResponse.quantity;
//             // if (inquirerResponse.quantity < res[id].quantity) {
//             //     
//             //     var data = [{
//             //             quantity: newQuantity
//             //         },
//             //         {
//             //             item_id: inquirerResponse.purchase
//             //         }];
//             //     connection.query('UPDATE products SET ? WHERE ?', data, function(err, res) {
//             //         if (err) throw ('error');
//             //     });
//             //     console.log("Below is a copy of your reciept");
//             //     console.log("Item purchased: " + purchasedItem.product_name);
//             //     console.log("Price: " + purchasedItem.price)
//             //     console.log("Quantity: " + inquirerResponse.quantity);
//             //     console.log("Your Total: " + "$" + (inquirerResponse.quantity * purchasedItem.price) + ".00")
//             //     purchase();
//             // } else {
//             //     console.log('Sorry, not enough in stock');
//             //     purchase();
//             // }
//             console.log(inquirerResponse.quantity);
//             console.log(newQuantity);
//         });
//     });

// }