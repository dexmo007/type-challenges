// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
import { ExpectFalse, NotEqual } from "./test-utils";

type cases = [
  Expect<Equal<Transpose<[]>, []>>,
  Expect<Equal<Transpose<[[1]]>, [[1]]>>,
  Expect<Equal<Transpose<[[1, 2]]>, [[1], [2]]>>,
  Expect<Equal<Transpose<[[1, 2], [3, 4]]>, [[1, 3], [2, 4]]>>,
  Expect<Equal<Transpose<[[1, 2, 3], [4, 5, 6]]>, [[1, 4], [2, 5], [3, 6]]>>,
  Expect<Equal<Transpose<[[1, 4], [2, 5], [3, 6]]>, [[1, 2, 3], [4, 5, 6]]>>,
  Expect<
    Equal<
      Transpose<[[1, 2, 3], [4, 5, 6], [7, 8, 9]]>,
      [[1, 4, 7], [2, 5, 8], [3, 6, 9]]
    >
  >
];

// ============= Your Code Here =============
type Split<
  T extends number[][],
  RH extends number[] = [],
  RT extends number[][] = []
> = T extends [
  infer HeadRow extends number[],
  ...infer TailRows extends number[][]
]
  ? HeadRow extends [infer Head extends number, ...infer Tail extends number[]]
    ? Split<TailRows, [...RH, Head], Tail extends [] ? RT : [...RT, Tail]>
    : never
  : [RH, RT];

type Transpose<M extends number[][]> = M extends []
  ? []
  : Split<M> extends [infer HeadCol, infer TailCols extends any[][]]
  ? [HeadCol, ...Transpose<TailCols>]
  : [];
