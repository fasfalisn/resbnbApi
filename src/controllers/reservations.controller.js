const ReservationModel = require('../models/reservations.model');
const HttpException = require('../utils/HttpException.utils');
const dotenv = require('dotenv');
dotenv.config()

class UserController {
  getAllReservations = async (req, res, next) => {
      let reservationList = await ReservationModel.find();
      if (!reservationList.length) {
          throw new HttpException(404, 'Users not found');
      }

      // userList = userList.map(user => {
      //     const { password, ...userWithoutPassword } = user;
      //     return userWithoutPassword;
      // });

      res.send(reservationList);
  };

  getReservationById = async (req, res, next) => {
      const reservation = await ReservationModel.findOne({ resid: req.params.id });
      if (!reservation) {
          throw new HttpException(404, 'User not found');
      }

      // const { password, ...userWithoutPassword } = user;

      res.send(reservation);
  };
}

module.exports = new UserController;
