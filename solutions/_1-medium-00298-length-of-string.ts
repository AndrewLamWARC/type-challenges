// Convert string into tuple of characters. Store accumulated chars in type.
// Then take length of tuple
type LengthOfString<S extends string, Accumulate extends string[] = []> =
  // Recursion stops when enire string consumed
  S extends `${infer Car}${infer Cdr}`
    ? LengthOfString<Cdr, [Car, ...Accumulate]>   
    : Accumulate['length']

type A1 = LengthOfString<''>

// 2 step process
// Convert string to tuple in order to get length
type StringToTuple<S extends string> = 
  S extends `${infer _}${infer Cdr}` 
    ? [S, ...StringToTuple<Cdr>] 
    : []
type LengthOfString01<S extends string> = StringToTuple<S>['length']

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/298/answer
  > View solutions: https://tsch.js.org/298/solutions
  > More Challenges: https://tsch.js.org
*/
