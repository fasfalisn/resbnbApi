const ItemModel = require("../models/items.model");
const HttpException = require("../utils/HttpException.utils");
const dotenv = require("dotenv");
dotenv.config();

class UserController {
  getAllItems = async (req, res, next) => {
    let itemsList = await ItemModel.find();
    if (!itemsList.length) {
      throw new HttpException(404, "Users not found");
    }

    // userList = userList.map(user => {
    //     const { password, ...userWithoutPassword } = user;
    //     return userWithoutPassword;
    // });

    res.send(itemsList);
  };

  getItemsByHouseId = async (req, res, next) => {
    let itemsList = await ItemModel.find({ houseid: req.params.id });
    if (!itemsList.length) {
      throw new HttpException(404, "Items not found");
    }

    // userList = userList.map(user => {
    //     const { password, ...userWithoutPassword } = user;
    //     return userWithoutPassword;
    // });

    res.send(itemsList);
  };

  createItem = async (req, res, next) => {
    const result = await ItemModel.create(req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Item was created!");
  };

  updateItem = async (req, res, next) => {
    const result = await ItemModel.update(req, body, req.params.id);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows
      ? "Item not found"
      : affectedRows && changedRows
      ? "Item updated successfully"
      : "Updated failed";
    res.send({ message, info });
  };

  deleteItem = async (req, res, next) => {
    const result = await ItemModel.delete(req.params.id);
    if (!result) {
      throw new HttpException(404, "Item not found");
    }
    res.send("Item has been deleted");
  };
}

module.exports = new UserController();
