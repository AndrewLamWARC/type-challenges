// Record<PropertyKey, unknown> is a synonym for object test
type Merge<
  F extends Record<PropertyKey, unknown>, 
  S extends Record<PropertyKey, unknown>> = {
  
  [K in keyof F | keyof S] :
    K extends keyof S
      ? S[K]
      : F[K]
}

// Introduce O into the type as an intersection of F and S types
type Merge01<F, S, O = F & S> = { 
  [K in keyof O]: 
    K extends keyof S 
      ? S[K]
      // O is an intersection of F and S. We know here, K is not key of S 
      // therefore we can get the value from F using O[K] 
      : O[K] 
}

type A1 = Merge<Foo, Bar>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/599/answer
  > View solutions: https://tsch.js.org/599/solutions
  > More Challenges: https://tsch.js.org
*/
