const HouseHasOffersModel = require('../models/househasoffers.model');
const HttpException = require('../utils/HttpException.utils');
const dotenv = require('dotenv');
dotenv.config()

class HouseHasOffersController {
  getAllHouses = async (req, res, next) => {
      let HouseList = await HouseHasOffersModel.find();
      if (!HouseList.length) {
          throw new HttpException(404, 'Users not found');
      }

      // userList = userList.map(user => {
      //     const { password, ...userWithoutPassword } = user;
      //     return userWithoutPassword;
      // });

      res.send(HouseList);
  };

  
}

module.exports = new HouseHasOffersController;
