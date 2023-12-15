const Analysis = require("../models/Analysis");
const Occurrence = require("../models/Ocurrence");

module.exports = {
  async store(req, res) {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const file = req.file;

      const existingAnalysis = await Analysis.findOne({
        where: { occurrence_id: id },
      });

      if (existingAnalysis) {
        return res
          .status(409)
          .json({ error: "Occurrence already has an analysis" });
      }

      if (!file) {
        return res.status(400).json({ error: "No file provided" });
      }

      const occurrence = await Occurrence.findByPk(id);

      if (!occurrence) {
        return res.status(400).json({ error: "Occurrence not found" });
      }

      const analysis = new Analysis({
        filename: file.filename,
        occurrence_id: id,
        description: description,
        fileUrl: `${req.protocol}://${req.get("host")}/uploads/${
          file.filename
        }`,
      });

      await analysis.save();

      return res.status(201).json(analysis);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  async index(req, res) {
    try {
      const analyses = await Analysis.findAll();
      return res.status(200).json(analyses);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  allAnalysisFromOccurrence: async (req, res) => {
    try {
      const { id } = req.params;
      const occurrence = await Occurrence.findByPk(id);
      if (!occurrence) {
        return res.status(404).json({ error: "Occurrence not found" });
      }
      const analysis = await Analysis.findAll({
        where: { occurrence_id: id },
      });

      const response = {
        occurrence: occurrence,
        analysis: analysis,
      };

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getOne: async (req, res) => {
    try {
      const { id } = req.params;
      const analysis = await Analysis.findByPk(id);
      if (!analysis) {
        return res.status(404).json({ error: "Analysis not found" });
      }
      return res.status(200).json(analysis);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const file = req.file;
      const analysis = await Analysis.findByPk(id);

      if (!analysis) {
        return res.status(404).json({ error: "Analysis not found" });
      }

      const newFilename = file ? file.filename : file === null ? null : "";

      const newFileUrl = file
        ? `http://localhost:3000/uploads/${newFilename}`
        : file === null
        ? null
        : "";

      await analysis.update({
        description,
        filename: newFilename,
        fileUrl: newFileUrl,
      });

      return res.status(200).json(analysis);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const analysis = await Analysis.findByPk(id);

      if (!analysis) {
        return res.status(404).json({ error: "Analysis not found" });
      }

      await analysis.destroy();

      return res.status(200).json({ message: "Analysis deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  },
};
