import Vue from 'vue'
import Vuex from 'vuex'
import HttpClient from '@/httpClient'

Vue.use(Vuex)

export default new Vuex.Store({
  getters: {
    getGlobalLoad: state => state.globalLoad,
    getNewShiftCode: state => state.NewShiftCode,
    getAddNewShift: state => state.AddNewShift,
    getfilterLoading: state => state.filterLoading,
    getCurrentPage: state => state.shiftsPaging.currentPage,
    getPageSize: state => state.shiftsPaging.pageSize,
    getShifts: state => state.Shifts,
    getShiftDaySchedules: state => state.ShiftDaySchedules,
    getActiveTab: state => state.ActiveTab,
    getDisabledIndexes: state => state.DisabledIndexes,
    getFilter: state => state.filter,
    getShiftsPaging: (state, getters) => {
      let pagingData = state.shiftsPaging
      let data
      if (state.filter !== null) {
        data = getters.getFilterdShifts
      }
      if (state.filter === null) {
        data = getters.getShifts
      }
      if (data.length === 0) {
        return []
      }
      let startPage = ((pagingData.currentPage - 1) * pagingData.pageSize)
      let newData = []
      for (let i = startPage; i < (startPage + pagingData.pageSize) && i < data.length; i++) {
        newData.push(data[i])
      }
      return newData
    },
    getFilterdShifts: (state) => {
      let results = []
      if (state.Shifts.length > 0) {
        results = state.Shifts.filter(item => {
          return (item.shiftCode !== null)
        })
        results = results.filter(item => {
          return ((item.shiftCode.toString().toLowerCase().indexOf(state.filter.toString().toLowerCase()) > -1) || (item.description.toString().toLowerCase().indexOf(state.filter.toString().toLowerCase()) > -1))
        })
      }
      return results
    }
  },
  state: {
    NewShiftCode: null,
    AddNewShift: false,
    filterLoading: false,
    globalLoad: false,
    Shifts: [],
    OldShifts: [],
    ShiftDaySchedules: [],
    ActiveTab: null,
    apiErrors: [],
    DisabledIndexes: [],
    filter: null,
    shiftsPaging: {
      total: 0,
      currentPage: 1,
      pageSize: 10
    }
  },
  mutations: {
    setNewShiftCode (state, payload) {
      state.NewShiftCode = payload
    },
    setAddNewShift (state, payload) {
      state.AddNewShift = payload
    },
    setShiftsPagingCurrentPage (state, payload) {
      state.shiftsPaging.currentPage = payload.data
    },
    setShiftsPagingReset (state, payload) {
      state.shiftsPaging.currentPage = payload
    },
    setShiftsPagingSize (state, payload) {
      state.shiftsPaging.pageSize = payload.data
    },
    setfilterLoading (state, payload) {
      state.filterLoading = payload
    },
    setRemoveDisabledIndex (state, payload) {
      for (var i = 0; i < state.DisabledIndexes.length; i++) {
        if (state.DisabledIndexes[i] === payload) {
          state.DisabledIndexes.splice(i, 1)
        }
      }
    },
    setNewDisabledIndex (state, payload) {
      state.DisabledIndexes = payload
    },
    setClearDisabledIndexes (state) {
      state.DisabledIndexes = []
    },
    setGlobalLoad (state, payload) {
      state.globalLoad = payload.load
    },
    setActiveTab (state, payload) {
      state.ActiveTab = payload
    },
    addApiError (state, payload) {
      state.apiErrors.push(payload.error)
    },
    setShifts (state, payload) {
      state.Shifts.unshift(Object.assign({}, payload))
    },
    setClearShifts (state) {
      state.Shifts = []
    },
    setFilter (state, payload) {
      state.filter = payload
    },
    setShiftDaySchedules (state, payload) {
      state.ShiftDaySchedules.push(Object.assign({}, payload))
    },
    removeEmptyShift (state, payload) {
      const selectedShiftIndex = state.Shifts.findIndex((item, index) => index === payload)
      if (selectedShiftIndex > -1) {
        state.Shifts.splice(selectedShiftIndex, 1)
      }
    }
  },
  actions: {
    async initializeAllData (context) {
      return HttpClient.initialDataRequest().then((response) => {
        context.state.Shifts = []
        for (var i = 0; i < response.data.length; i++) {
          context.commit('setShifts', response.data[i])
        }
      })
    },
    async addorUpdateShiftDataAndReload (context, payload) {
      await HttpClient.addorUpdateShiftDataAndReload(payload.data).catch((error) => {
        // Return the rejected promise, and don't even go through with the rest of the method
        return Promise.reject(error)
      })
      return context.dispatch({
        type: 'resetShiftDataAndReload'
      })
    },
    async resetShiftDataAndReload (context) {
      context.state.Shifts = []
      return context.dispatch({
        type: 'initializeAllData'
      })
    },
    async DisableOrEnableShiftDataAndReload (context, payload) {
      await HttpClient.DisableOrEnableShiftDataAndReload(payload.Id).catch((error) => {
        // Return the rejected promise, and don't even go through with the rest of the method
        return Promise.reject(error)
      })
      return context.dispatch({
        type: 'initializeAllData'
      })
    },
    async getShiftDaySchedules (context, payload) {
      await HttpClient.getShiftDaySchedules(payload.Id).then((response) => {
        context.state.ShiftDaySchedules = []
        for (var i = 0; i < response.data.length; i++) {
          context.commit('setShiftDaySchedules', response.data[i])
        }
      })
    },
    async updateShiftDaySchedules (context, payload) {
      await HttpClient.updateShiftDaySchedules(payload.data, payload.id).catch((error) => {
        // Return the rejected promise, and don't even go through with the rest of the method
        return Promise.reject(error)
      })
    }
  }
})
