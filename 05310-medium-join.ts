// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Join<["a", "p", "p", "l", "e"], "-">, "a-p-p-l-e">>,
  Expect<Equal<Join<["Hello", "World"], " ">, "Hello World">>,
  Expect<Equal<Join<["2", "2", "2"], 1>, "21212">>,
  Expect<Equal<Join<["o"], "u">, "o">>
];

// ============= Your Code Here =============
type StringLike = string | number | bigint | boolean | null | undefined;
type Join<T extends StringLike[], U extends StringLike> = T extends []
  ? ""
  : T extends [
      infer Head1 extends StringLike,
      infer Head2 extends StringLike,
      ...infer Tail extends StringLike[]
    ]
  ? Join<[`${Head1}${U}${Head2}`, ...Tail], U>
  : T[0];

type test = Join<["2", "2", "2"], 1>;
//   ^?
