const express = require("express");
const router = express.Router();
const { getBoards, setBoards, updateBoards, deleteBoard } = require("../controllers/boardController");

const {protect} = require('../middleware/authMiddleware')
router.get("/", protect, getBoards);
router.post("/", protect, setBoards);
router.put("/:id", protect, updateBoards);
router.delete("/:id", protect, deleteBoard);
module.exports = router;
