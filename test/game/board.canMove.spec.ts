import { expect } from "chai";
import {
  Move
} from "../../src/block-fly/game/board";
import BoardParser from "../../src/block-fly/game/numbersBoardParser";
import { makePlayerFaceRight, makePlayerHaveBlock } from "./boardHelpers";

const parser = new BoardParser();

describe("!unit! Board canMove", () => {
  describe("left", () => {
    it("can't move left because of block", () => {
      const board = parser.parse(`
        1,0,0,1
        1,2,3,1
        1,1,1,1
      `);

      const actual = board.canMove(1, Move.Left);
      expect(actual).to.be.false;
    });
  });

  describe("right", () => {
    it("can't move right because of wall", () => {
      const board = parser.parse(`
        1,0,0,1
        1,2,3,1
        1,1,1,1
      `);

      const actual = board.canMove(1, Move.Right);
      expect(actual).to.be.false;
    });
  });

  describe("climb", () => {

    it("can climb left", () => {
      const board = parser.parse(`
        1,0,0,1
        1,2,3,1
        1,1,1,1
      `);

      const actual = board.canMove(1, Move.Climb);
      expect(actual).to.be.true;
    });

    it("can't climb left because of empty", () => {
      const board = parser.parse(`
        1,0,0,1
        1,0,3,1
        1,1,1,1
      `);

      const actual = board.canMove(1, Move.Climb);
      expect(actual).to.be.false;
    });

    it("can't climb left or right because of wall over", () => {
      const board = parser.parse(`
        1,0,1,0,1
        1,2,3,1,1
        1,1,1,1,1
      `);

      let actual = board.canMove(1, Move.Climb);
      expect(actual).to.be.false;

      makePlayerFaceRight(board);
      actual = board.canMove(1, Move.Climb);
      expect(actual).to.be.false;
    });

    it("can climb right", () => {
      const board = parser.parse(`
        1,0,0,1
        1,3,2,1
        1,1,1,1
      `);

      makePlayerFaceRight(board);
      const actual = board.canMove(1, Move.Climb);
      expect(actual).to.be.true;
    });

    it("can't climb right", () => {
      const board = parser.parse(`
        1,0,0,1
        1,2,3,1
        1,1,1,1
      `);

      makePlayerFaceRight(board);
      const actual = board.canMove(1, Move.Climb);
      expect(actual).to.be.false;
    });

    it("can climb left with block", () => {
      const board = parser.parse(`
        1,0,0,1
        1,0,2,1
        1,1,3,1
        1,1,1,1
      `);

      makePlayerHaveBlock(board, { x: 2, y: 1 });
      const actual = board.canMove(1, Move.Climb);
      expect(actual).to.be.true;
    });
  });

  describe("grab", () => {
    it("can grab left", () => {
      const board = parser.parse(`
        1,0,0,1
        1,2,3,1
        1,1,1,1
      `);

      const actual = board.canMove(1, Move.GrabDrop);
      expect(actual).to.be.true;
    });

    it("can grab left if something on top of block", () => {
      const board = parser.parse(`
        1,1,0,1
        1,2,3,1
        1,1,1,1
      `);

      const actual = board.canMove(1, Move.GrabDrop);
      expect(actual).to.be.false;
    });

    it("can grab left if something on top of player", () => {
      const board = parser.parse(`
        1,0,1,1
        1,2,3,1
        1,1,1,1
      `);

      const actual = board.canMove(1, Move.GrabDrop);
      expect(actual).to.be.false;
    });
  });

  describe("drop", () => {
    it("can drop left", () => {
      const board = parser.parse(`
        1,0,2,1
        1,0,3,1
        1,1,1,1
      `);

      makePlayerHaveBlock(board, { x: 2, y: 0 });
      const actual = board.canMove(1, Move.GrabDrop);
      expect(actual).to.be.true;
    });

    it("can drop left over wall", () => {
      const board = parser.parse(`
        1,0,2,1
        1,1,3,1
        1,1,1,1
      `);

      makePlayerHaveBlock(board, { x: 2, y: 0 });
      const actual = board.canMove(1, Move.GrabDrop);
      expect(actual).to.be.true;
    });

    it("can drop left because of wall", () => {
      const board = parser.parse(`
        1,1,2,1
        1,0,3,1
        1,1,1,1
      `);

      makePlayerHaveBlock(board, { x: 2, y: 0 });
      const actual = board.canMove(1, Move.GrabDrop);
      expect(actual).to.be.false;
    });

    it("can drop right", () => {
      const board = parser.parse(`
        1,2,0,1
        1,3,0,1
        1,1,1,1
      `);

      makePlayerFaceRight(board);
      makePlayerHaveBlock(board, { x: 2, y: 0 });
      const actual = board.canMove(1, Move.GrabDrop);
      expect(actual).to.be.true;
    });

    it("can drop right over wall", () => {
      const board = parser.parse(`
        1,2,0,1
        1,3,1,1
        1,1,1,1
      `);

      makePlayerFaceRight(board);
      makePlayerHaveBlock(board, { x: 2, y: 0 });
      const actual = board.canMove(1, Move.GrabDrop);
      expect(actual).to.be.true;
    });

    it("can't drop right because of wall", () => {
      const board = parser.parse(`
        1,2,1,1
        1,3,0,1
        1,1,1,1
      `);

      makePlayerFaceRight(board);
      makePlayerHaveBlock(board, { x: 2, y: 0 });
      const actual = board.canMove(1, Move.GrabDrop);
      expect(actual).to.be.false;
    });
  });
});
