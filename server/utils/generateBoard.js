const Column = require("../models/Column");
const Board = require("../models/Board");

const generateBoard = async (boardtitle) => {
  // A new board already comes with the "in progress" and "completed" columns and is created for the user when they sign up
  const inProgressColumn = await Column.create({
    title: "In Progress",
    cards: [],
  });

  const completedColumn = await Column.create({
    title: "Completed",
    cards: [],
  });

  const board = await Board.create({
    title: boardtitle,
    columns: [inProgressColumn, completedColumn],
  });
  
  return board
}

module.exports = generateBoard;