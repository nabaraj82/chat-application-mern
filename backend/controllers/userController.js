import User from "../models/userModel.js";

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res.json({
        msg: "user does not exist",
        status: false,
      });
    }
    if (!user.comparePasswordInDb(password, user.password)) {
      return res.json({
        msg: "Incorrect Username or Password",
        status: false,
      });
    }
    const passwordRemoved = user.toObject();
    delete passwordRemoved.password;
    return res.json({ status: true, passwordRemoved });
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({
        msg: "Username alreay used",
        status: false,
      });
    }
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res.json({
        msg: "Email already used",
        status: false,
      });
    }
    const user = await User.create({
      email,
      username,
      password,
    });
    const userResponse = user.toObject();
    delete userResponse.password;

    return res.json({
      status: true,
      user: userResponse,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    next(error);
  }
};

export const setAvatar = async (req, res, next) => {
  try {
    const { id, image } = req.body;
    const userData = await User.findByIdAndUpdate(
      id,
      {
        isAvatarImageSet: true,
        avatarImage: image,
      },
      { new: true }
      );
      return res.json({
        isSet: userData.isAvatarImageSet,
        image: userData.avatarImage,
      });
  } catch (error) {
      next(error)
  }
};


export const logout = async (req, res, next) => {
    try {
        if (!req.params.id) return res.json({
            msg: "user id is required"
        });
        onlineUsers.delete(req.params.id);
        return res.status(200).send();
    } catch (error) {
        next(error)
    }
}