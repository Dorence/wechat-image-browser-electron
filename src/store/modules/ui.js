import * as R from 'ramda';
import storage from '@/utils/storage'
import DefaultData from '../data/ui.default'

const state = () => R.mergeDeepLeft(storage.get('ui'), DefaultData);

const mutations = {
  UPDATE(state, { key, value }) {
    switch (key) {
      case 'detailPanel.width':
      case 'sider.width':
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
    storage.set('ui', state)
  },
  CLEAR(state) {
    storage.remove('ui')
  },
}

const actions = {
  set({ commit }, payload) { commit('UPDATE', payload) },
  clear({ commit }, payload) { commit('CLEAR') },
}

export default {
  namespaced: true,
  state: state,
  actions: actions,
  mutations: mutations,
}
