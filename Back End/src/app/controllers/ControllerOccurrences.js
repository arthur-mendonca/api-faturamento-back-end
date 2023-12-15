const Occurrence = require("../models/Ocurrence");
const User = require("../models/User");

module.exports = {
  async store(req, res) {
    try {
      const { id } = req.params;
      const { name, origin, date, status, description } = req.body;

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const occurrence = await Occurrence.create({
        name,
        origin,
        description,
        user_id: id,
      });
      return res.status(201).json({ message: "Ocorrência criada", occurrence });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async index(req, res) {
    try {
      const occurrences = await Occurrence.findAll();
      return res.status(200).json(occurrences);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, origin, description, status } = req.body;
      const occurrence = await Occurrence.findByPk(id);
      if (!occurrence) {
        return res.status(404).json({ error: "Occurrence not found" });
      }
      await occurrence.update({ name, origin, description, status });
      return res.status(200).json(occurrence);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const occurrence = await Occurrence.findByPk(id);
      if (!occurrence) {
        return res.status(404).json({ error: "Occurrence not found" });
      }
      await occurrence.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async findOne(req, res) {
    try {
      const { id } = req.params;
      const occurrence = await Occurrence.findByPk(id);
      if (!occurrence) {
        return res.status(404).json({ error: "Occurrence not found" });
      }
      return res.status(200).json(occurrence);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};
