// Vue computed prop can access 'this' as D
type VueComputed<C, D> = C & ThisType<D>

// Vue methods prop can access 'this' as D
// Vue methods prop can access 'this' as M
// Vue methods prop can access 'this' as each C's property's return value
type VueMethods<D, C, M> = M & ThisType<D & M & { 
  [K in keyof C]: 
    C[K] extends () => unknown
      // Return ReturnType of the getter in C 
      ? ReturnType<C[K]>
      // Don't allow C props functions to be called as functions
      : never
}>

type VueOptions<D, C, M> = {
  // data cannot access 'this'
  data(this: never): D,
  computed: VueComputed<C, D>,
  methods: VueMethods<D, C, M>
}

declare function SimpleVue<D, C, M>(options: VueOptions<D, C, M>): any

// type VueComputed<C> = {
//   [P in keyof C]: C[P] extends () => unknown ? ReturnType<C[P]> : never
// }

// type VueThis<D, C, M> = ThisType<D & VueComputed<C> & M>

// type VueOptions<D, C, M> = {
//   data: (this: void) => D;
//   computed: C & VueThis<D, C, M>;
//   methods: M & VueThis<D, C, M>
// }

declare function SimpleVue<D, C, M>(options: VueOptions<D, C, M>): unknown
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

SimpleVue({
  // data is a simple function that returns an object that exposes the context `this`, 
  // but you won't be accessible to other computed values or methods.
  data() {
    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error // E
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  //`computed` is an Object of functions that take the context as `this` 
  // doing some calculation and returns the result. 
  // The computed results should be exposed to the context as the plain return values instead of functions.
  computed: {
    fullname() { 
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.amount)
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const cases: [Expect<Equal<typeof fullname, string>>] = [] as any
    },
  },
})

function alert(arg0: any) {
  throw new Error('Function not implemented.')
}
/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/6/answer
  > View solutions: https://tsch.js.org/6/solutions
  > More Challenges: https://tsch.js.org
*/
