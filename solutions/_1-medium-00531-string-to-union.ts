// Use recursion to split apart the string
// Then reconstruct as a union
type StringToUnion<T extends string> =
  T extends `${infer Car}${infer Cdr}`
    ? Car | StringToUnion<Cdr>
    : never 

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<StringToUnion<''>, never>>,
  Expect<Equal<StringToUnion<'t'>, 't'>>,
  Expect<Equal<StringToUnion<'hello'>, 'h' | 'e' | 'l' | 'l' | 'o'>>,
  Expect<Equal<StringToUnion<'coronavirus'>, 'c' | 'o' | 'r' | 'o' | 'n' | 'a' | 'v' | 'i' | 'r' | 'u' | 's'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/531/answer
  > View solutions: https://tsch.js.org/531/solutions
  > More Challenges: https://tsch.js.org
*/
