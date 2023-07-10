// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<ParseQueryString<"">, {}>>,
  Expect<Equal<ParseQueryString<"k1">, { k1: true }>>,
  Expect<Equal<ParseQueryString<"k1&k1">, { k1: true }>>,
  Expect<Equal<ParseQueryString<"k1&k2">, { k1: true; k2: true }>>,
  Expect<Equal<ParseQueryString<"k1=v1">, { k1: "v1" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1=v2">, { k1: ["v1", "v2"] }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k2=v2">, { k1: "v1"; k2: "v2" }>>,
  Expect<
    Equal<ParseQueryString<"k1=v1&k2=v2&k1=v2">, { k1: ["v1", "v2"]; k2: "v2" }>
  >,
  Expect<Equal<ParseQueryString<"k1=v1&k2">, { k1: "v1"; k2: true }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1=v1">, { k1: "v1" }>>,
  Expect<Equal<ParseQueryString<"k1=v1&k1=v2&k1=v1">, { k1: ["v1", "v2"] }>>,
  Expect<
    Equal<
      ParseQueryString<"k1=v1&k2=v1&k1=v2&k1=v1">,
      { k1: ["v1", "v2"]; k2: "v1" }
    >
  >,
  Expect<
    Equal<
      ParseQueryString<"k1=v1&k2=v2&k1=v2&k1=v3">,
      { k1: ["v1", "v2", "v3"]; k2: "v2" }
    >
  >,
  Expect<Equal<ParseQueryString<"k1=v1&k1">, { k1: ["v1", true] }>>,
  Expect<Equal<ParseQueryString<"k1&k1=v1">, { k1: [true, "v1"] }>>
];

// ============= Your Code Here =============
type ParsePart<P extends string> = P extends `${infer Key}=${infer Value}`
  ? { [k in Key]: Value }
  : { [k in P]: true };

type SetAdd<S extends any[], E> = S extends [infer Head, ...infer Tail]
  ? E extends Head
    ? S
    : [Head, ...SetAdd<Tail, E>]
  : [...S, E];

type Add<T, U> = T extends any[] ? SetAdd<T, U> : [T, U];

type Merge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T
    ? K extends keyof U
      ? T[K] extends U[K]
        ? T[K]
        : Add<T[K], U[K]>
      : T[K]
    : K extends keyof U
    ? U[K]
    : never;
};

type ParseQueryString<Q extends string, R = {}> = Q extends ""
  ? R
  : Q extends `${infer Part}&${infer Rest}`
  ? ParseQueryString<Rest, Merge<R, ParsePart<Part>>>
  : Q extends `${infer Part}`
  ? Merge<R, ParsePart<Part>>
  : R;
