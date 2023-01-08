// Variation on concat challenge
type Push<T extends unknown[], U> = [...T, U]

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Push<[], 1>, [1]>>,
  Expect<Equal<Push<[1, 2], '3'>, [1, 2, '3']>>,
  Expect<Equal<Push<['1', 2, '3'], boolean>, ['1', 2, '3', boolean]>>,
]

// @ts-expect-error
type error = Push<1, 1>

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3057/answer
  > View solutions: https://tsch.js.org/3057/solutions
  > More Challenges: https://tsch.js.org
*/
