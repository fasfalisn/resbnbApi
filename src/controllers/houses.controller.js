const HouseModel = require('../models/houses.model');
const HttpException = require('../utils/HttpException.utils');
const dotenv = require('dotenv');
dotenv.config()

class UserController {
  getAllHouses = async (req, res, next) => {
      let HouseList = await HouseModel.find();
      if (!HouseList.length) {
          throw new HttpException(404, 'Users not found');
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
          throw new HttpException(404, 'House not found');
      }

      // const { password, ...userWithoutPassword } = user;

      res.send(house);
  };

  getHousesByCity = async (req, res, next) => {
    let HouseList = await HouseModel.find({city:req.params.city});
    if (!HouseList.length) {
        throw new HttpException(404, 'Houses not found');
    }

    // userList = userList.map(user => {
    //     const { password, ...userWithoutPassword } = user;
    //     return userWithoutPassword;
    // });

    res.send(HouseList);
    };

    getHousesByHostId = async (req, res, next) => {
        let HouseList = await HouseModel.find({hostid:req.params.id});
        if (!HouseList.length) {
            throw new HttpException(404, 'Houses not found');
        }
    
        // userList = userList.map(user => {
        //     const { password, ...userWithoutPassword } = user;
        //     return userWithoutPassword;
        // });
    
        res.send(HouseList);
        };
}

module.exports = new UserController;