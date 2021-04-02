export function testEmail (email: string) : boolean {
  const reg = /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  return reg.test(email)
}
