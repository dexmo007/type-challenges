// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<
    Equal<
      Camelize<{
        some_prop: string;
        prop: { another_prop: string };
        array: [
          { snake_case: string },
          { another_element: { yet_another_prop: string } },
          { yet_another_element: string }
        ];
      }>,
      {
        someProp: string;
        prop: { anotherProp: string };
        array: [
          { snakeCase: string },
          { anotherElement: { yetAnotherProp: string } },
          { yetAnotherElement: string }
        ];
      }
    >
  >
];

// ============= Your Code Here =============

type ToCamelCase<S extends string> =
  S extends `${infer Head}_${infer Tail1}${infer Tail2}`
    ? `${Head}${Uppercase<Tail1>}${ToCamelCase<Tail2>}`
    : S;

type test = ToCamelCase<"yet_another_element">;
//   ^?

type CamelizeArray<T extends any[]> = T extends [infer H, ...infer T]
  ? [Camelize<H>, ...CamelizeArray<T>]
  : T;
type Camelize<T> = T extends any[]
  ? CamelizeArray<T>
  : T extends object
  ? { [k in keyof T as k extends string ? ToCamelCase<k> : k]: Camelize<T[k]> }
  : T;
