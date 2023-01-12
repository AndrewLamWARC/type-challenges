import type { NonIndexKey } from './__helpers'

type RemoveIndexSignature<T> = {
  [K in keyof T as NonIndexKey<K>]: T[K]
}

// Note: index keys are a type.
// Normal keys are string literal or number literal or symbol
type A1 = keyof { 
  [key: number]: any;
  [name: symbol]: any; 
  bar(): void 
} // number | symbol | “bar”

type A2 = keyof { 
  [key: number]: any;
  1: string 
} // Oops, 1 | number but since 1 is in number, this reduces to just number 


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void; 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void; baz: string }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1367/answer
  > View solutions: https://tsch.js.org/1367/solutions
  > More Challenges: https://tsch.js.org
*/
