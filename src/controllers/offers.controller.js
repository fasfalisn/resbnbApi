const OfferModel = require('../models/offers.model');
const HttpException = require('../utils/HttpException.utils');
const dotenv = require('dotenv');
dotenv.config()

class UserController {
  getAllOffers = async (req, res, next) => {
      let offerList = await OfferModel.find();
      if (!offerList.length) {
          throw new HttpException(404, 'Offers not found');
      }

      // userList = userList.map(user => {
      //     const { password, ...userWithoutPassword } = user;
      //     return userWithoutPassword;
      // });

      res.send(offerList);
  };

  getOfferById = async (req, res, next) => {
      const offer = await OfferModel.findOne({ offerid: req.params.id });
      if (!offer) {
          throw new HttpException(404, 'User not found');
      }

      // const { password, ...userWithoutPassword } = user;

      res.send(offer);
  };
}

module.exports = new UserController;
