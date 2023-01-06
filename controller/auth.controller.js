const config = require("./../config/auth.config");
const db = require("./../model/index");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = db.users;
const Role = db.roles;
const sequelize = require("sequelize");

exports.signup = async (req, res) => {
  let user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  if (req.body.roles) {
    let roles = await Role.findAll({
      where: {
        name: {
          [sequelize.Op.or]: req.body.roles,
        },
      },
    });
    await user.setRoles(roles);
    res.status(200).json({
      message: "user registered succesfully",
    });
  }
};
exports.signin = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let userName = await User.findone({
    where: {
      username: req.body.username,
    },
  });
  if (!userName) {
    res.status(404).json({
      message: "user not found",
    });
    return;
  }
  let isValidPassword = bcrypt.compareSync(
    req.body.password,
    userName.password
  );
  if (!isValidPassword) {
    res.status(401).json({
      message: "Password is incorrect",
    });
    return;
  }
  var token = jwt.sign({ id: userName.id }, config.secret, {
    expiresIn: 86400,
  });
  let authorities = [];
  let roles = await userName.getRoles();
  for (let i = 0; i < roles.length; i++) {
    authorities.push("Role_" + roles[i].name.toUpperCase());
  }

  res.status(200).send({
    id: userName.id,
    username: userName.userName,
    email: userName.email,
    roles: authorities,
    accessToken: token,
  });
};

//another way of exporting using exports keyword we can also do it in a traditional way like module.exports={signup,signin  };
