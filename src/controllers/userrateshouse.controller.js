const UserRatesHouseModel = require('../models/userrateshouse.model');
const HttpException = require('../utils/HttpException.utils');
const dotenv = require('dotenv');
dotenv.config()

class UserController {
  getAllRatings = async (req, res, next) => {
      let RatingList = await UserRatesHouseModel.find();
      if (!RatingList.length) {
          throw new HttpException(404, 'Users not found');
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
        throw new HttpException(404, 'Users not found');
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
        throw new HttpException(404, 'Users not found');
    }

    // userList = userList.map(user => {
    //     const { password, ...userWithoutPassword } = user;
    //     return userWithoutPassword;
    // });

    res.send(RatingList);
  };

  
}

module.exports = new UserController;
