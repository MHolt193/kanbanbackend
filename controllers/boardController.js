const { restart } = require("nodemon");
const Board = require('../models/boardModels')

const getBoards = async (req, res) =>{
    const boards = await Board.find({user: req.user.id})

    res.status(200).json(boards)
}

const setBoards = async (req,res) =>{
    if(!req.body.title){
        res.status(400).json("Title Required")
    }
    const board = await Board.create({
        title: req.body.title,
        user: req.user.id
    })
    res.status(200).json(board)
}
const updateBoards = (req, res) =>{
    res.status(200).send({title: "updatedTitle"})
}
const deleteBoard = (req,res) =>{
    restart.status(200).send('deleted board')
}



module.exports = {getBoards,setBoards, updateBoards, deleteBoard}