type FalseArray = []
type FalseObject = { [P in any]: never }
type FalseNumber = 0
type FalseString = ''
type Falsy = FalseNumber | FalseString | FalseArray | FalseObject | false | undefined | null
type AnyOf<T extends readonly any[]> =
  // Infer head of array into Car and rest of array into Cdr
  T extends [infer Car, ...infer Cdr]
    ? Car extends Falsy
      // Car is false, continue recursion to check Cdr
      ? AnyOf<Cdr>
      // Car is true. Entire expression collapses to true 
      : true
    // Base case or entire array checked therefore false
    : false 

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<AnyOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[1, '', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, 'test', false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AnyOf<[0, '', false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/949/answer
  > View solutions: https://tsch.js.org/949/solutions
  > More Challenges: https://tsch.js.org
*/
