const getAllFileName = (dir, subDir = null) => {
  let nameList = []
  switch (dir) {
    case 'products':
      nameList = require.context('../../public/img/products/', true, /\.(png|jpe?g|svg)$/).keys()
      break
    case 'pdf':
      nameList = require.context('../../public/pdf/', true, /\.(pdf)$/).keys()
      break
    case 'highlight':
      nameList = require.context('../../public/img/products/', true, /(cover|logo)\.(png|jpe?g|svg)$/).keys()
      break
    default:
      nameList = require.context('../../public/', true, /\.(png|jpe?g|svg|pdf)$/).keys()
  }
  if (subDir) {
    const extracted = extractFileName(nameList, dir, subDir)
    return extracted
  } else {
    return nameList
  }
}

const extractFileName = (list, dir, path = null) => {
  const filtered = list.reduce((data, x) => {
    if (x.includes(path)) {
      const name = x.replace('./' + path + '/', '')
      if (dir === 'highlight' && !name.includes('/')) {
        if (name.includes('cover') || name.includes('logo')) {
          data[name.split('.')[0]] = name
        }
      } else if (dir !== 'highlight') {
        if (name.includes('cover') || name.includes('logo')) {
          data[name.split('.')[0]] = name
        } else {
          data.list.push(name)
        }
      }
    }
    return data
  }, { list: [] })
  return filtered
}

module.exports = { getAllFileName, extractFileName }
