// Similar to First except we can destructure array to rest of first and Last. 
// We don't use rest of first so assign to discard type variable
type Last<T extends unknown[]> = T extends [...infer _, infer Last] ? Last : never

type A = Last<[3, 2, 1]>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/15/answer
  > View solutions: https://tsch.js.org/15/solutions
  > More Challenges: https://tsch.js.org
*/
