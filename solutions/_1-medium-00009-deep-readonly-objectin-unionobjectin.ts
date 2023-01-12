// Everything needs to be made readonly. Sub objects need to be recursively made readonly 
// We use a conditional type to set each function value to readonly. 
type DeepReadonly<T> = {
  readonly [U in keyof T]: T[U] extends Function | Primitive
    ? T[U] // Special treatment for Function and Primitive types
    : DeepReadonly<T[U]> // Recursion 
}

// This works too.
// Reason primitives are handled breaking recursion:
// Mapped types already "skip" primitives by returning the input, and they automatically distribute over union, so you don't need to check for these yourself:
type DeepReadonly01<T> = {
  readonly [U in keyof T]: T[U] extends Function
    ? T[U] // Special treatment for Function 
    : DeepReadonly<T[U]> // Recursion 
}

// This should work but does not
// https://www.reddit.com/r/typescript/comments/tq3m4f/the_difference_between_object_and_recordstring/
type DeepReadonly02<T> = {
  readonly [U in keyof T]: T[U] extends Record<PropertyKey, unknown>
    ? DeepReadonly<T[U]> // Recursion for objects 
    : T[U] // Everything else 
}

// Elegant but fails second test case
// Why it fails: https://stackoverflow.com/questions/68693054/what-is-extends-never-used-for/68693367#68693367
type DeepReadonly03<T> = keyof T extends never
  ? T
  : { 
      readonly [k in keyof T]: DeepReadonly<T[k]> 
    };

type E1 = DeepReadonly<X1>
type E2 = DeepReadonly<X2> 

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
