// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<IsPalindrome<"abc">, false>>,
  Expect<Equal<IsPalindrome<"b">, true>>,
  Expect<Equal<IsPalindrome<"abca">, false>>,
  Expect<Equal<IsPalindrome<"abcba">, true>>,
  Expect<Equal<IsPalindrome<121>, true>>,
  Expect<Equal<IsPalindrome<19260817>, false>>
];

// ============= Your Code Here =============
type Reversed<S extends string | number> =
  `${S}` extends `${infer Head}${infer Tail}` ? `${Reversed<Tail>}${Head}` : "";

type IsPalindrome<S extends string | number> = `${S}` extends Reversed<S>
  ? true
  : false;
