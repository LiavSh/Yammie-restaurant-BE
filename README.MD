# Yammie restaurant BE API's

## Before you start

Make sure mongodb is running on your machine.\
for furture information, visit [MongoDb.](https://www.mongodb.com/docs/manual/administration/install-community/)


## Available Scripts

In the project directory, you can run:
```
npm start
```
The server will run on [http://localhost:3000](http://localhost:3000).

## functionality

### Get today's orders

 In order to get today's orders, send a `Get` request via [http://localhost:3000/orders](http://localhost:3000/orders). the output will be\
received in .JSON format.

### Post new order
 In order to post a new order, send a `Post` request via [http://localhost:3000/orders](http://localhost:3000/orders) with the following data fields:
- items: An array containing the content of the order
- status: Enum value represent the order status - PENDING/DELIVERED/CANCELED
- price: The final cost of the order

### Post new order using Curl
``` 
curl --location --request POST 'http://localhost:3000/orders' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'items=Lazania' \
--data-urlencode 'items=Pasta' \
--data-urlencode 'items=Pizza' \
--data-urlencode 'status=PENDING' \
--data-urlencode 'price=129.99'
```
