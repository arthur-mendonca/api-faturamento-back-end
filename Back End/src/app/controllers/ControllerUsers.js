const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
require("dotenv").config();

const secret = process.env.SECRET;

function generateToken(params = {}) {
  return jwt.sign(params, secret, {
    expiresIn: 86400,
  });
}

module.exports = {
  async store(req, res) {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
      }

      const user = await User.create({ name, email, password });
      user.password = undefined;
      return res.status(201).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async index(req, res) {
    try {
      const users = await User.findAll();
      users.forEach((user) => {
        user.password = undefined;
      });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async findOne(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      user.password = undefined;
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async update(req, res) {
    const userId = res.locals.userId;
    try {
      const { id } = req.params;
      if (+id !== userId) {
        return res
          .status(401)
          .json({ error: "No permission to update this user" });
      }
      const { name, email, password } = req.body;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      await user.update({ name, email, password });
      user.password = undefined;
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async delete(req, res) {
    const userId = res.locals.userId;
    try {
      const { id } = req.params;

      if (+id !== userId) {
        return res
          .status(401)
          .json({ error: "No permission to delete this user" });
      }

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      await user.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user)
        return res
          .status(400)
          .send({ message: "E-mail or password incorrect.", status: 0 });

      if (!bcrypt.compareSync(password, user.password)) {
        return res
          .status(400)
          .send({ message: "E-mail or password incorrect.", status: 0 });
      }
      const userId = user.id;

      await User.update({ logged: true }, { where: { id: userId } });
      const updatedUser = await User.findByPk(userId);

      updatedUser.password = undefined;
      const token = generateToken({ id: userId });

      return res.status(200).send({
        status: 1,
        message: "Login successfully",
        user: updatedUser,
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: "Internal server error" });
    }
  },
};
