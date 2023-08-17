// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<FirstUniqueCharIndex<"leetcode">, 0>>,
  Expect<Equal<FirstUniqueCharIndex<"loveleetcode">, 2>>,
  Expect<Equal<FirstUniqueCharIndex<"aabb">, -1>>,
  Expect<Equal<FirstUniqueCharIndex<"">, -1>>,
  Expect<Equal<FirstUniqueCharIndex<"aaa">, -1>>
];

// ============= Your Code Here =============
type SetContains<S, E> = S extends [infer H, ...infer T]
  ? H extends E
    ? true
    : SetContains<T, E>
  : false;
type RemoveCandidate<TCandidates, E> = TCandidates extends [
  [infer C, infer I],
  ...infer Rest
]
  ? C extends E
    ? Rest
    : [[C, I], ...RemoveCandidate<Rest, E>]
  : [];

type FirstUniqueCharIndex<
  S extends string,
  TChars extends string[] = [],
  TIndex extends string[] = [],
  TCandidates extends [string, number][] = []
> = S extends `${infer H}${infer T}`
  ? SetContains<TChars, H> extends true
    ? FirstUniqueCharIndex<
        T,
        TChars,
        [...TIndex, H],
        RemoveCandidate<TCandidates, H>
      >
    : FirstUniqueCharIndex<
        T,
        [...TChars, H],
        [...TIndex, H],
        [...TCandidates, [H, TIndex["length"]]]
      >
  : TCandidates extends [
      infer TFirstCandidate extends [string, number],
      ...any[]
    ]
  ? TFirstCandidate[1]
  : -1;
