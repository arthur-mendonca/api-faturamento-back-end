const express = require("express");
const router = express.Router();

//CONTROLLERS
const userController = require("./app/controllers/ControllerUsers.js");
const occurrenceController = require("./app/controllers/ControllerOccurrences.js");
const evidenceController = require("./app/controllers/ControllerEvidences.js");
const analysisController = require("./app/controllers/ControllerAnalysis");
const correctiveActionsController = require("./app/controllers/ControllerCorrectiveActions.js");

//UPLOAD DO MULTER
const upload = require("./config/multerConfig");

//MIDDLEWARES
const authMiddleware = require("./app/middlewares/auth.js");

//USERS
router.post("/users", userController.store);
router.get("/users", userController.index);
router.get("/users/:id", userController.findOne);
router.put("/users/:id", authMiddleware, userController.update);
router.delete("/users/:id", authMiddleware, userController.delete);

//LOGIN
router.post("/users/login", userController.login);

//OCCURRENCES
router.post(
  "/users/occurrences/:id",
  authMiddleware,
  occurrenceController.store
);
router.get("/users/occurrences/all", occurrenceController.index);
router.get("/users/occurrences/:id", occurrenceController.findOne);
router.put(
  "/users/occurrences/:id",
  authMiddleware,
  occurrenceController.update
);
router.delete(
  "/users/occurrences/:id",
  authMiddleware,
  occurrenceController.delete
);

//EVIDENCES
router.post(
  "/occurrences/:id/evidences",
  authMiddleware,
  upload.single("file"),
  evidenceController.store
);
router.get(
  "/occurrences/:id/evidences",
  evidenceController.allEvidencesFromOccurrence
);
router.get("/evidences/:id", evidenceController.findOne);
router.put(
  "/evidences/:id",
  authMiddleware,
  upload.single("file"),
  evidenceController.update
);
router.delete("/evidences/:id", authMiddleware, evidenceController.delete);
router.get("/evidences", evidenceController.getAll);

// ANALYSIS
router.post(
  "/occurrences/:id/analysis",
  authMiddleware,
  upload.single("file"),
  analysisController.store
);
router.get("/occurrences/analysis", analysisController.index);
router.get("/occurrences/analysis/:id", analysisController.getOne);
router.put(
  "/occurrences/analysis/:id",
  authMiddleware,
  upload.single("file"),
  analysisController.update
);
router.get(
  "/occurrences/:id/analysis",
  analysisController.allAnalysisFromOccurrence
);
router.delete(
  "/occurrences/analysis/:id",
  authMiddleware,
  analysisController.delete
);

//CORRECTIVE ACTIONS
router.post(
  "/occurrences/:id/corrective-actions",
  authMiddleware,
  correctiveActionsController.create
);

router.get(
  "/occurrences/corrective-actions",
  correctiveActionsController.index
);

router.get(
  "/occurrences/:id/corrective-actions",
  correctiveActionsController.getOne
);

router.put(
  "/occurrences/:id/corrective-actions",
  authMiddleware,
  correctiveActionsController.update
);

router.delete(
  "/occurrences/:id/corrective-actions",
  authMiddleware,
  correctiveActionsController.delete
);

router.get(
  "/occurrences/corrective-actions/:id",
  correctiveActionsController.allCorrectiveActionsFromOccurrence
);

module.exports = router;
