import * as R from 'ramda';
import storage from '@/utils/storage'
import DefaultData from '../data/settings.default'

const state = () => R.mergeDeepLeft(storage.get('settings'), DefaultData);

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    switch (key) {
      case 'wx.fileDir':
        const keyPath = R.split('.', key);
        /** @note Assign the dependency to trigger update of {computed} values */
        if (keyPath.length > 1) {
          state[keyPath[0]] = R.assocPath(keyPath, value)(state)[keyPath[0]];
        } else {
          state[key] = value;
        }
        break;
      default:
        break;
    }
    storage.set('settings', state)
  },
}

const actions = {
  set({ commit }, payload) {
    commit('CHANGE_SETTING', payload)
  }
}

export default {
  namespaced: true,
  state: state,
  actions: actions,
  mutations: mutations,
}
