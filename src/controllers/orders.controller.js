// exports.getPosts = (req, res, next) => {
//   res.status(200).json({
//     posts: [{ title: 'First Post', content: 'This is the first post!' }]
//   });
// };

// exports.createPost = (req, res, next) => {
//   const title = req.body.title;
//   const content = req.body.content;
//   // Create post in db
//   res.status(201).json({
//     message: 'Post created successfully!',
//     post: { id: new Date().toISOString(), title: title, content: content }
//   });
// };

const OrderModel = require('../models/orders.model');
const HttpException = require('../utils/HttpException.utils');
const dotenv = require('dotenv');
dotenv.config()

class UserController {
  getAllOrders = async (req, res, next) => {
      let OrderList = await OrderModel.find();
      if (!OrderList.length) {
          throw new HttpException(404, 'Orders not found');
      }

      // userList = userList.map(user => {
      //     const { password, ...userWithoutPassword } = user;
      //     return userWithoutPassword;
      // });

      res.send(OrderList);
  };

  getOrderById = async (req, res, next) => {
    let OrderList = await OrderModel.find({ resid: req.params.id });
      if (!OrderList.length) {
          throw new HttpException(404, 'Orders not found');
      }

      // userList = userList.map(user => {
      //     const { password, ...userWithoutPassword } = user;
      //     return userWithoutPassword;
      // });

    res.send(OrderList);  
  };

  createOrder = async (req, res, next) => {
    const result = await OrderModel.create(req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Order was created!");
  };

  updateOrder = async (req, res, next) => {
    // const { ...restOfUpdates } = req.body;

    // do the update query and get the result
    // it can be partial edit
    const result = await OrderModel.update(req.body, req.params.resid, req.params.itemid);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows
      ? "Order not found"
      : affectedRows && changedRows
      ? "Order updated successfully"
      : "Updated failed";

    res.send({ message, info });
  };

}

module.exports = new UserController;
