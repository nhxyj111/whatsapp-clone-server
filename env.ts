export const expiration = process.env.JWT_EXPIRATION_MS
  ? parseInt(process.env.JWT_EXPIRATION_MS)
  : 24 * 60 * 60 * 1000
export const secret = process.env.JWT_SECRET || '9asd91023'
export const origin = process.env.ORIGIN || 'http://localhost:3000'
export const port = process.env.PORT || 4000
export const resetDb = process.env.RESET_DB || false
