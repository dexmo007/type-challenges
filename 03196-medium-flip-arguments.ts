// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<FlipArguments<() => boolean>, () => boolean>>,
  Expect<
    Equal<FlipArguments<(foo: string) => number>, (foo: string) => number>
  >,
  Expect<
    Equal<
      FlipArguments<(arg0: string, arg1: number, arg2: boolean) => void>,
      (arg0: boolean, arg1: number, arg2: string) => void
    >
  >
];

type errors = [
  // @ts-expect-error
  FlipArguments<"string">,
  // @ts-expect-error
  FlipArguments<{ key: "value" }>,
  // @ts-expect-error
  FlipArguments<["apple", "banana", 100, { a: 1 }]>,
  // @ts-expect-error
  FlipArguments<null | undefined>
];

// ============= Your Code Here =============
type Reverse<T extends any[]> = T extends []
  ? []
  : T extends [infer Head, ...infer Tail]
  ? [...Reverse<Tail>, Head]
  : never;
type FlipArguments<T extends (...args: any[]) => any> = T extends (
  ...args: infer TArgs
) => infer R
  ? (...args: Reverse<TArgs>) => R
  : never;
