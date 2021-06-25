const Board = require("../models/Board");
const fullBoard = require("../utils/fullBoard");
const asyncHandler = require("express-async-handler");
const generateBoard = require("../utils/generateBoard");

// @route GET /board
// @desc Get complete board object (includes card and column objects ordered)
// @access Private
exports.fullBoardById = asyncHandler(async (req, res, next) => {
  try {
    const board = await Board.findById(req.query.id).exec();
    res.status(200).json({ success: await fullBoard(board) });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// @route PUT /board/update
// @desc Update board by reordering columns and/or cards
// @access Private
exports.updateBoard = asyncHandler(async (req, res, next) => {
  try {
    const newBoard = req.body.board;
    const board = await Board.findByIdAndUpdate(newBoard._id, newBoard).exec();
    res.status(200).json({ success: await fullBoard(board) });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// @route PUT /board/create
// @desc Creates new board with given title to given user
// @access Private
exports.createBoard = asyncHandler(async (req, res, next) => {
  try {
    const { id, title } = req.body;
    const userModel = await User.findById(id).exec();
    const board = await generateBoard(title);
    userModel.boards.push(board._id);
    await userModel.save();
    res.status(200).json({ success: await fullBoard(board) });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// @route GET /board/title
// @desc Get board titles of specified user
// @access Private
exports.boardTitle = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.query.id).populate({path: "boards"}).exec();
    const titles = user.boards.map(b => {
        return { id: b._id, title: b.title || 'Untitled' };
    });
    res.status(200).json({success: titles});
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
