export function isNumeric(a: string) {
  if (typeof a != "string") return false // we only process strings!  
  return !isNaN(parseFloat(a)) // ...and ensure strings of whitespace fail
}