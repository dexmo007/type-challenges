// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<BinaryToDecimal<"10">, 2>>,
  Expect<Equal<BinaryToDecimal<"0011">, 3>>,
  Expect<Equal<BinaryToDecimal<"00000000">, 0>>,
  Expect<Equal<BinaryToDecimal<"11111111">, 255>>,
  Expect<Equal<BinaryToDecimal<"10101010">, 170>>
];

// ============= Your Code Here =============
type PlusMap = {
  "0": {
    "0": [0, 0];
    "1": [1, 0];
    "2": [2, 0];
    "3": [3, 0];
    "4": [4, 0];
    "5": [5, 0];
    "6": [6, 0];
    "7": [7, 0];
    "8": [8, 0];
    "9": [9, 0];
  };
  "1": {
    "0": [1, 0];
    "1": [2, 0];
    "2": [3, 0];
    "3": [4, 0];
    "4": [5, 0];
    "5": [6, 0];
    "6": [7, 0];
    "7": [8, 0];
    "8": [9, 0];
    "9": [0, 1];
  };
  "2": {
    "0": [2, 0];
    "1": [3, 0];
    "2": [4, 0];
    "3": [5, 0];
    "4": [6, 0];
    "5": [7, 0];
    "6": [8, 0];
    "7": [9, 0];
    "8": [0, 1];
    "9": [1, 1];
  };
  "3": {
    "0": [3, 0];
    "1": [4, 0];
    "2": [5, 0];
    "3": [6, 0];
    "4": [7, 0];
    "5": [8, 0];
    "6": [9, 0];
    "7": [0, 1];
    "8": [1, 1];
    "9": [2, 1];
  };
  "4": {
    "0": [4, 0];
    "1": [5, 0];
    "2": [6, 0];
    "3": [7, 0];
    "4": [8, 0];
    "5": [9, 0];
    "6": [0, 1];
    "7": [1, 1];
    "8": [2, 1];
    "9": [3, 1];
  };
  "5": {
    "0": [5, 0];
    "1": [6, 0];
    "2": [7, 0];
    "3": [8, 0];
    "4": [9, 0];
    "5": [0, 1];
    "6": [1, 1];
    "7": [2, 1];
    "8": [3, 1];
    "9": [4, 1];
  };
  "6": {
    "0": [6, 0];
    "1": [7, 0];
    "2": [8, 0];
    "3": [9, 0];
    "4": [0, 1];
    "5": [1, 1];
    "6": [2, 1];
    "7": [3, 1];
    "8": [4, 1];
    "9": [5, 1];
  };
  "7": {
    "0": [7, 0];
    "1": [8, 0];
    "2": [9, 0];
    "3": [0, 1];
    "4": [1, 1];
    "5": [2, 1];
    "6": [3, 1];
    "7": [4, 1];
    "8": [5, 1];
    "9": [6, 1];
  };
  "8": {
    "0": [8, 0];
    "1": [9, 0];
    "2": [0, 1];
    "3": [1, 1];
    "4": [2, 1];
    "5": [3, 1];
    "6": [4, 1];
    "7": [5, 1];
    "8": [6, 1];
    "9": [7, 1];
  };
  "9": {
    "0": [9, 0];
    "1": [0, 1];
    "2": [1, 1];
    "3": [2, 1];
    "4": [3, 1];
    "5": [4, 1];
    "6": [5, 1];
    "7": [6, 1];
    "8": [7, 1];
    "9": [8, 1];
  };
};
type Digit = `${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9][number]}`;

type ReverseJoin<S extends string[]> = S extends [
  infer Head extends string,
  ...infer Tail extends string[]
]
  ? `${ReverseJoin<Tail>}${Head}`
  : "";

type _Plus<
  A1 extends string[],
  A2 extends string[],
  R extends string = ""
> = A1 extends [infer A1H extends Digit, ...infer A1T extends any[] | []]
  ? A2 extends [infer A2H extends Digit, ...infer A2T extends any[] | []]
    ? PlusMap[A1H][A2H] extends [infer DigitResult extends number, infer Carry]
      ? _Plus<
          A1T,
          Carry extends 0 ? A2T : AsReverseArray<_Plus<A2T, ["1"]>>,
          `${DigitResult}${R}`
        >
      : never
    : `${ReverseJoin<A1>}${R}`
  : `${ReverseJoin<A2>}${R}`;

type Plus<A1 extends string, A2 extends string> = _Plus<
  AsReverseArray<A1>,
  AsReverseArray<A2>
>;

type Bit = "0" | "1";
type _BinaryToDecimal<
  LSB extends string[],
  P extends string = "1",
  R extends string = "0"
> = LSB extends [infer B extends Bit, ...infer Rest extends Bit[]]
  ? _BinaryToDecimal<Rest, Plus<P, P>, B extends "0" ? R : Plus<R, P>>
  : R;

type AsReverseArray<S extends string> = S extends ""
  ? []
  : S extends `${infer Head}${infer Tail}`
  ? [...AsReverseArray<Tail>, Head]
  : [S];

type BinaryToDecimal<S extends string> = _BinaryToDecimal<
  AsReverseArray<S>
> extends `${infer N extends number}`
  ? N
  : never;
