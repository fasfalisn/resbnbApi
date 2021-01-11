const HostModel = require("../models/hosts.model");
const HttpException = require("../utils/HttpException.utils");
const dotenv = require("dotenv");
dotenv.config();

class HostController {

  createHost = async (req, res, next) => {
      const result = await HostModel.create({id: req.body.hostid});

      if (!result) {
        throw new HttpException(500, "Something went wrong");
      }
      
    res.status(201).send("Host was created!");
  }

  deleteHost = async (req, res, next) => {
    const result = await HostModel.delete(req.params.id);
    if (!result) {
      throw new HttpException(404, "Host not found");
    }
    res.send("Host has been deleted");
  };


}
  module.exports = new HostController();