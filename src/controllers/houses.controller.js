const HouseModel = require("../models/houses.model");
const HttpException = require("../utils/HttpException.utils");
const dotenv = require("dotenv");
dotenv.config();

class UserController {
  getAllHouses = async (req, res, next) => {
    let HouseList = await HouseModel.find();
    if (!HouseList.length) {
      throw new HttpException(404, "Users not found");
    }

    // userList = userList.map(user => {
    //     const { password, ...userWithoutPassword } = user;
    //     return userWithoutPassword;
    // });

    res.send(HouseList);
  };

  getHouseById = async (req, res, next) => {
    const house = await HouseModel.findOne({ houseid: req.params.id });
    if (!house) {
      throw new HttpException(404, "House not found");
    }

    // const { password, ...userWithoutPassword } = user;

    res.send(house);
  };

  getHousesByCity = async (req, res, next) => {
    let HouseList = await HouseModel.find({ city: req.params.city });
    if (!HouseList.length) {
      throw new HttpException(404, "Houses not found");
    }

    // userList = userList.map(user => {
    //     const { password, ...userWithoutPassword } = user;
    //     return userWithoutPassword;
    // });

    res.send(HouseList);
  };

  getHousesByHostId = async (req, res, next) => {
    let HouseList = await HouseModel.find({ hostid: req.params.id });
    if (!HouseList.length) {
      throw new HttpException(404, "Houses not found");
    }

    // userList = userList.map(user => {
    //     const { password, ...userWithoutPassword } = user;
    //     return userWithoutPassword;
    // });

    res.send(HouseList);
  };

  updateHouse = async (req, res, next) => {
    // const { ...restOfUpdates } = req.body;

    // do the update query and get the result
    // it can be partial edit
    const result = await HouseModel.update(req,body, req.params.id);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows
      ? "House not found"
      : affectedRows && changedRows
      ? "House updated successfully"
      : "Updated failed";

    res.send({ message, info });
  };

  createHouse = async (req, res, next) => {
    const result = await HouseModel.create(req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("House was created!");
  };

  deleteHouse = async (req, res, next) => {
    const result = await HouseModel.delete(req.params.id);
    if (!result) {
      throw new HttpException(404, "House not found");
    }
    res.send("House has been deleted");
  };

}

module.exports = new UserController();
