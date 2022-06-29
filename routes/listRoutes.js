const express = require("express");
const router = express.Router();
const { getList, getItem, setList } = require("../controllers/listController");
const { protect } = require("../middleware/authMiddleware");


router.get("/:id", protect, getList);
router.get('/:boardId/:itemId', protect, getItem )
router.post("/", protect, setList);
//router.put("/:id", protect, editList);
//router.delete("/:id", protect, deleteList);

module.exports = router;
