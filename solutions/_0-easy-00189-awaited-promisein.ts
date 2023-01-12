// Infer the inner type as U
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer U> 
  // Is U a PromiseLike of unknown
  ? U extends PromiseLike<unknown>
    // Yes, recursively call MyAwaited on U 
    ? MyAwaited<U>
    // No, U is not a PromiseLike. Return U                 
    : U
  // T is not a PromiseLike. Return never. Type error                            
  : never                           

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>
type T = { then: (onfulfilled: (arg: number) => any) => any }

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
  Expect<Equal<MyAwaited<T>, number>>,
]

// @ts-expect-error
type error = MyAwaited<number>

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/189/answer
  > View solutions: https://tsch.js.org/189/solutions
  > More Challenges: https://tsch.js.org
*/
