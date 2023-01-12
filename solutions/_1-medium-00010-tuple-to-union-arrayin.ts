// infer and rest operator to infer Car of tuple and Cdr of tuple.
// Use recursion to create union
type TupleToUnion<T extends unknown[]> = T extends readonly [infer Car, ...infer Cdr]
  ? Car | TupleToUnion<Cdr>
  : never

// Too clever solution for me
type TupleToUnion01<T extends unknown[]> = T[number]

type TupleToUnionBroken<T extends unknown[]> = T[0]

type T1 = TupleToUnion<[123, '456', true]>

// This also works because of index signatures because ArrayLike is defined as
interface MyArrayLike<T> {
  length: number;
  [key: number]: T; // Only key of type number allowed with value of type T 
}

// T[0] gets the value at key index 0
// T[number] gets a union of all values for each key index!
// https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures

// Keys can only be string | number | symbol
// In this case, we've limited the key Key of MyArrayLike to number only
// Therefore T[number] returns the value of the key in a union

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/10/answer
  > View solutions: https://tsch.js.org/10/solutions
  > More Challenges: https://tsch.js.org
*/
