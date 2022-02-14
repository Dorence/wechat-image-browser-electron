const fsPromise = require('fs/promises')
const path = require('path')

const TextDecoderInst = new TextDecoder();
const TextEncoderInst = new TextEncoder();

function kmp(str, patt) {
  function generateNext(patt) {
    let i = 0, j = -1, next = [-1]
    while (i < patt.length) {
      if (j === -1 || patt[i] === patt[j]) {
        next[i++] = j++
      } else {
        j = next[j]
      }
    }
    return next
  }

  const next = generateNext(patt)
  var i = 0 // for str
  var j = 0 // for patt
  while (i < str.length && j < patt.length) {
    if (j === -1 || str[i] === patt[j]) {
      i++, j++
    } else {
      j = next[j]
    }
  }
  return (j === patt.length) ? (i - j) : -1
}

function findStringInTypedArray(arr, str) {
  if (typeof str !== 'string') {
    return -1
  }
  const cp = TextEncoderInst.encode(str)
  return kmp(arr, cp)
}

function mbLength(str) {
  if (typeof str !== 'string') {
    return -1
  }
  return TextEncoderInst.encode(str).length
}

async function treeDir(dir) {
  // type: 1=file, 2=dir, 3=symlink
  const tree = await fsPromise.readdir(dir, { withFileTypes: true })
  let ret = {}
  for (let k of tree) {
    switch (true) {
      case k.isFile():
        ret[k.name] = null
        break
      case k.isDirectory():
      case k.isSymbolicLink():
        ret[k.name] = await treeDir(path.join(dir, k.name))
        break
      default:
        ret[k.name] = k.name
    }
  }
  return ret
}

module.exports = {
  btou: (i, o) => TextDecoderInst.decode(i, o),
  findStringInTypedArray,
  kmp,
  mbLength,
  treeDir,
  utob: (i) => TextEncoderInst.encode(i),
}
