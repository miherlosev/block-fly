import {
  pieceGenerator,
  playerPieceGenerator,
  PieceType
} from "./pieces";
import { IBoardParser } from "./boardParser";
import { Board } from "./board";

export default class SymbolsBoardParser implements IBoardParser {
  private static pieceTypes: { [key: string]: PieceType } = {
    "#": PieceType.Wall,
    " ": PieceType.Empty,
    "B": PieceType.Block,
    "D": PieceType.Door
  };

  public parse(text: string): Board {
    let playerId = 1;
    const pieces = text.trim().split("\n").map((x, i) => {
      return x.trim().split("").map((s, j) => {
        if (s === "P") {
          return playerPieceGenerator(playerId++, { x: j, y: i });
        }

        if ( typeof SymbolsBoardParser.pieceTypes[s] !== "undefined") {
          return pieceGenerator(SymbolsBoardParser.pieceTypes[s], { x: j, y: i });
        }

        throw new Error(`Unknown piece type '${s}'.`);
      });
    });

    const arrayOfPieces = [];
    pieces.forEach(x => arrayOfPieces.push(...x));

    return new Board(arrayOfPieces, pieces[0].length, pieces.length);
  }

  public asString(board: Board): string {
    const invertedMap = {};
    for (const key in SymbolsBoardParser.pieceTypes) {
      if (SymbolsBoardParser.pieceTypes.hasOwnProperty(key)) {
        invertedMap[SymbolsBoardParser.pieceTypes[key]] = key;
      }
    }
    invertedMap[PieceType.Player] = "P";

    let result = "";
    for (let y = 0; y < board.height; y++) {
      for (let x = 0; x < board.width; x++) {
        const piece = board.getPiece({ x, y });
        result += invertedMap[piece.type];
      }

      result = result + "\n";
    }

    return result.trim();
  }
}
