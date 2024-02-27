/**
 * get URL according to .env
 */
const getURL = () => {
  switch (process.env.NODE_ENV) {
    case 'basic':
      return process.env.ORCHARD_URI
    case 'user':
      return process.env.ORCHARD_USER_URI
    default:
      break
  }
}

module.exports = { getURL }