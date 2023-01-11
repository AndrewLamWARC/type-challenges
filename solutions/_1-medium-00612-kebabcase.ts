type KebabCase<S extends string> = 
  S extends `${infer Car}${infer Cdr}`
    ? Cdr extends Uncapitalize<Cdr>
      // Not uppercase character in Cdr, append and recurse char by char. Always lowercase all chars.
      ? `${Lowercase<Car>}${KebabCase<Cdr>}`
      // Uppercase 1st char in Cdr, append with hyphen and recurse char by char 
      : `${Lowercase<Car>}-${KebabCase<Cdr>}`
    : S
type A1 = KebabCase<'FooBarBaz'>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<KebabCase<'FooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'fooBarBaz'>, 'foo-bar-baz'>>,
  Expect<Equal<KebabCase<'foo-bar'>, 'foo-bar'>>,
  Expect<Equal<KebabCase<'foo_bar'>, 'foo_bar'>>,
  Expect<Equal<KebabCase<'Foo-Bar'>, 'foo--bar'>>,
  Expect<Equal<KebabCase<'ABC'>, 'a-b-c'>>,
  Expect<Equal<KebabCase<'-'>, '-'>>,
  Expect<Equal<KebabCase<''>, ''>>,
  Expect<Equal<KebabCase<'😎'>, '😎'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/612/answer
  > View solutions: https://tsch.js.org/612/solutions
  > More Challenges: https://tsch.js.org
*/
