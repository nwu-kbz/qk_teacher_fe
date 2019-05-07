//包含多个由action触发直接去修改状态的方法的对象

import {Save_Info,School_Info,Department_Info,Position_Info} from './mutation-types'
export default {
  [Save_Info](state, teacherInfo) {
    if (teacherInfo&&teacherInfo.avatar&&!teacherInfo.avatar.startsWith('http')) {
      teacherInfo.avatar = 'http://qk.heniankj.com/public' + (teacherInfo.avatar).replace('\\', '');
    }
    state.teacherInfo = teacherInfo;
  },
  [School_Info](state, schoolArr) {
    state.schoolArr = schoolArr;
  },
  [Department_Info](state, departmentArr) {
    state.departmentArr = departmentArr;
  },
  [Position_Info](state, positionArr) {
    state.positionArr = positionArr;
  },
  updateCurrentPath(state, path) {
    state.currentPath = path;
  },
  updateUnread(state, unread) {
    state.unread = unread;
  },
  updateQForm(state, val) {
    state.qForm = val;
  },
  updateAnswers(state, val) {
    state.qForm.answers = val;
  },
  updateRightAnswer(state, val) {
    state.qForm.rightAnswer = val;
  },
  clearQForm(state) {
    state.qForm = {};
  },
  savaQbank(state,qb){
    state.qBank = qb;
  },
  saveDocument(state, val) {
    state.documents = val;
  },
  saveAllResource(state, val) {
    state.allResource = val;
  },
  saveDocCateList(state, val) {
    state.docCateList = val;
  },
  saveStudentList(state, val) {
    state.studentList = val;
  },
  saveCourseList(state, val) {
    state.courseList = val;
  },
  addMessage(state, val) {
    state.messageList.push(val);
  },
  saveMessage(state, val) {
    state.messageList = val;
  },
  updateMessage(state, val) {
    state.messageList.splice(val['id'], 1, val['obj']);
  },
  saveWs(state, val) {
    state.ws = val;
  },
  saveWs1237(state, val) {
    state.ws1237 = val;
  },
}
