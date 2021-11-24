// 取目前螢幕寬度
const width = window.innerWidth
let RWDMode = 1
if (width < 980) {
    RWDMode = 3
}

// 共用資訊
const state = {
    RWDMode,
    loading: false
}

const actions = {
    setRWDMode({ commit }, val) {
        commit(_M.SET_RWD_MODE, val)
    }
}
const mutations = {
    [_M.SET_RWD_MODE](state, val) {
        state.RWDMode = val
    }
}
const getters = {
    RWDMode: state => state.RWDMode,
}

export default {
    state,
    actions,
    mutations,
    getters
}
