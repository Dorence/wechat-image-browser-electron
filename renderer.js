// @ts-check
/// <reference path='./preload.d.ts' />
var
/** @type {import('fs')} */ fs,
/** @type {import('electron').ipcRenderer} */ ipcRenderer,
/** @type {import('path')} */ path

const WxDefault = {
  fileDir: path.join(process.env.USERPROFILE, 'Documents/Wechat Files'),
}

function initWxInfo(dir = WxDefault.fileDir) {
  const fileDirFiles = fs.readdirSync(dir)
  // console.log(fileDirFiles)

  const wxids = fileDirFiles.filter(d => d.startsWith('wxid_'))
  let users = {}

  for (const wxid of wxids) {
    const accInfoFile = path.join(dir, wxid, 'config/AccInfo.dat')
    if (fs.existsSync(accInfoFile)) {
      // console.log('parsing', accInfoFile)
      const buf = fs.readFileSync(accInfoFile)
      const idx = utils.findStringInTypedArray(buf, wxid)
      // console.log(idx, buf)

      if (idx >= 0) {
        // find 'wxid_xxxx'
        const nameIdx = idx + utils.mbLength(wxid) + 6 /** @note 6 is magic-number */
        const nameLen = buf[nameIdx - 1]

        const name = utils.btou(buf.slice(nameIdx, nameIdx + nameLen))
        // console.log(name)
        users[wxid] = { name }
      }
      else {
        console.error(wxid, 'can not find in AccInfo.dat')
      }

    } else {
      console.error(wxid, 'not exist: AccInfo.dat')
    }
  }

  return {
    fileDir: dir,
    fileDirFiles,
    users,
  }
}

/**
 * 
 * @param {ReturnType<initWxInfo>} wxInfo initial data
 * @returns 
 */
async function loadWxInfo(wxInfo) {
  // process for each user
  for (const wxid in wxInfo.users) {
    console.log('load', wxid)
    const dir = path.join(wxInfo.fileDir, wxid, 'FileStorage')

    // load all files
    wxInfo.users[wxid].file = {}
    for (const subdir of ['Cache', 'File', 'Image', 'Video']) {
      if (fs.existsSync(path.join(dir, subdir))) {
        wxInfo.users[wxid].file[subdir] = await utils.treeDir(path.join(dir, subdir))
      }
    }
  }

  return wxInfo
}

async function main() {
  const wxInfoInit = initWxInfo()
  const wxInfo = await loadWxInfo(wxInfoInit)
  console.log(wxInfo)
}

main()
