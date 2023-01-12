type IsUnion<T, C = T> =
  // Check source type T is not empty
  [T] extends [never]
    ? false
    // Dont care about type, interested in distribution over union
    : T extends T
      // Disable distribution and compare against original copy of type
      ? [C] extends [T]
        ? false
        : true
      : never

// Why does camparing distributed union against non distributed union work?
// Given T = string | number
// [T] = [string] | [number] // union of tuples
// [C] = [string | number]   // tuple of union
// Therefore [C] != [T]

// Given T = string
// [T] = [string]
// [C] = [string]

type U2I<U> = 
  (U extends any 
    ? (u: U) => any 
    : never) extends (i: infer I) => any 
      ? I 
      : never;
type Last<U> = 
  U2I<U extends any 
    ? () => U 
    : never> extends () => infer R 
      ? R 
      : never;
type ToTuple<U> = 
  [U] extends [never] 
    ? [] 
    : [Last<U>, ...ToTuple<Exclude<U, Last<U>>>];
type IsUnion01<U, Count = ToTuple<U>['length']> = Count extends 0 ? false : Count extends 1 ? false : true;

// Relies on union types reduces to boolean
// Non union reduces to true and not boolean
// Naked Type, Generic Type, Checked Type knowledge™️: https://stackoverflow.com/questions/55382306/typescript-distributive-conditional-types
// Conditional Distributive types: typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#distributive-conditional-types
type IsNotUnion<T, P = T> = T extends infer Union // infer Union will have the Naked Type (after distribution)
  ? P extends Union // P is the union without distribution 
    ? true // 1.
    : false // 2. These two conditions will end up merging in a union after distribution
    // Ex. IsNotUnion<1 | 2 | 3> will distribute like this on the first extend condition
    // (1 | 2 | 3 extends 1) | (1 | 2 | 3 extends 2) | (1 | 2 | 3 extends 3) 
    // and then distribute again on the second extend condition
    // 1 extends 1 | 2 extends 1 | 3 extends 1 | 1 extends 2 | 2 extends 2 | 3 extends 2 | 1 extends 3 | 2 extends 3 | 3 extends 3
    // as you can see, after these distributions, some of them will condense to `true | false`, which in turn converts to `boolean` in cases where it is an union 
  : never // This should never happen?

type IsUnion02<T> = IsNotUnion<T> extends true ? false : true 
// in cases where it is not a union (a single element), it all the distributions will condense to true instead of boolean

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
  Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | 'a'>, false>>,
  Expect<Equal<IsUnion<never>, false>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1097/answer
  > View solutions: https://tsch.js.org/1097/solutions
  > More Challenges: https://tsch.js.org
*/
