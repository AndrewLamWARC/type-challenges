// Good explanation
// https://github.com/type-challenges/type-challenges/issues/614

// More reasonable to me
type Permutation<T, C = T> =
  // Check source type T is not empty. Stop distributivity with square brackets
  // https://github.com/microsoft/TypeScript/issues/23182 
  [T] extends [never] 
    ? []
    // Don't care about type, care about distribution over union. For-loop for type unions 
    : C extends C
      // Exclude current type from source union
      ? [C, ...Permutation<Exclude<T, C>>]
      : never

type Permutation01<T, C = T> =
  // Check source type T is not empty. Stop distributivity with square brackets.
  // https://github.com/microsoft/TypeScript/issues/23182 
  [T] extends [never] 
    ? []
    // Don't care about type, distribute over union 
    : T extends unknown
      // Exclude current type from source union
      ? [T, ...Permutation<Exclude<C, T>>]
      : [] 
     
type A1 = Permutation<'A' | 'B' | 'C'> 

type H<T> = T extends never ? [] : [T]
type X1 = H<'A'>
type X2 = H<'A' | 'B' | 'C'>


// Understanding distributive nature of conditional types
type ToArray<T> = T extends any ? T[] : never
// The [] is distributed over both string or number
type StringArrayOrNumberArray = ToArray<string | number> // string[] | number[]
// Distribution broken down step by step 
// (string extends any ? string[] : never) | (number extends any ? number[] : never)
// string extends any is true and number extends any is also true
// Therefore reduces to
// (string[]) | (number[])
// Which reduces to
// string[] | number[]

// To disable distributivity, surround conditional types with square brackets
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never
//                        ^           ^
// The [] is no longer distributed over both string or number
type StringOrNumberArray = ToArrayNonDist<string | number> // (string | number)[]  

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Permutation<'A'>, ['A']>>,
  Expect<Equal<Permutation<'A' | 'B' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<'B' | 'A' | 'C'>, ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']>>,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/296/answer
  > View solutions: https://tsch.js.org/296/solutions
  > More Challenges: https://tsch.js.org
*/
