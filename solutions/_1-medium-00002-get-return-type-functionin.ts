// extends Function constrains T to a function type
// (...args: any) => infer R : use expanded form of function type with infer to infer type of function return type
type MyReturnType<T extends Function> = 
  T extends (...args: any) => infer R 
    ? R 
    : never

// This does not work as you can pass non-function type as T
type MyReturnType1<T> = 
  T extends (...args: any) => infer R 
    ? R 
    : never

// This may be arguably more correct since the args is an array of any
type MyReturnType2<T extends Function> = 
  T extends (...args: any[]) => infer R 
    ? R 
    : never
  
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "@type-challenges/utils"

type cases = [
  Expect<Equal<string, MyReturnType<() => string>>>,
  Expect<Equal<123, MyReturnType<() => 123>>>,
  Expect<Equal<ComplexObject, MyReturnType<() => ComplexObject>>>,
  Expect<Equal<Promise<boolean>, MyReturnType<() => Promise<boolean>>>>,
  Expect<Equal<() => "foo", MyReturnType<() => () => "foo">>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn>>>,
  Expect<Equal<1 | 2, MyReturnType<typeof fn1>>>,

  // @ts-expect-error
  MyReturnType<{}>,
  // @ts-expect-error
  MyReturnType<[]>
]

type ComplexObject = {
  a: [12, "foo"]
  bar: "hello"
  prev(): number
}

const fn = (v: boolean) => (v ? 1 : 2)
const fn1 = (v: boolean, w: any) => (v ? 1 : 2)

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2/answer
  > View solutions: https://tsch.js.org/2/solutions
  > More Challenges: https://tsch.js.org
*/
