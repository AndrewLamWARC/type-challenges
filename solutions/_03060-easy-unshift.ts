type Unshift<T extends unknown[], U> = [U, ...T]

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Unshift<[], 1>, [1]>>,
  Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
  Expect<Equal<Unshift<['1', 2, '3'], boolean>, [boolean, '1', 2, '3']>>,
]

// @ts-expect-error
type error = Unshift<1, 1>

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3060/answer
  > View solutions: https://tsch.js.org/3060/solutions
  > More Challenges: https://tsch.js.org
*/
