// Add 1 generic type to Chainable. U is the object type that Chainable type operates on. Defaults to {} empty object.
// Add 2 generic types to option prop. K for key and V for value
// Constrain K to only accept strings (PropertyKey)

// key: K extends keyof U ? never : K
// If K extends keyof U (key already passed) then never otherwise its still valid

// Chainable<Omit<U, K> & { [Key in K]: V }>
// Omit<U, K>
// Omit existing K from U (the original Chainable type)

// & { [Key in K]: V }
// Intersect mapped type of current object. Stores current state of key/value pair of props in the Chainable type itself!
type Chainable<U extends { [key: PropertyKey]: unknown} = {}> = {
  option<K extends PropertyKey, V>(key: K extends keyof U ? never : K, value: V): 
    Chainable<Omit<U, K> & { [Key in K]: V }>
  get(): U
}

// Very elegant and does not use type intersection
// But... does not detect that an option of same key has been called already
type Chainable01<O extends { [key: PropertyKey]: unknown} = {}> = {
  option<K extends PropertyKey, V>(key: K, value: V): Chainable01<{ [key in keyof O]: key extends keyof O ? O[key] : V }>
  get(): O
}

// Does not detect that an option of same key has been called already
type Chainable02<O = {}> = {
  option<K extends string, V>(key: K, value: V): Chainable02<O & { [P in K]: V }>;
  get(): O;
};

/* _____________ Test Cases _____________ */
import type { Alike, Expect } from '@type-challenges/utils'

declare const a: Chainable

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get()

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get()

const result3 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 123)
  .get()

// Return Chainable with all 
const partial2 = a
  .option('name', 'another name')

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>,
]

type Expected1 = {
  foo: number
  bar: {
    value: string
  }
  name: string
}

type Expected2 = {
  name: string
}

type Expected3 = {
  name: number
}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/12/answer
  > View solutions: https://tsch.js.org/12/solutions
  > More Challenges: https://tsch.js.org
*/
