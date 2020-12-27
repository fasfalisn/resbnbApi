const UserMessageModel = require("../models/usermessages.model");
const HttpException = require("../utils/HttpException.utils");
const dotenv = require("dotenv");
dotenv.config();

class UserMessagesController {
  getAllUserMessages = async (req, res, next) => {
    let userMessagesList = await UserMessageModel.find();
    if (!userMessagesList.length) {
      throw new HttpException(404, "Users not found");
    }

    // userList = userList.map(user => {
    //     const { password, ...userWithoutPassword } = user;
    //     return userWithoutPassword;
    // });

    res.send(userMessagesList);
  };

  getUserMessageById = async (req, res, next) => {
    const userMessage = await UserMessageModel.findOne({
      contactid: req.params.id,
    });
    if (!userMessage) {
      throw new HttpException(404, "User not found");
    }

    // const { password, ...userWithoutPassword } = user;

    res.send(userMessage);
  };

  getOnesUserMessages = async (req, res, next) => {
    let userMessagesList = await UserMessageModel.findOnesMessages({
      from_userid: req.params.id,
      to_userid: req.params.id,
    });
    if (!userMessagesList.length) {
      throw new HttpException(404, "Users not found");
    }

    // userList = userList.map(user => {
    //     const { password, ...userWithoutPassword } = user;
    //     return userWithoutPassword;
    // });

    res.send(userMessagesList);
  };

  getOnesUserMessagesWithOne = async (req, res, next) => {
    let userMessagesList = await UserMessageModel.findOnesMessagesWithOne({
      from_userid: req.params.sender,
      to_userid: req.params.receiver,
    });

    let userMessagesList2 = await UserMessageModel.findOnesMessagesWithOne({
        from_userid: req.params.receiver,
        to_userid: req.params.sender,
      });

    if (!(userMessagesList.concat(userMessagesList2)).length) {
      throw new HttpException(404, "Users not found");
    }

    // userList = userList.map(user => {
    //     const { password, ...userWithoutPassword } = user;
    //     return userWithoutPassword;
    // });

    res.send(userMessagesList.concat(userMessagesList2));
  };
}

module.exports = new UserMessagesController();
