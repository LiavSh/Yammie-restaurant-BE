const express = require("express");
const bodyParser = require("body-parser");
const dayjs = require("dayjs");
const { validateOrder } = require("./utils/utils");
const Order = require("./mongoDB/index");
const port = 3000;
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.route("/orders")
// API request - get all order of today
  .get(function (req, res) {
    const startOfDayDate = dayjs().startOf("day").toDate(); // set to 12:00 am today
    const endOfDayDate = dayjs().endOf("day").toDate(); // set to 23:59 pm today

    Order.find(
      { date: { $gte: startOfDayDate, $lt: endOfDayDate } },
      function (err, ordersFound) {
        if (!err) {
          res.send(ordersFound);
        } else {
          res.status(400);
          console.error(err);
        }
      }
    );
  })
  // API post -  Post a new order
  .post(function (req, res) {
    const { price, status, items } = req.body;
    const newOrder = new Order({
      date: new Date(),
      items,
      status,
      price,
    });

    const validationCheck = validateOrder(newOrder);
    if (validationCheck) {
      console.error(validationCheck);
      res.status(400); // stuck
    } else {
      newOrder.save(function (err) {
        if (!err) {
          res.send("Order successfully placed");
        } else {
          console.error(err);
          res.send(err);
        }
      });
    }
  });

app.listen(port, function () {
  console.log("Server started on port " + port);
});
