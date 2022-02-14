import { createLogger, createStore } from 'vuex'
import * as R from 'ramda'
import getters from './getters'

const projectile = R.curry((keyMap = (k) => k, valMap = (v) => v, obj) =>
  R.reduce((acc, key) => R.assoc(keyMap(key), valMap(obj[key]), acc), {}, R.keys(obj))
)

const modules = projectile(
  (k) => k.replace(/(\.\/modules\/|\.js)/g, ''),
  (v) => v.default,
  import.meta.globEager('./modules/*.js')
)
// console.log('modules', modules)

const debug = import.meta.env.NODE_ENV !== 'production'

export const store = createStore({
  modules,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export function loadStore(app) {
  app.use(store)
  return store
}

export default store