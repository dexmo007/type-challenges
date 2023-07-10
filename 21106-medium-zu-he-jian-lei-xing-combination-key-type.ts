// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type CaseTypeOne =
  | "cmd ctrl"
  | "cmd opt"
  | "cmd fn"
  | "ctrl opt"
  | "ctrl fn"
  | "opt fn";

type cases = [Expect<Equal<Combs, CaseTypeOne>>];

// ============= Your Code Here =============
type ModifierKeys = ["cmd", "ctrl", "opt", "fn"];

type PrefixAll<A extends string[], P extends string> = A extends [
  infer Head extends string,
  ...infer Tail extends string[]
]
  ? [`${P}${Head}`, ...PrefixAll<Tail, P>]
  : [];

type Combinations<Keys extends string[]> = Keys extends [
  infer Head extends string,
  ...infer Tail extends string[]
]
  ? [...PrefixAll<Tail, `${Head} `>, ...Combinations<Tail>]
  : [];

// 实现 Combs
type Combs = Combinations<ModifierKeys>[number];
