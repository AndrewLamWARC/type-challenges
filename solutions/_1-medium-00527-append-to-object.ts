type AppendToObject<T, U extends PropertyKey, V> = {
  // Union the new Key U to existing mapped keys of T  
  [K in keyof T | U]:
    // Does K extend existing key of T 
    K extends keyof T
      // Add existing value 
      ? T[K]
      // Add new value 
      : V
} 
type A1 = AppendToObject<test1, 'home', boolean>

// Attempt 1 doesn't work
type AppendToObject01<T, U extends PropertyKey, V> = {
  [K in keyof T]: T[K]
} & {
  U: V  
}

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type test1 = {
  key: 'cat'
  value: 'green'
}

type testExpect1 = {
  key: 'cat'
  value: 'green'
  home: boolean
}

type test2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
}

type testExpect2 = {
  key: 'dog' | undefined
  value: 'white'
  sun: true
  home: 1
}

type test3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
}

type testExpect3 = {
  key: 'cow'
  value: 'yellow'
  sun: false
  isMotherRussia: false | undefined
}

type cases = [
  Expect<Equal<AppendToObject<test1, 'home', boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, 'home', 1>, testExpect2>>,
  Expect<Equal<AppendToObject<test3, 'isMotherRussia', false | undefined>, testExpect3>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/527/answer
  > View solutions: https://tsch.js.org/527/solutions
  > More Challenges: https://tsch.js.org
*/
