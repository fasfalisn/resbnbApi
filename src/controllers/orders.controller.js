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
}

module.exports = new UserController;
