//包含多个通过提交commit调用mutation从而修改状态的方法对象action

import {Save_Info,School_Info,Department_Info,Position_Info} from './mutation-types'

export default {
  saveInfo({commit}, teacherInfo) {
    commit(Save_Info, teacherInfo)
  },
  schoolInfo({commit}, schoolArr){
    commit(School_Info, schoolArr)
  },
  departmentInfo({commit}, departmentArr){
    commit(Department_Info, departmentArr)
  },
  positionInfo({commit}, positionArr){
    commit(Position_Info, positionArr)
  },

}