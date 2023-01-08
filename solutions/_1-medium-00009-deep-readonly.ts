// Everything needs to be made readonly. Sub objects need to be recursively made readonly 
// We use a conditional type to set each function value to readonly. 
type DeepReadonly<T> = {
  readonly [U in keyof T]: T[U] extends Function | Primitive
    ? T[U] // Special treatment for Function and Primitive types
    : DeepReadonly<T[U]> // Recursion 
}

// This works too. Although I don't fully understnd why primitive types are handled breaking recursion
type DeepReadonly01<T> = {
  readonly [U in keyof T]: T[U] extends Function
    ? T[U] // Special treatment for Function 
    : DeepReadonly<T[U]> // Recursion 
}

type E1 = DeepReadonly<X1> 

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'
import { Primitive } from 'utility-types'

type cases = [
  Expect<Equal<DeepReadonly<X1>, Expected1>>,
  Expect<Equal<DeepReadonly<X2>, Expected2>>,
]

type X1 = {
  a: () => 22
  b: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type X2 = { a: string } | { b: number }

type Expected1 = {
  readonly a: () => 22
  readonly b: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}

type Expected2 = { readonly a: string } | { readonly b: number }

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9/answer
  > View solutions: https://tsch.js.org/9/solutions
  > More Challenges: https://tsch.js.org
*/
