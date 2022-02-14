// @ts-check

// @ts-ignore
window.$bn = (() => {
  'use strict'
  let $export = {}

  $export.setAppDropUserList = function (userList) {
    const el = document.querySelector('#app-d-user')
    el.innerHTML = '' // clear data
    for (const u of userList) {
      const li = document.createElement('li')
      const a = document.createElement('a')
      a.className = 'dropdown-item'
      a.innerHTML = u.username
      el.appendChild(li)
    }
  }


  return $export
})()
