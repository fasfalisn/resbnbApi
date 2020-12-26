const ItemModel = require('../models/items.model');
const HttpException = require('../utils/HttpException.utils');
const dotenv = require('dotenv');
dotenv.config()

class UserController {
  getAllItems = async (req, res, next) => {
      let itemsList = await ItemModel.find();
      if (!itemsList.length) {
          throw new HttpException(404, 'Users not found');
      }

      // userList = userList.map(user => {
      //     const { password, ...userWithoutPassword } = user;
      //     return userWithoutPassword;
      // });

      res.send(itemsList);
  };

  getItemsByHouseId = async (req, res, next) => {
    let itemsList = await ItemModel.find({houseid:req.params.id});
    if (!itemsList.length) {
        throw new HttpException(404, 'Items not found');
    }

    // userList = userList.map(user => {
    //     const { password, ...userWithoutPassword } = user;
    //     return userWithoutPassword;
    // });

    res.send(itemsList);
};
}

module.exports = new UserController;
