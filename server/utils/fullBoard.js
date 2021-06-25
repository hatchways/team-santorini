const Board = require("../models/Board");

const fullBoard = async (board) => {
  return await board.populate({ path: "columns", populate: { path: "cards" } }).execPopulate();
}

module.exports = fullBoard;