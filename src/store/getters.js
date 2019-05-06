/*包含所有基于todos的getter计算属性的对象*/
import _ from 'lodash';

export default {
  teacherInfo(state) {
    if (_.isEmpty(state.teacherInfo)){
      let info = localStorage.getItem('userInfo');
      if (info) info = JSON.parse(info);
      state.teacherInfo = info;
      return info;
    }
    return state.teacherInfo
  },
  schoolArr(state) {
    return state.schoolArr;
  },
  departmentArr(state) {
    return state.departmentArr
  },
  positionArr(state) {
    return state.positionArr
  },
  currentPath:state=>state.currentPath,
  unread: state => state.unread,
  qForm: state => state.qForm,
  qBank: state => state.qBank,
  documents: state => state.documents,
  allResource: state => state.allResource,
  docCateList: state => state.docCateList,
  studentList: state => state.studentList,


}
