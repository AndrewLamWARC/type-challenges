// This is a very useful type for sum types or discriminated union types.
// Where 'type' key is the discriminator in this case.

// Constrain U to objects containing a property where key is 'type' and value is unknown/string
// Constrain T to the value of the 'type' property
// If U extends object containing object with 'type' property where value is T
// Then return U
// Else return never
// Note that Conditional Types in TypeScript are distributive. So that each item from the union is going to be checked against our condition.
type LookUp<U extends {type: unknown}, T extends U['type']> = 
  U extends { type: T } 
    ? U 
    : never

// The following type also works without generic constraints
// However, the builtin @ts-expect-error does not error if U does not have a 'type' property.
type LookUp01<U, T> = 
  U extends { type: T } 
    ? U 
    : never    

type D1 = LookUp<Animal, 'dog'>
type D2 = LookUp<Animal, 'cat'>

// @ts-expect-error
type error = LookUp<Shape, 'square'> // Expect an error because Shape does not contain a 'type' property

interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}
type Shape = Square | Rectangle;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type Animal = Cat | Dog

type cases = [
  Expect<Equal<LookUp<Animal, 'dog'>, Dog>>,
  Expect<Equal<LookUp<Animal, 'cat'>, Cat>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/62/answer
  > View solutions: https://tsch.js.org/62/solutions
  > More Challenges: https://tsch.js.org
*/
