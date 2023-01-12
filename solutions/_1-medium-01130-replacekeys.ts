// U is a union of objects
// T is a union of property names
// Y is an object with properties
type ReplaceKeys<U, T, Y extends Record<PropertyKey, unknown>> = {
  [K in keyof U]: 
    // Is K in T
    K extends T
      // Is K a key of Y
      ? K extends keyof Y
        // Yes, value of K in Y
        ? Y[K]
        // No K is not key of Y. Never
        : never
      // No K is not in Y. Copy in original value of property in U
      : U[K]
}

// Take advantage of distribution
type ReplaceKeysN01<U, T, Y> = {
  [K in keyof U]: U[K]
}

type A1 = ReplaceKeys<Nodes, 'name' | 'flag', { name: number; flag: string }>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type NodeA = {
  type: 'A'
  name: string
  flag: number
}

type NodeB = {
  type: 'B'
  id: number
  flag: number
}

type NodeC = {
  type: 'C'
  name: string
  flag: number
}

type ReplacedNodeA = {
  type: 'A'
  name: number
  flag: string
}

type ReplacedNodeB = {
  type: 'B'
  id: number
  flag: string
}

type ReplacedNodeC = {
  type: 'C'
  name: number
  flag: string
}

type NoNameNodeA = {
  type: 'A'
  flag: number
  name: never
}

type NoNameNodeC = {
  type: 'C'
  flag: number
  name: never
}

type Nodes = NodeA | NodeB | NodeC
type ReplacedNodes = ReplacedNodeA | ReplacedNodeB | ReplacedNodeC
type NodesNoName = NoNameNodeA | NoNameNodeC | NodeB

type cases = [
  Expect<Equal<ReplaceKeys<Nodes, 'name' | 'flag', { name: number; flag: string }>, ReplacedNodes>>,
  Expect<Equal<ReplaceKeys<Nodes, 'name', { aa: number }>, NodesNoName>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1130/answer
  > View solutions: https://tsch.js.org/1130/solutions
  > More Challenges: https://tsch.js.org
*/
