/*包含所有基于todos的getter计算属性的对象*/
export default {
  teacherInfo(state) {
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
  unread: state => state.unread

}
