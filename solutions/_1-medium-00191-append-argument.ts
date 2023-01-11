type AppendArgument<Fn extends Function, A> =
  // P is the function parameter(s) type (ArrayLike) and R is the return type
  Fn extends (...args: infer P) => infer R
    // Construct new type with A appended to P spread into new function parameter array 
    ? (...args: [...P, A]) => R 
    : Fn

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>
type Result1 = (a: number, b: string, x: boolean) => number

type Case2 = AppendArgument<() => void, undefined>
type Result2 = (x: undefined) => void

type cases = [
  Expect<Equal<Case1, Result1>>,
  Expect<Equal<Case2, Result2>>,
  // @ts-expect-error
  AppendArgument<unknown, undefined>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/191/answer
  > View solutions: https://tsch.js.org/191/solutions
  > More Challenges: https://tsch.js.org
*/
