// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<
    Equal<
      Parse<`
      {
        "a": "b", 
        "b": false, 
        "c": [true, false, "hello", {
          "a": "b", 
          "b": false
        }], 
        "nil": null
      }
    `>,
      {
        nil: null;
        c: [
          true,
          false,
          "hello",
          {
            a: "b";
            b: false;
          }
        ];
        b: false;
        a: "b";
      }
    >
  >,
  Expect<Equal<Parse<"{}">, {}>>,

  Expect<Equal<Parse<"[]">, []>>,

  Expect<Equal<Parse<"[1]">, never>>,

  Expect<Equal<Parse<"true">, true>>,

  Expect<
    Equal<Parse<'["Hello", true, false, null]'>, ["Hello", true, false, null]>
  >,

  Expect<
    Equal<
      Parse<`
      {
        "hello\\r\\n\\b\\f": "world"
      }`>,
      {
        "hello\r\n\b\f": "world";
      }
    >
  >,

  Expect<Equal<Parse<'{ 1: "world" }'>, never>>,

  Expect<
    Equal<
      Parse<`{ "hello
  
  world": 123 }`>,
      never
    >
  >
];

// ============= Your Code Here =============
type Pure<T> = {
  [P in keyof T]: T[P] extends object ? Pure<T[P]> : T[P];
};

type SetProperty<T, K extends PropertyKey, V> = {
  [P in keyof T | K]: P extends K ? V : P extends keyof T ? T[P] : never;
};

type StaticToken = "{" | "}" | ":" | "," | "[" | "]";
type Token = StaticToken | "true" | "false" | "null" | { string: string };

type StaticValues = { true: true; false: false; null: null };

type SkipWhitespace<S extends string> = S extends `${
  | " "
  | "\n"
  | "\r"
  | "\t"}${infer Rest}`
  ? SkipWhitespace<Rest>
  : S;
type Escapes = {
  n: "\n";
  r: "\r";
  b: "\b";
  f: "\f";
};
type Unescape<S extends string> =
  S extends `${infer Prefix}\\${infer E extends keyof Escapes}${infer Suffix}`
    ? `${Prefix}${Escapes[E]}${Unescape<Suffix>}`
    : S;

type CollectString<
  S extends string,
  T extends Token[]
> = S extends `${infer Literal}"${infer Rest}`
  ? Tokenize<Rest, [...T, { string: Unescape<Literal> }]>
  : never;

type ParseObject<R, T extends Token[]> = T extends [
  "}",
  ...infer AfterDirectCloseRest
]
  ? [R, AfterDirectCloseRest]
  : T extends [
      infer P extends { string: string },
      ":",
      ...infer ObjectValueRest extends Token[]
    ]
  ? ParseResult<{}, ObjectValueRest> extends [
      infer V,
      infer AfterValueRest extends [] | Token[]
    ]
    ? AfterValueRest extends [",", ...infer ObjectRest extends Token[]]
      ? ParseObject<SetProperty<R, P["string"], V>, ObjectRest>
      : AfterValueRest extends ["}", ...infer AfterObjectRest]
      ? [SetProperty<R, P["string"], V>, AfterObjectRest]
      : never
    : never
  : never;

type ParseArray<R extends any[], T extends Token[]> = T extends [
  "]",
  ...infer AfterDirectCloseRest
]
  ? [R, AfterDirectCloseRest]
  : ParseResult<any, T> extends [infer V, infer ArrayRest]
  ? ArrayRest extends [",", ...infer ArrayRestCntd extends Token[]]
    ? ParseArray<[...R, V], ArrayRestCntd>
    : ArrayRest extends ["]", ...infer AfterArrayRest]
    ? [[...R, V], AfterArrayRest]
    : never
  : never;

type ParseResult<T, K extends Token[]> = K extends []
  ? [T, []]
  : K extends [
      infer CurrentToken extends Token,
      ...infer RestTokens extends Token[]
    ]
  ? CurrentToken extends keyof StaticValues
    ? [StaticValues[CurrentToken], RestTokens]
    : CurrentToken extends { string: infer S }
    ? [S, RestTokens]
    : CurrentToken extends "["
    ? ParseArray<[], RestTokens>
    : CurrentToken extends "{"
    ? ParseObject<{}, RestTokens>
    : never
  : never;

type Tokenize<
  T extends string,
  S extends Token[] = []
> = SkipWhitespace<T> extends ""
  ? S
  : SkipWhitespace<T> extends `true${infer Rest}`
  ? Tokenize<Rest, [...S, "true"]>
  : SkipWhitespace<T> extends `false${infer Rest}`
  ? Tokenize<Rest, [...S, "false"]>
  : SkipWhitespace<T> extends `null${infer Rest}`
  ? Tokenize<Rest, [...S, "null"]>
  : SkipWhitespace<T> extends `${infer Static extends StaticToken}${infer Rest}`
  ? Tokenize<Rest, [...S, Static]>
  : SkipWhitespace<T> extends `"${infer Rest}`
  ? CollectString<Rest, S>
  : never;

type ParseLiteral<T extends Token[]> = ParseResult<{}, T>;

type Parse<T extends string> = Pure<ParseLiteral<Tokenize<T>>[0]>;
