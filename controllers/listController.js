const List = require("../models/listModel");

const getList = async (req, res) => {
  const list = await List.find({ board: req.board.id });

  res.status(200).json(list);
};

const setList = async (req, res) => {
  const item = List.create({
    title: req.body.title,
    description: req.body.description,
    subtasks: req.body.subtasks,
    status: req.body.status,
    
  });

  res.status(200).json(item);
};

module.extracts = {setList, getList}
