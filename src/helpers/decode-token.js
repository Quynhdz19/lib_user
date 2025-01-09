import { jwtDecode } from 'jwt-decode'

export const decodeJwtToken = (token) => {
  const decoded = jwtDecode(token)
  return decoded
}
