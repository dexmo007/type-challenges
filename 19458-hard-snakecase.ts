// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
import { ExpectFalse, NotEqual } from "./test-utils";

type cases = [
  Expect<Equal<SnakeCase<"hello">, "hello">>,
  Expect<Equal<SnakeCase<"userName">, "user_name">>,
  Expect<Equal<SnakeCase<"getElementById">, "get_element_by_id">>,
  Expect<
    Equal<
      SnakeCase<"getElementById" | "getElementByClassNames">,
      "get_element_by_id" | "get_element_by_class_names"
    >
  >
];

// ============= Your Code Here =============
type IsCaseChange<S extends string, T extends string> = S extends Lowercase<S>
  ? T extends Uppercase<T>
    ? true
    : false
  : false;

type SnakeCase<S extends string> =
  S extends `${infer First}${infer Second}${infer Rest}`
    ? IsCaseChange<First, Second> extends true
      ? `${First}_${Lowercase<Second>}${SnakeCase<Rest>}`
      : `${First}${SnakeCase<`${Second}${Rest}`>}`
    : S;
