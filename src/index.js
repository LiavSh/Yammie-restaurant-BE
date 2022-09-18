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
  // request API - get all order of the last day
  .get(function (req, res) {
    const startOfDayDate = dayjs().startOf("day").toDate(); // set to 12:00 am today
    const endOfDayDate = dayjs().endOf("day").toDate(); // set to 23:59 pm today

    Order.find(
      { date: { $gte: startOfDayDate, $lt: endOfDayDate } },
      function (err, dbOrders) {
        if (!err) {
          const orders = dbOrders.map(({ items, status, price, _id }) => ({
            items,
            status,
            price,
            id: _id,
          }));
          res.send(orders);
        } else {
          res.status(400);
          console.error("Reading orders from DB error", err);
        }
      }
    );
  })
  // post API -  Post a new order
  .post(function (req, res) {
    const { price, status, items } = req.body;
    const newOrder = new Order({
      date: new Date(),
      items,
      status,
      price,
    });

    const error = validateOrder(newOrder);
    if (error) {
      console.error(error);
      res.status("Db parameters error", 400);
    } else {
      newOrder.save(function (err) {
        if (!err) {
          res.send("Order successfully placed");
        } else {
          console.error("Posting orders to DB error", err);
          res.status(400);
        }
      });
    }
  });

app.listen(port, function () {
  console.log("Server started on port " + port);
});
