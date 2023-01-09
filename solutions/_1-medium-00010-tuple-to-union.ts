// infer and rest operator to infer Car of tuple and Cdr of tuple.
// Use recursion to create union
type TupleToUnion<T extends unknown[]> = T extends readonly [infer Car, ...infer Cdr]
  ? Car | TupleToUnion<Cdr>
  : never

// Too clever solution for me
type TupleToUnion01<T extends unknown[]> = T[number]

// This also works because of index signatures because ArrayLike is defined as
interface MyArrayLike<T> {
  length: number;
  [key: number]: T;
}
// Therefore T[number] gets a union of all number index keys!
// https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures

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
