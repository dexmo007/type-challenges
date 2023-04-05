// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>
];

// ============= Your Code Here =============
type MinusMap = {
  "0": "9";
  "1": "0";
  "2": "1";
  "3": "2";
  "4": "3";
  "5": "4";
  "6": "5";
  "7": "6";
  "8": "7";
  "9": "8";
};
type PlusMap = {
  "9": "0";
  "0": "1";
  "1": "2";
  "2": "3";
  "3": "4";
  "4": "5";
  "5": "6";
  "6": "7";
  "7": "8";
  "8": "9";
};
type Digit = keyof MinusMap;

type StringToArray<S extends string> = S extends `${infer Head}${infer Tail}`
  ? [Head, ...StringToArray<Tail>]
  : [];

type Join<S extends string[]> = S extends [
  infer H extends string,
  ...infer T extends string[]
]
  ? `${H}${Join<T>}`
  : "";

type ParseInt<S extends string> = S extends `0${infer N extends number}`
  ? N
  : S extends `${infer N extends number}`
  ? N
  : never;

type _MinusOne<
  Digits extends Digit[],
  Carry extends Digit[] = []
> = Digits extends [
  ...infer FirstDigits extends Digit[],
  infer LastDigit extends Digit
]
  ? LastDigit extends "0"
    ? _MinusOne<FirstDigits, ["9", ...Carry]>
    : [...FirstDigits, MinusMap[LastDigit], ...Carry]
  : Carry;

type _PlusOne<
  Digits extends Digit[],
  Carry extends Digit[] = []
> = Digits extends [
  ...infer FirstDigits extends Digit[],
  infer LastDigit extends Digit
]
  ? LastDigit extends "9"
    ? FirstDigits extends []
      ? ["1", "0", ...Carry]
      : _PlusOne<FirstDigits, ["0", ...Carry]>
    : [...FirstDigits, PlusMap[LastDigit], ...Carry]
  : Carry;

type SplitNumber<N extends number> = `${N}` extends `-${infer D}`
  ? ["-", StringToArray<D>]
  : ["+", StringToArray<`${N}`>];

type MinusOne<N extends number> = N extends 0
  ? -1
  : ParseInt<
      SplitNumber<N> extends [infer Sign, infer Digits extends Digit[]]
        ? Join<
            Sign extends "-" ? ["-", ..._PlusOne<Digits>] : _MinusOne<Digits>
          >
        : never
    >;

type moreCases = [
  Expect<Equal<MinusOne<-1>, -2>>,
  Expect<Equal<MinusOne<-9>, -10>>,
  Expect<Equal<MinusOne<-99>, -100>>
];
