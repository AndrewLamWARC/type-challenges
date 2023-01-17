type Curry<F extends (...args: any) => any> =
  Parameters<F> extends [infer First, infer Second, ...infer Rest]
    // Curried form
    ? (a1: First) => (Curry<(...args: [Second, ...Rest]) => ReturnType<F>>)
    : F
    
declare function curry<Fn>(fn: Fn): Fn extends (...args: any) => any   
  ? Curry<Fn> 
  : Fn

type Curry01<F extends Function> = 
  F extends (first: infer First, ...remaining: infer Rest) => infer Ret
    ? Rest['length'] extends 0
      ? F
      : (a1: First) => Curry01<(...args: Rest) => Ret>
    : never

declare function curry01<F extends Function>(fn: F): Curry01<F>

/* _____________ Test Cases _____________ */
import type { Equal, Expect, ExpectExtends } from '@type-challenges/utils'
const curried1 = curry((a: string, b: number, c: boolean) => true)
const curried2 = curry((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)
const curried3 = curry(() => true)

type cases = [
  Expect<Equal<
    typeof curried1, (a: string) => (b: number) => (c: boolean) => true
  >>,
  Expect<Equal<
    typeof curried2, (a: string) => (b: number) => (c: boolean) => (d: boolean) => (e: boolean) => (f: string) => (g: boolean) => true
  >>,
  Expect<Equal<typeof curried3, () => true>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/17/answer
  > View solutions: https://tsch.js.org/17/solutions
  > More Challenges: https://tsch.js.org
*/
