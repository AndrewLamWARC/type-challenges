// T extends [...infer AllButLast, infer _] Conditional type to infer all but last elements in array. 
// If it can infer then return AllButLast
// Else it is an empty array so return empty array
type Pop<T extends any[]> = T extends [...infer AllButLast, infer _] ? AllButLast : []

type T1 = [3, 2, 1]
type T2 = ["a", "b", "c", "d"]
type T3 = []

type D1 = Pop<T1>
type D2 = Pop<T2>
type D3 = Pop<T3>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<["a", "b", "c", "d"]>, ["a", "b", "c"]>>,
  Expect<Equal<Pop<[]>, []>>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/16/answer
  > View solutions: https://tsch.js.org/16/solutions
  > More Challenges: https://tsch.js.org
*/
