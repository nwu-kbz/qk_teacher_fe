//包含多个由action触发直接去修改状态的方法的对象

import {Save_Info,School_Info,Department_Info,Position_Info} from './mutation-types'
export default {
  [Save_Info](state, teacherInfo) {
    state.teacherInfo.username = teacherInfo.username;               //用户名
    state.teacherInfo.nickname = teacherInfo.nickname;               //昵称
    state.teacherInfo.email = teacherInfo.email;                    //邮箱
    state.teacherInfo.type = teacherInfo.type;                     //teacher
    state.teacherInfo.school = teacherInfo.school;                 //学校
    state.teacherInfo.department = teacherInfo.department;        //部门
    state.teacherInfo.position = teacherInfo.position;              //职称
    state.teacherInfo.id = teacherInfo.id;
    state.teacherInfo.sex = teacherInfo.sex;
    state.teacherInfo.phone = teacherInfo.phone;
    state.teacherInfo.avatar = 'http://qk.heniankj.com/public' + (teacherInfo.avatar).replace('\\','');

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
  }
}
