# Bamazon Application README

## Install

```
npm install mysql
npm install inquirer
npm install console.table
```

## Use in Node

### Customer

You can input the id of the product you wish to purchase. 

You can also choose how many you would like to purchase.

Once you hit enter, it will send a receipt of your purchase as well as an updated table of the items for sale.

### Manager

You can select the different types of command lines
    - View Products for Sale
    - View Low Inventory
    - Add to Inventory
    - Add New Product

*View Products for Sale* will display a table of all the items.

*View Low Inventory* will display a table of all the items that have a quantity of less the 5.

*Add to Inventory* will display a prompt where you can choose which item to update as well as how much.

*Add new Product* will display a prompt where you can input a new product.

### Supervisor 

You can select the different types of command lines
    - View Product Sales by Department
    - Create New Department

*View Product Sales by Department* will display a table of each department with its department id, deparment name, over head cost, product sales, and total profit

*Create New Department* will display a prompt where you can input a new department.

### Screenshot Walkthrough

1_Customer initial screen
2_Customer purchased item
3_Customer bought more than available quantity
4_Customer purchased another item
5_Customer purchased another item
6_Customer purchased another item
7_Manager initial screen
8_Manager views products
9_Manager view low inventory
10_Manager adds to low inventory
11_Manager view updated inventory
12_Manager adds new product
13_Supervisor initial screen
14_Supervisor views departments
15_ Supervisor adds new department
16_Supervisor views updated departments
17_Manager initial screen
18_Manager adds new product in new department
19_Supervisor views updated departments












