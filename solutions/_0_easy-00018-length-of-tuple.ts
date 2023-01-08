// extends readonly unknown[] - constrains to tuples *not* array
// T.length does not work. Y is a type not an instance of tuple
// T["length"] works. 
type Length<T extends readonly unknown[]> = T['length']

// Tuples/arrays are ultimately just objects in js. 
// So abuse tuple/array's object's length prop and infer to get tuple's length  
type Length1<T extends readonly unknown[]> = 
  T extends { length: infer L }
    ? L
    : never

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
const spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<'hello world'>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/18/answer
  > View solutions: https://tsch.js.org/18/solutions
  > More Challenges: https://tsch.js.org
*/
