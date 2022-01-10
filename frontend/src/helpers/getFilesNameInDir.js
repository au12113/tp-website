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
      nameList = require.context('../../public/img/products/', true, /(cover|logo|banner)\.(png|jpe?g|svg)$/).keys()
      break
    default:
      nameList = require.context('../../public/', true, /\.(png|jpe?g|svg|pdf)$/).keys()
  }
  if (subDir === 'all') {
    const extracted = zipToObject(nameList)
    return extracted
  } else if (subDir !== null) {
    const extracted = extractFileName(nameList, dir, subDir)
    return extracted
  } else {
    return nameList
  }
}

const getPath = (shortPath) => {
  const partial = shortPath.slice(2)
  return `${process.env.PUBLIC_URL}/img/products/${partial}`
}

const zipToObject = (list) => {
  const zipped = list.reduce((acc, x) => {
    const series = x.split('/')[1]
    const filename = x.split('/').pop()
    if (!acc[series]) {
      acc[series] = { }
    }
    const name = filename.split('.')[0]
    const path = getPath(x)
    if (name.toLowerCase() === 'cover') {
      acc[series].cover = path
    } else if (name.toLowerCase() === 'logo') {
      acc[series].logo = path
    } else if (name.toLowerCase() === 'banner') {
      acc[series].banner = path
    }
    return acc
  }, {})
  return zipped
}

const extractFileName = (list, dir, path = null) => {
  const filtered = list.reduce((data, x) => {
    if (x.includes(path)) {
      const name = x.replace('./' + path + '/', '')
      if (dir === 'highlight' && !name.includes('/')) {
        if (name.includes('cover') || name.includes('logo') || name.includes('banner')) {
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
