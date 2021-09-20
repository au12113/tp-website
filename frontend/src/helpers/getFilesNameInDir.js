const getAllFileName = (dir, subDir = null) => {
  let nameList = []
  switch (dir) {
    case 'products':
      nameList = require.context('../../public/img/products/', true, /\.(png|jpe?g|svg)$/).keys()
      break
    case 'banner':
      nameList = require.context('../../public/img/banner/', true, /\.(png|jpe?g|svg)$/).keys()
      break
    case 'pdf':
      nameList = require.context('../../public/pdf/', true, /\.(pdf)$/).keys()
      break
    default:
      nameList = require.context('../../public/', true, /\.(png|jpe?g|svg|pdf)$/).keys()
  }
  if (subDir) {
    return extractFileName(nameList, subDir)
  } else {
    return nameList
  }
}

const extractFileName = (list, path = null) => {
  const filtered = list.reduce((data, x) => {
    if (x.includes(path)) {
      data.push(x.replace('./' + path + '/', ''))
    }
    return data
  }, [])
  return filtered
}

module.exports = { getAllFileName, extractFileName }
