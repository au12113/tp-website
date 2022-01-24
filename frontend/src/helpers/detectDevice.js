const isDesktop = () => {
  const screenWidth = window.innerWidth
  return screenWidth > 991
}

module.exports = {
  isDesktop
}
