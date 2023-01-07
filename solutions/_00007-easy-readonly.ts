/* _____________ Your Code Here _____________ */

// See readonly modifier in ts handbook
type MyReadonly<T> = {
  readonly [U in keyof T] : T[U]
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar",
  completed: true,
  meta: {
    author: "Andy"
  }
}

// @ts-expect-error
todo.title = "Hello" // Error: cannot reassign a readonly property
// @ts-expect-error
todo.description = "barFoo" // Error: cannot reassign a readonly property

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyReadonly<Todo>, Readonly<Todo>>>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/7/answer
  > View solutions: https://tsch.js.org/7/solutions
  > More Challenges: https://tsch.js.org
*/
