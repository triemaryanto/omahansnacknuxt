// store/index.js
export const state = () => ({
  userPermissions: [], // Store user permissions here
});

export const mutations = {
  setUserPermissions(state, permissions) {
    state.userPermissions = permissions;
  },
};

export const actions = {
  setUserPermissions({ commit }, permissions) {
    commit("setUserPermissions", permissions);
  },
};
