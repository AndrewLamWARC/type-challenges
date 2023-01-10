// Leverage template literal strings to infer string containing leading whitespaces
// Recursion to trim all leading whitespace. Break recursion on no whitespaces 
type Whitespace = " " | "\n" | "\t"
type TrimLeft<S extends string> = 
  S extends `${Whitespace}${infer V}` 
    ? TrimLeft<V> 
    : S 

type A1 = TrimLeft<'str'>
type A2 = TrimLeft<' str'>
type A3 = TrimLeft<'     str'> // need recursion
type A4 = TrimLeft<'     str     '> // trailing whitespace should be preserved
type A5 = TrimLeft<'   \n\t foo bar '> // \n | \t also considered whitespace
type A6 = TrimLeft<''> // handle empty string
type A7 = TrimLeft<' \n\t'> // handle string containing all whitespace
  
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/106/answer
  > View solutions: https://tsch.js.org/106/solutions
  > More Challenges: https://tsch.js.org
*/
