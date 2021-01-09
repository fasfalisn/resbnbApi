const ReservationModel = require("../models/reservations.model");
const HttpException = require("../utils/HttpException.utils");
const dotenv = require("dotenv");
dotenv.config();

class ReservationController {
  getAllReservations = async (req, res, next) => {
    let reservationList = await ReservationModel.find();
    if (!reservationList.length) {
      throw new HttpException(404, "Users not found");
    }


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
    let reservationList = await ReservationModel.findWithHouse({
      userid: req.params.userid,
    });
    if (!reservationList.length) {
      throw new HttpException(404, "Users not found");
    }

    res.send(reservationList);
  };

  createReservation = async (req, res, next) => {
    const result = await ReservationModel.create(req.body);

    if (!result) {
      throw new HttpException(500, "Something went wrong");
    }

    const reservation = await ReservationModel.findOneByUser({houseid: req.body.houseid, userid: req.body.userid})
    const resid = reservation.resid;

    const message = "Reservation was created!";
    res.status(201).send({message,resid});
  };

  updateReservation = async (req, res, next) => {
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

module.exports = new ReservationController();
