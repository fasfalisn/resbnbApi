const UserRatesHouseModel = require("../models/userrateshouse.model");
const HttpException = require("../utils/HttpException.utils");
const dotenv = require("dotenv");
dotenv.config();

class UserController {
  getAllRatings = async (req, res, next) => {
    let RatingList = await UserRatesHouseModel.find();
    if (!RatingList.length) {
      throw new HttpException(404, "Users not found");
    }

    // userList = userList.map(user => {
    //     const { password, ...userWithoutPassword } = user;
    //     return userWithoutPassword;
    // });

    res.send(RatingList);
  };

  getRatingByHouseId = async (req, res, next) => {
    let RatingList = await UserRatesHouseModel.find({ houseid: req.params.id });
    if (!RatingList.length) {
      throw new HttpException(404, "Users not found");
    }

    // userList = userList.map(user => {
    //     const { password, ...userWithoutPassword } = user;
    //     return userWithoutPassword;
    // });

    res.send(RatingList);
  };

  getRatingByUserId = async (req, res, next) => {
    let RatingList = await UserRatesHouseModel.find({ userid: req.params.id });
    if (!RatingList.length) {
      throw new HttpException(404, "Users not found");
    }

    // userList = userList.map(user => {
    //     const { password, ...userWithoutPassword } = user;
    //     return userWithoutPassword;
    // });

    res.send(RatingList);
  };

  createRating = async (req, res, next) => {
    const result = await RatingsModel.create({userid: req.params.id, houseid: req.params.houseid},req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Rating was created!");
  };
}

module.exports = new UserController();
