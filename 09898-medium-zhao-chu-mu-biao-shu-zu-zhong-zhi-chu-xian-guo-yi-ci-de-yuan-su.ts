// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";
import { ExpectFalse, NotEqual } from "./test-utils";

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>
];

// ============= Your Code Here =============
type SetContains<TSet, TElement> = TSet extends [infer Head, ...infer Tail]
  ? Head extends TElement
    ? true
    : SetContains<Tail, TElement>
  : false;
type SetRemove<TSet, TElement, TResult extends any[] = []> = TSet extends [
  infer Head,
  ...infer Tail
]
  ? Head extends TElement
    ? [...TResult, ...Tail]
    : SetRemove<Tail, TElement, [...TResult, Head]>
  : TResult;

type FindEles<
  T extends any[],
  TResult extends any[] = [],
  TBlacklist extends any[] = []
> = T extends [infer Head, ...infer Tail]
  ? SetContains<TResult, Head> extends true
    ? FindEles<Tail, SetRemove<TResult, Head>, [...TBlacklist, Head]>
    : SetContains<TBlacklist, Head> extends true
    ? FindEles<Tail, TResult, TBlacklist>
    : FindEles<Tail, [...TResult, Head], TBlacklist>
  : TResult;
