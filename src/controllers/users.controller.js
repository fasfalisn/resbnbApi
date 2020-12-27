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

  updateUser = async (req, res, next) => {

    const { ...restOfUpdates } = req.body;



    // do the update query and get the result
    // it can be partial edit
    const result = await UserModel.update(restOfUpdates, req.params.id);

    if (!result) {
        throw new HttpException(404, 'Something went wrong');
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows ? 'User not found' :
        affectedRows && changedRows ? 'User updated successfully' : 'Updated failed';

    res.send({ message, info });
};

}

module.exports = new UserController;
