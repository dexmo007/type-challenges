// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<KebabCase<"FooBarBaz">, "foo-bar-baz">>,
  Expect<Equal<KebabCase<"fooBarBaz">, "foo-bar-baz">>,
  Expect<Equal<KebabCase<"foo-bar">, "foo-bar">>,
  Expect<Equal<KebabCase<"foo_bar">, "foo_bar">>,
  Expect<Equal<KebabCase<"Foo-Bar">, "foo--bar">>,
  Expect<Equal<KebabCase<"ABC">, "a-b-c">>,
  Expect<Equal<KebabCase<"-">, "-">>,
  Expect<Equal<KebabCase<"">, "">>,
  Expect<Equal<KebabCase<"😎">, "😎">>
];

// ============= Your Code Here =============
type IsUppercase<S extends string> = S extends Uppercase<infer _>
  ? Lowercase<S> extends S
    ? false
    : true
  : false;

type KebabCase<S extends string> = S extends `${infer P}${infer H}${infer T}`
  ? IsUppercase<H> extends true
    ? `${Lowercase<P>}-${KebabCase<`${H}${T}`>}`
    : `${Lowercase<P>}${KebabCase<`${H}${T}`>}`
  : Lowercase<S>;
