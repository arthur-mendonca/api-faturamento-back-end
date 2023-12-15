const Occurrence = require("../models/Ocurrence");
const Evidence = require("../models/Evidence");

module.exports = {
  async store(req, res) {
    try {
      const { id } = req.params;
      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: "No file provided" });
      }

      const occurrence = await Occurrence.findByPk(id);

      if (!occurrence) {
        return res.status(400).json({ error: "Occurrence not found" });
      }

      const evidence = await Evidence.create({
        filename: file.filename,
        occurrence_id: id,
        fileUrl: `${req.protocol}://${req.get("host")}/uploads/${
          file.filename
        }`,
      });

      return res.status(201).json(evidence);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  allEvidencesFromOccurrence: async (req, res) => {
    try {
      const { id } = req.params;
      const occurrence = await Occurrence.findByPk(id);

      if (!occurrence) {
        return res.status(404).json({ error: "Occurrence not found" });
      }

      const evidences = await Evidence.findAll({
        where: { occurrence_id: id },
      });

      const response = {
        occurrence: occurrence,
        evidences: evidences,
      };

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  findOne: async (req, res) => {
    try {
      const { id } = req.params;
      const evidence = await Evidence.findByPk(id);
      if (!evidence) {
        return res.status(404).json({ error: "Evidence not found" });
      }
      return res.status(200).json(evidence);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getAll: async (req, res) => {
    try {
      const evidences = await Evidence.findAll();

      return res.status(200).json(evidences);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { filename } = req.body;
      const file = req.file;

      const evidence = await Evidence.findByPk(id);
      if (!evidence) {
        return res.status(404).json({ error: "Evidence not found" });
      }

      const newFilename = file ? file.filename : evidence.filename;
      const newFileUrl = file
        ? `http://localhost:3000/uploads/${newFilename}`
        : evidence.fileUrl;

      await evidence.update({ filename: newFilename, fileUrl: newFileUrl });

      return res.status(200).json(evidence);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const evidence = await Evidence.findByPk(id);
      if (!evidence) {
        return res.status(404).json({ error: "Evidence not found" });
      }
      await evidence.destroy();
      return res.status(204).send();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};
