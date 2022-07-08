const List = require("../models/listModel");

const getList = async (req, res) => {
  const list = await List.find({ board: req.params.id });
  if (list.length > 0) {
    res.status(200).json(list);
  } else {
    res.status(404).json({ message: "No tasks found" });
  }
};

const getItem = async (req, res) => {
  const item = await List.find({ board: req.params.boardId, _id: req.params.itemId });

  res.status(200).json(item)
};

const setList = async (req, res) => {
  const item = await List.create({
    board: req.body.board,
    title: req.body.title,
    description: req.body.description,
    subtasks: req.body.subtasks,
    status: req.body.status,
  });

  res.status(200).json(item);
};

const deleteItem = async (req, res) => {
  const deletedItem = await List.findByIdAndDelete(req.params.id);

  res.status(200).json(deletedItem);

};

const editItem = async (req, res) => {
  const editedItem = await List.findByIdAndUpdate(req.params.id, req.body)

  res.status(200).json(editedItem);
}

module.exports = { setList, getList, getItem, deleteItem, editItem };
