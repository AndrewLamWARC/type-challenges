// Distributive conditional type based on type relationship test
// For example, an instantiation of T extends U ? X : Y with the type argument A | B | C for T
// is resolved as (A extends U ? X : Y) | (B extends U ? X : Y) | (C extends U ? X : Y)
// If T is assignable to U then never else T
type MyExclude<T, U> = 
  // Remove types from T that are assignable to U
  T extends U 
    ? never 
    : T 

type Result = MyExclude<"a" | "b" | "c", "a"> // 'b' | 'c'

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [
  Expect<Equal<MyExclude<"a" | "b" | "c", "a">, "b" | "c">>,
  Expect<Equal<MyExclude<"a" | "b" | "c", "a" | "b">, "c">>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/43/answer
  > View solutions: https://tsch.js.org/43/solutions
  > More Challenges: https://tsch.js.org
*/
