import { BINGO_FREE_LABEL, BINGO_PHRASES } from "@/data/bingo-phrases";

const ROWS = 5;
const COLS = 5;
const FREE_ROW = 2;
const FREE_COL = 2;
const NUMBERS_COUNT = 24; // 1–24, center is FREE (0)

/**
 * Card cell value: 0 = FREE space, 1–24 = number that corresponds to a clue.
 */
export type BingoGrid = number[][];

/**
 * Clues in order: clues[n-1] is the phrase for number n.
 */
export type BingoClues = string[];

export interface BingoCardData {
  grid: BingoGrid;
  clues: BingoClues;
}

/**
 * Shuffle array (Fisher–Yates) and return a copy.
 */
function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Generate a 5x5 bingo card. Top row will be under B-I-N-G-O headers.
 * Center [2][2] is FREE (0). Other 24 cells get numbers 1–24; each number maps to one clue.
 */
export function generateCard(): BingoCardData {
  const shuffled = shuffle(BINGO_PHRASES).slice(0, NUMBERS_COUNT);
  const clues: BingoClues = [...shuffled];

  // Build list of (row, col) for non-FREE cells, then shuffle to randomize number placement
  const positions: { r: number; c: number }[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (r !== FREE_ROW || c !== FREE_COL) positions.push({ r, c });
    }
  }
  const shuffledPositions = shuffle(positions);

  const grid: BingoGrid = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  grid[FREE_ROW][FREE_COL] = 0; // FREE

  shuffledPositions.forEach(({ r, c }, i) => {
    grid[r][c] = i + 1; // numbers 1–24
  });

  return { grid, clues };
}

/**
 * Check for bingo: full row (5), full column (5), or either 5-cell diagonal.
 * FREE (center) is always considered marked.
 */
export function checkWin(marked: boolean[][]): boolean {
  const isMarked = (r: number, c: number) => {
    if (r === FREE_ROW && c === FREE_COL) return true;
    return marked[r]?.[c] === true;
  };

  for (let r = 0; r < ROWS; r++) {
    if (Array.from({ length: COLS }, (_, c) => c).every((c) => isMarked(r, c)))
      return true;
  }
  for (let c = 0; c < COLS; c++) {
    if (Array.from({ length: ROWS }, (_, r) => r).every((r) => isMarked(r, c)))
      return true;
  }
  if ([0, 1, 2, 3, 4].every((i) => isMarked(i, i))) return true;
  if ([0, 1, 2, 3, 4].every((i) => isMarked(i, COLS - 1 - i))) return true;

  return false;
}

export { ROWS as GRID_ROWS, COLS as GRID_COLS, FREE_ROW, FREE_COL, BINGO_FREE_LABEL };
