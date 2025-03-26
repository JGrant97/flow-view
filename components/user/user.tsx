export default interface User {
  jti: string,
  sub: string,
  userName: string,
  email: string,
  email_verified: boolean,
  iss: string,
  aud: string,
  exp: number,
  roles: string[]
}