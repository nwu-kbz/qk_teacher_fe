//包含多个通过提交commit调用mutation从而修改状态的方法对象action

import {Save_Info, School_Info, Department_Info, Position_Info} from './mutation-types'

export default {
  saveInfo({commit}, teacherInfo) {
    commit(Save_Info, teacherInfo)
  },
  schoolInfo({commit}, schoolArr) {
    commit(School_Info, schoolArr)
  },
  departmentInfo({commit}, departmentArr) {
    commit(Department_Info, departmentArr)
  },
  positionInfo({commit}, positionArr) {
    commit(Position_Info, positionArr)
  },
  updateCurrentPath({commit}, path) {
    commit('updateCurrentPath', path);
  },
  updateUnread({commit}, val) {
    commit('updateUnread', val);
  },
  updateQForm({commit}, val) {
    commit('updateQForm', val);
  },
  updateAnswers({commit}, val) {
    commit('updateAnswers', val);
  },
  updateRightAnswer({commit}, val) {
    commit('updateRightAnswer', val);
  },
  clearQForm({commit}) {
    commit('clearQForm');
  },
  saveQbank({commit}, qBank) {
    commit('savaQbank', qBank)
  },
  saveDocument({commit}, val) {
    commit('saveDocument', val);
  },
  saveAllResource({commit}, val) {
    commit('saveAllResource', val);
  },
  saveDocCateList({commit}, val) {
    commit('saveDocCateList', val);
  },
  saveStudentList({commit}, val) {
    commit('saveStudentList', val);
  },
  saveCourseList({commit}, val) {
    commit('saveCourseList', val);
  },
  addMessage({commit}, val) {
    commit('addMessage', val);
  },
  saveMessage({commit}, val) {
    commit('saveMessage', val);
  },
  updateMessage({commit}, val) {
    commit('updateMessage', val);
  },
  saveWs({commit}, val) {
    commit('saveWs', val);
  },
  saveWs1237({commit}, val) {
    commit('saveWs1237', val);
  },

}
