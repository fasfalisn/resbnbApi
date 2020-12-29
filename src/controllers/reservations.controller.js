const ReservationModel = require("../models/reservations.model");
const HttpException = require("../utils/HttpException.utils");
const dotenv = require("dotenv");
dotenv.config();

class UserController {
  getAllReservations = async (req, res, next) => {
    let reservationList = await ReservationModel.find();
    if (!reservationList.length) {
      throw new HttpException(404, "Users not found");
    }

    // userList = userList.map(user => {
    //     const { password, ...userWithoutPassword } = user;
    //     return userWithoutPassword;
    // });

    res.send(reservationList);
  };

  getReservationById = async (req, res, next) => {
    const reservation = await ReservationModel.findOne({
      resid: req.params.id,
    });
    if (!reservation) {
      throw new HttpException(404, "User not found");
    }

    // const { password, ...userWithoutPassword } = user;

    res.send(reservation);
  };

  getReservationsByUserId = async (req, res, next) => {
    let reservationList = await ReservationModel.find({
      userid: res.params.userid,
    });
    if (!reservationList.length) {
      throw new HttpException(404, "Users not found");
    }

    // userList = userList.map(user => {
    //     const { password, ...userWithoutPassword } = user;
    //     return userWithoutPassword;
    // });

    res.send(reservationList);
  };

  createReservation = async (req, res, next) => {
    const result = await ReservationModel.create(req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    res.status(201).send("Reservation was created!");
  };

  updateUser = async (req, res, next) => {
    // const { ...restOfUpdates } = req.body;

    // do the update query and get the result
    // it can be partial edit
    const result = await ReservationModel.update(req.body, req.params.id);

    if (!result) {
      throw new HttpException(404, "Something went wrong");
    }

    const { affectedRows, changedRows, info } = result;

    const message = !affectedRows
      ? "Reservation not found"
      : affectedRows && changedRows
      ? "Reservation updated successfully"
      : "Updated failed";

    res.send({ message, info });
  };

}

module.exports = new UserController();
