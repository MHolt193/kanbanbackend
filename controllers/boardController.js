const { restart } = require("nodemon");
const Board = require("../models/boardModels");
const List = require("../models/listModel");

const getBoards = async (req, res) => {
  const boards = await Board.find({ user: req.user.id });
  const sharedBoards = await Board.find({
    assignedUsers: { $elemMatch: { userId: req.user.id } },
  });
  res.status(200).json({
    boards,
    sharedBoards,
  });
};

const setBoards = async (req, res) => {
  if (!req.body.title) {
    res.status(400).json("Title Required");
  }
  const board = await Board.create({
    title: req.body.title,
    user: req.user.id,
  });
  res.status(200).json(board);
};

const updateBoards = (req, res) => {
  res.status(200).send({ title: "updatedTitle" });
};

const deleteBoard = async (req, res) => {
  const id = req.params.id;
  const deletedBoard = await Board.findOneAndDelete({ _id: id, user: req.user._id});
  if(deletedBoard !== null){
    const deleteBoardList = await List.deleteMany({ board: id });
    const boards = await Board.find({ user: req.user.id });
  res.status(200).json(boards);
  }else{
    res.status(400).json(
      "Not authorized to delete this board"
    )
  }
};

module.exports = { getBoards, setBoards, updateBoards, deleteBoard };
