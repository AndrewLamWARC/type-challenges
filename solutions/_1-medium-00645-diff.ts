// Intersect all props whose key is in A but not in B
// with all props whose key is in B but not in A
// Collapse/flatten the intersection
type Diff<A, B> = Collapse<{
  // Get all props whose key is in A but not in B
  [K in keyof A as K extends keyof B ? never : K]: A[K]
} & {
  // Get all props whose key is in B but not in A
  [K in keyof B as K extends keyof A ? never : K]: B[K]
}>

type Collapse<T extends { [k: string]: unknown }> = {
  [K in keyof T]: T[K]
}

// Union of keys in A and B exclude/minus/except intersection of keys in A and B
type Diff01<A, B> = {
  [P in Exclude<keyof (A & B), keyof (A | B)>]: (A & B)[P];
};

// Foo is smaller than Bar. Foo is not assignable to Bar
type A1 = Foo extends Bar
  ? 'Foo extends Bar'
  : 'Foo does not extend Bar'

// Bar is bigger than Foo. Bar is assignable to Foo
type A2 = Bar extends Foo
  ? 'Bar extends Foo'
  : 'Bar does not extend Foo'

function takesBar(b: Bar) {}
const a: Foo = { name: 'Andy', age: 20 }
// @ts-expect-error
takesBar(a) // Error I was expecting Bar but you passed Foo which is not assignable to Bar

function takesFoo(f: Foo) {}
const b: Bar = { name: 'Andy', age: 20, gender: 'M' }
takesFoo(b) // OK, Bar is assignable to Foo 

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'
type Gender = 'F' | 'M'
type Foo = {
  name: string
  age: number
}
type Bar = {
  name: string
  age: number
  gender: Gender
}
type Coo = {
  name: string
  gender: Gender
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: Gender }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: Gender }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: number; gender: Gender }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: number; gender: Gender }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/645/answer
  > View solutions: https://tsch.js.org/645/solutions
  > More Challenges: https://tsch.js.org
*/
