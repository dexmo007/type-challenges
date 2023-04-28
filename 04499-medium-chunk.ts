// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Chunk<[], 1>, []>>,
  Expect<Equal<Chunk<[1, 2, 3], 1>, [[1], [2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3], 2>, [[1, 2], [3]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 2>, [[1, 2], [3, 4]]>>,
  Expect<Equal<Chunk<[1, 2, 3, 4], 5>, [[1, 2, 3, 4]]>>,
  Expect<Equal<Chunk<[1, true, 2, false], 2>, [[1, true], [2, false]]>>
];

// ============= Your Code Here =============
type Chunk<
  A extends any[],
  N extends number,
  C extends any[][] = []
> = A extends [infer Head, ...infer Tail]
  ? Chunk<
      Tail,
      N,
      C extends [...infer FirstChunks extends any[][], infer Last extends any[]]
        ? Last extends { length: N }
          ? [...C, [Head]]
          : [...FirstChunks, [...Last, Head]]
        : [[Head]]
    >
  : C;
