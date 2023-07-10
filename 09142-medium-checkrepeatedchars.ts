// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
import { ExpectFalse, NotEqual } from "./test-utils";

type cases = [
  Expect<Equal<CheckRepeatedChars<"abc">, false>>,
  Expect<Equal<CheckRepeatedChars<"abb">, true>>,
  Expect<Equal<CheckRepeatedChars<"cbc">, true>>,
  Expect<Equal<CheckRepeatedChars<"">, false>>
];

// ============= Your Code Here =============
type ArrayContains<E, S extends any[]> = S extends [infer Head, ...infer Tail]
  ? Head extends E
    ? true
    : ArrayContains<E, Tail>
  : false;

type CheckRepeatedChars<
  T extends string,
  C extends string[] = []
> = T extends `${infer Head extends string}${infer Tail}`
  ? ArrayContains<Head, C> extends true
    ? true
    : CheckRepeatedChars<Tail, [...C, Head]>
  : false;
