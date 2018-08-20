import compose from '../compose'

describe('compose', () => {
  it('should compose from right to left', () => {
    const double = x => x * 2
    const square = x => x * x
    expect(compose(square)(5)).toBe(25)
    expect(
      compose(
        square,
        double,
      )(5),
    ).toBe(100)
    expect(
      compose(
        double,
        square,
        double,
      )(5),
    ).toBe(200)
  })

  it('can be seeded with multiple arguments', () => {
    const square = x => x * x
    const add = (x, y) => x + y
    expect(
      compose(
        square,
        add,
      )(1, 2),
    ).toBe(9)
  })

  it('should return the identity function if given no arguments', () => {
    expect(compose()(1, 2)).toBe(1)
    expect(compose()(3)).toBe(3)
    expect(compose()()).toBe(undefined)
  })

  it('should return the first function if given only one', () => {
    const fn = () => {}
    expect(compose(fn)).toBe(fn)
  })
})
