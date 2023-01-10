// Recursion should work here
// First solution is cleaner. No need to store what was previously replaced before in the type
type ReplaceAll<S extends string, From extends string, To extends string> =
  From extends '' 
    ? S 
    : S extends `${infer Car}${From}${infer Cdr}`
      ? `${Car}${To}${ReplaceAll<Cdr, From, To>}`
      : S

type ReplaceAll01<S extends string, From extends string, To extends string, Before extends string = ""> = 
  From extends ""
    ? S
    : S extends `${Before}${infer Car}${From}${infer Cdr}`
      ? ReplaceAll01<`${Before}${Car}${To}${Cdr}`, From, To, `${Before}${Car}${To}`>
      : S

type A1 = ReplaceAll<'foobarbar', '', 'foo'>
type A2 = ReplaceAll<'foobarfoobar', 'ob', 'b'>
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobar', 'bag', 'foo'>, 'foobar'>>,
  Expect<Equal<ReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
  Expect<Equal<ReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
  Expect<Equal<ReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<ReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
  Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
  Expect<Equal<ReplaceAll<'', '', ''>, ''>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/119/answer
  > View solutions: https://tsch.js.org/119/solutions
  > More Challenges: https://tsch.js.org
*/
