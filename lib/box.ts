export const Box = <T>(x: T) => ({
  fold: (f: (x: T) => T) => f(x),
  inspect: () => `Box(${x})`,
  map: (f: (x: T) => T) => Box(f(x)),
})
