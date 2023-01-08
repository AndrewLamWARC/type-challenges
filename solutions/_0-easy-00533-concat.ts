// Generic type constraint to array of unknown types
// Spread both arrays into single array
type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U]

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Concat<[], []>, []>>,
  Expect<Equal<Concat<[], [1]>, [1]>>,
  Expect<Equal<Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Concat<['1', 2, '3'], [false, boolean, '4']>, ['1', 2, '3', false, boolean, '4']>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/533/answer
  > View solutions: https://tsch.js.org/533/solutions
  > More Challenges: https://tsch.js.org
*/
