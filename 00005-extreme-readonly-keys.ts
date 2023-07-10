// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<"title", GetReadonlyKeys<Todo1>>>,
  Expect<Equal<"title" | "description", GetReadonlyKeys<Todo2>>>
];

interface Todo1 {
  readonly title: string;
  description: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  readonly description: string;
  completed?: boolean;
}

// ============= Your Code Here =============
type IsReadonly<T, K extends keyof T> = Equal<Pick<T, K>, Readonly<Pick<T, K>>>;
type GetReadonly<T> = {
  [K in keyof T as true extends IsReadonly<T, K> ? K : never]: T[K];
};
type GetReadonlyKeys<T> = keyof GetReadonly<T>;
