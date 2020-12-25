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

const UserModel = require('../models/users.model');
const HttpException = require('../utils/HttpException.utils');
const dotenv = require('dotenv');
dotenv.config()

class UserController {
  getAllUsers = async (req, res, next) => {
      let userList = await UserModel.find();
      if (!userList.length) {
          throw new HttpException(404, 'Users not found');
      }

      // userList = userList.map(user => {
      //     const { password, ...userWithoutPassword } = user;
      //     return userWithoutPassword;
      // });

      res.send(userList);
  };

  getUserById = async (req, res, next) => {
      const user = await UserModel.findOne({ userid: req.params.id });
      if (!user) {
          throw new HttpException(404, 'User not found');
      }

      // const { password, ...userWithoutPassword } = user;

      res.send(user);
  };
}

module.exports = new UserController;
