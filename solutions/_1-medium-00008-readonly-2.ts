// 2 new type techniques
// K extends keyof T = keyof T. Optional K type defauts to keyof T
// & intersection to create readonly props and props T minus/exclude K which should just be copied. 
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [U in K]: T[U] // Deal with readonly props
} & {
  [U in Exclude<keyof T, K>]: T[U] // We use builtin utility type Exclude here but could also use MyExclude
}
type A = MyReadonly2<Todo1>

/* _____________ Test Cases _____________ */
import type { Alike, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
]

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>

interface Todo1 {
  title: string
  description?: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  description?: string
  completed: boolean
}

interface Expected {
  readonly title: string
  readonly description?: string
  completed: boolean
}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/8/answer
  > View solutions: https://tsch.js.org/8/solutions
  > More Challenges: https://tsch.js.org
*/
