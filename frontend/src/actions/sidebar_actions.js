export const SELECT_DEPTS = "SELECT_DEPTS";
export const OPEN_CLOSE_SIDEBAR = "OPEN_CLOSE_SIDEBAR";
export const CLOSE_SIDEBAR = "CLOSE_SIDEBAR";

export const selectDepts = deptIds =>({
  type: SELECT_DEPTS,
  deptIds
})

export const openCloseSidebar = dispSidebar =>({
  type: OPEN_CLOSE_SIDEBAR,
  dispSidebar
})
