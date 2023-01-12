type FalseArray = []
type FalseObject = { [P in any]: never }
type FalseNumber = 0
type FalseString = ''
type Falsy = FalseNumber | FalseString | FalseArray | FalseObject | false | undefined | null

type AllOf<T extends readonly any[], O = T> =
  // Infer head of array into Car and rest of array into Cdr
  T extends [infer Car, ...infer Cdr]
    ? Car extends Falsy
      // Car is false, continue recursion to check Cdr
      ? false
      // Car is true. Entire expression collapses to true 
      : AllOf<Cdr, O>
    // Empty array so either base case of recursion or original T is empty array
    : O extends FalseArray
      ? false
      : true

type A1 = AllOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>

export type Equals<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<AllOf<[1, 'test', true, [1], { name: 'test' }, { 1: 'test' }]>, true>>,
  Expect<Equal<AllOf<[1, '', false, [], {}]>, false>>,
  Expect<Equal<AllOf<[0, 'test', false, [], {}]>, false>>,
  Expect<Equal<AllOf<[0, '', true, [], {}]>, false>>,
  Expect<Equal<AllOf<[0, '', false, [1], {}]>, false>>,
  Expect<Equal<AllOf<[0, '', false, [], { name: 'test' }]>, false>>,
  Expect<Equal<AllOf<[0, '', false, [], { 1: 'test' }]>, false>>,
  Expect<Equal<AllOf<[0, '', false, [], { name: 'test' }, { 1: 'test' }]>, false>>,
  Expect<Equal<AllOf<[0, '', false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AllOf<[]>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/949/answer
  > View solutions: https://tsch.js.org/949/solutions
  > More Challenges: https://tsch.js.org
*/
