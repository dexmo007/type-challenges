// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<IsNegativeNumber<0>, false>>,
  Expect<Equal<IsNegativeNumber<number>, never>>,
  Expect<Equal<IsNegativeNumber<-1 | -2>, never>>,
  Expect<Equal<IsNegativeNumber<-1>, true>>,
  Expect<Equal<IsNegativeNumber<-1.9>, true>>,
  Expect<Equal<IsNegativeNumber<-100_000_000>, true>>,
  Expect<Equal<IsNegativeNumber<1>, false>>,
  Expect<Equal<IsNegativeNumber<1.9>, false>>,
  Expect<Equal<IsNegativeNumber<100_000_000>, false>>
];

// ============= Your Code Here =============
type IsUnion<T, U extends T = T> = [T] extends [never]
  ? false
  : T extends unknown
  ? [U] extends [T]
    ? false
    : true
  : false;
type IsNegativeNumber<T extends number> = number extends T
  ? never
  : IsUnion<T> extends true
  ? never
  : `${T}` extends `-${string}`
  ? true
  : false;
