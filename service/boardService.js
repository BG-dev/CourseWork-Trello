const { validateBoard } = require("./validators/boardValidator");
const {
  createBoardInTrello,
  updateBoardInTrello,
  deleteBoardFromTrello,
} = require("../integration/boardIntegration");
const { getBoardListsById } = require("../integration/cardIntegration");
const {
  replaceArrayElementById,
  getElementFromArrayById,
  deleteElementFromArrayById,
} = require("./arrayService");
const { writeDataToJsonFile } = require("./commandHelper");
const boards = require("../integration/databases/boards.json");
const cards = require("../integration/databases/cards.json");

const BOARDS_FILE = "boards.json";
const CARDS_FILE = "cards.json";

async function getBoardById(id) {
  const board = await getBoardFromFileById(id);

  return board;
}

async function getBoards() {
  const boardsList = await getBoardsFromFile();

  return boardsList;
}

async function getListsByBoardId(id) {
  const boardLists = await getBoardListsById(id);

  return boardLists;
}

async function addBoard(newBoardData) {
  const { error } = validateBoard(newBoardData);
  if (error) throw new Error(error.details[0].message);

  const board = await createBoardInTrello(newBoardData);
  addBoardToFile(board);
}

async function updateBoard(boardId, newBoardData) {
  const oldBoard = getElementFromArrayById(boards, boardId);
  const newBoard = { ...oldBoard, ...newBoardData };

  const { error } = validateBoard(newBoard);
  if (error) throw new Error(error.details[0].message);

  await updateBoardInTrello(newBoard);
  await updateBoardInFile(newBoard);
}

async function deleteBoard(boardId) {
  await deleteBoardFromTrello(boardId);
  deleteBoardFromFile(boardId);
  deleteBoardCardsFromFile(boardId);
}

function addBoardToFile(board) {
  if (!board) throw new Error("Board is undefined");

  const updatedBoards = [...boards, board];
  writeDataToJsonFile(updatedBoards, BOARDS_FILE);
}

function getBoardsFromFile() {
  if (!boards || boards.length === 0) throw new Error("Boards list is empty");

  return boards;
}

function getBoardFromFileById(id) {
  if (!boards || boards.length === 0) throw new Error("Boards list is empty");

  const board = getElementFromArrayById(boards, id);
  return board;
}

function updateBoardInFile(board) {
  if (!board) throw new Error("Board is undefined");

  const updatedBoards = replaceArrayElementById(boards, board);
  writeDataToJsonFile(updatedBoards, BOARDS_FILE);
}

async function deleteBoardFromFile(boardId) {
  if (!boardId) throw new Error("id is undefined");

  const updatedBoards = deleteElementFromArrayById(boards, boardId);
  writeDataToJsonFile(updatedBoards, BOARDS_FILE);
}

async function deleteBoardCardsFromFile(boardId) {
  if (!boardId) throw new Error("id is undefined");

  const updatedCards = cards.filter((card) => card.boardId !== boardId);
  writeDataToJsonFile(updatedCards, CARDS_FILE);
}

module.exports = {
  getBoards,
  getBoardById,
  getListsByBoardId,
  addBoard,
  updateBoard,
  deleteBoard,
};
