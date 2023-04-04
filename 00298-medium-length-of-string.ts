// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<LengthOfString<"">, 0>>,
  Expect<Equal<LengthOfString<"kumiko">, 6>>,
  Expect<Equal<LengthOfString<"reina">, 5>>,
  Expect<Equal<LengthOfString<"Sound! Euphonium">, 16>>
];

// ============= Your Code Here =============

type StringToArray<S extends string> = S extends ""
  ? []
  : S extends `${infer H}${infer T}`
  ? [H, ...StringToArray<T>]
  : never;
type LengthOfString<S extends string> = StringToArray<S> extends {
  length: infer L;
}
  ? L
  : never;
