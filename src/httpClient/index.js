import config from './config'

export default {
  // This will authenticate a user and return a token for him
  authenticateUserRequest (username) {
    const postData = {
      username
    }
    return config.axiosInstance.post('Auth/RosterAuth', postData)
  },
  initialDataRequest () {
    return config.axiosInstance.get('shift')
  },
  addorUpdateShiftDataAndReload (data) {
    var Shifts = []
    Shifts.push(data)
    return config.axiosInstance.post('shift', Shifts)
  },
  updateShiftDaySchedules (data, shiftCode) {
    return config.axiosInstance.put(`shift/dayschedule/?shiftCode=${shiftCode}`, data)
  },
  DisableOrEnableShiftDataAndReload (shiftCode) {
    return config.axiosInstance.delete(`shift/?shiftCode=${shiftCode}`)
  },
  getShiftDaySchedules (shiftCode) {
    return config.axiosInstance.get(`shift/dayschedule/?shiftCode=${shiftCode}`)
  },
  exportToExcel () {
    return config.axiosInstance.get('shift/export', { responseType: 'blob' })
  }
}
