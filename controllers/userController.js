const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModels");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = await req.body;
    if (!name || !email || !password) {
      res.status(400);
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: "User already exists" });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid data" });
    }
  } catch (error) {
    console.error(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = await req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "invalid credentials" });
    }

    res.send({ message: "user logged in" });
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });
};

const searchUser = async (req, res) => {
  try {
    const search = await User.find({ $text: { $search: req.body.name } }).then(
      (results) => {
        let sendToClient = [];
        results.forEach((result) => {
          sendToClient.push({ _id: result._id, name: result.name });
        });
        if (results.length > 0) {
          res.status(200).json({
            users: sendToClient,
          });
        } else {
          res.status(400).json({
            message: "Couldn't find user",
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const inviteUser = async (req, res) => {
  await req.body.users.forEach((item) => {
    User.findById(item.id)
      .then(async (result) => {
        //check if user already invited
        if (
          !result.notifications.includes(
            result.notifications.find(
              (notification) => notification.invitedTo === item.board
            )
          )
        ) {
          console.log(item);
          let sentBy = await User.findById(item.invitedBy);
          User.updateOne(
            { _id: result._id },
            {
              $push: {
                notifications: {
                  invitedTo: item.board,
                  status: item.status,
                  boardName: item.boardName,
                  invitedBy: sentBy.name,
                },
              },
            }
          ).catch((error) => {
            console.log(error);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  res.status(200).json({
    message: "Invites Recieved",
  });
};

const getNotifications = async (req, res) => {
  const userNotifications = await User.findById(req.params.id);
  if (userNotifications.notifications !== undefined) {
    res.status(200).json({
      invites: userNotifications.notifications.filter((el)=>{
        return el.status === 'invited';
      }),
    });
  }
};

//generate jwt

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  searchUser,
  inviteUser,
  getNotifications,
};
