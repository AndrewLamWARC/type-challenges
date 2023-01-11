// Add type param T
// Constrain T to array of unknowns
// Add test for type error
// Attempt 1 return T itself. Passes first 2 tests. Fails nested array tests
// Attempt 2. Use recursion to process each item in array T
type Flatten<T extends unknown[], U extends unknown[] = [] > =
  // infer Car and Cdr from T
  T extends [infer Car, ...infer Cdr]
    ? Car extends unknown[]
      // Car is array. Flatten Car and store spread Car in U. Then do same to Cdr
      ? [...Flatten<Car, [...U, ...Car]>, ...Flatten<Cdr, [...U, ...Car]>]
      // Car is not array. Add Car to array and flatten Cdr with Car stored in U
      : [Car, ...Flatten<Cdr, [...U, Car]>]
    : [] 

type A1 = Flatten<[1, 2, 3, 4]>
type A2 = Flatten<[1, [2]]>
type A3 = Flatten<[1, 2, [3, 4], [[[5]]]]>

// @ts-expect-error
type error = Flatten<null>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<Equal<Flatten<[{ foo: 'bar'; 2: 10 }, 'foobar']>, [{ foo: 'bar'; 2: 10 }, 'foobar']>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/459/answer
  > View solutions: https://tsch.js.org/459/solutions
  > More Challenges: https://tsch.js.org
*/
