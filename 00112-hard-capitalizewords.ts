// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<CapitalizeWords<"foobar">, "Foobar">>,
  Expect<Equal<CapitalizeWords<"FOOBAR">, "FOOBAR">>,
  Expect<Equal<CapitalizeWords<"foo bar">, "Foo Bar">>,
  Expect<Equal<CapitalizeWords<"foo bar hello world">, "Foo Bar Hello World">>,
  Expect<Equal<CapitalizeWords<"foo bar.hello,world">, "Foo Bar.Hello,World">>,
  Expect<
    Equal<
      CapitalizeWords<"aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq">,
      "Aa!Bb@Cc#Dd$Ee%Ff^Gg&Hh*Ii(Jj)Kk_Ll+Mm{Nn}Oo|Pp🤣Qq"
    >
  >,
  Expect<Equal<CapitalizeWords<"">, "">>
];

// ============= Your Code Here =============
type Letters<S extends string = "abcdefghijklmnopqrstuvwyxzäöüß"> =
  S extends `${infer H}${infer T}` ? [H, Uppercase<H>, ...Letters<T>] : [];

type CapitalizeWords<S extends string, First = true> = First extends true
  ? S extends `${infer H}${infer T}`
    ? `${Uppercase<H>}${CapitalizeWords<T, false>}`
    : S
  : S extends `${infer H}${infer N}${infer T}`
  ? H extends Letters[number]
    ? `${H}${CapitalizeWords<`${N}${T}`, false>}`
    : `${H}${Uppercase<N>}${CapitalizeWords<
        T,
        Uppercase<N> extends Letters[number] ? false : true
      >}`
  : S;

// prettier-ignore
type test = CapitalizeWords<"aa!bb@cc#dd$ee%ff^gg&hh*ii(jj)kk_ll+mm{nn}oo|pp🤣qq">;
//   ^?

type test2 = "🤣" extends `${infer H}${infer T}` ? [H, T] : never;
//   ^?
