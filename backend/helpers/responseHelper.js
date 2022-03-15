const parseArray = (x) => {
  if(typeof(x) === typeof([])) {
    return x.toString()
  } else {
    return XPathEvaluator
  }
}

module.exports = { parseArray }