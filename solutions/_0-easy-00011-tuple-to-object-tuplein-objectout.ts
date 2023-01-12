// Built in PropertyKey type is string | number | symbol. Union of all valid ts property types
// "as const" in context of tuples in ts handbook
type TupleToObject<T extends readonly PropertyKey[]> = {
  [U in T[number]]: U
}

type TupleToObject01<T extends readonly (string | number | symbol)[]> = {
  [U in T[number]]: U
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

const tuple = ["tesla", "model 3", "model X", "model Y"] as const // As const tells us this is not just an array of strings but a tuple of strings
type Tuple = typeof tuple
type ExpectedTuple = { tesla: "tesla"; "model 3": "model 3"; "model X": "model X"; "model Y": "model Y" }

const tupleNumber = [1, 2, 3, 4] as const
type TupleNumber = typeof tupleNumber
type ExpectedTupleNumber = { 1: 1; 2: 2; 3: 3; 4: 4 }

const tupleMix = [1, "2", 3, "4"] as const
type TupleMix = typeof tupleMix
type ExpectedTupleMix = { 1: 1; "2": "2"; 3: 3; "4": "4" }

type cases = [
  Expect<Equal<TupleToObject<Tuple>, ExpectedTuple>>,
  Expect<Equal<TupleToObject<TupleNumber>, ExpectedTupleNumber>>,
  Expect<Equal<TupleToObject<TupleMix>, ExpectedTupleMix>>
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/11/answer
  > View solutions: https://tsch.js.org/11/solutions
  > More Challenges: https://tsch.js.org
*/
