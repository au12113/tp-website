const separateJwt = (jwt) => {
  const splited = jwt.split('.')
  return { payload: splited[0] + '.' + splited[1], signature: splited[2]}
}

const combineJwt = (headerBody, sig) => {
  return headerBody + '.' + sig
}

module.exports = { separateJwt, combineJwt }