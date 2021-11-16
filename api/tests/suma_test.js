const suma = (a, b) => {
  return a + b
}

const checks = [
  { a: 0, b: 0, result: 0 },
  { a: 1, b: 3, result: 4 },
  { a: -7, b: 7, result: 0 }
]

checks.forEach((check) => {
  const { a, b, result } = check
  console.assert(suma(a, b) === result, `sum of ${a} and ${b} expexted to be ${result}`)
})

console.log(`${checks.length} checks performed ...`)
