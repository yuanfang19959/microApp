/**
 * 获取baseUrl
 * import.meta.env.MODE 为vite获取环变量方式
 * @returns 
 */
const BASE = () => {
    return import.meta.env.MODE === 'development' ? "/api" : "http://ysrx.qdxgysy.com:8080"
}
export const BASEURL = BASE();


//首页菜单
export const GETMENU = '/interface/qd/home/getMenu';

export const QUERY = '/interface/qd/combo/query';

//热线代办 nav查询
export const BILLGROUP = '/interface/qd/bill/billGroup';

//热线代办 数据查询
export const BILLLIST = '/interface/qd/bill/billList';

//热线代办 单个数据详情
export const BILLINFO = 'interface/qd/bill/billInfo';

//延期审核 nav查询
export const DELAYEDGTOUP = '/interface/qd/delayed/delayedGroup';

//延期审核 数据查询
export const DELAYEDLIST = '/interface/qd/delayed/delayedList';

//热线=>待审批=>其他信息
export const LOADFILE = '/interface/qd/file/readImg';

//热线=>流程
export const BILLLOGLIST = '/interface/qd/bill/billLogList';

//热线=>待审批=>同意/驳回
export const REVIEW = '/interface/qd/bill/review';

//热线=>待确认=>提交
export const BILLCONFIRM = '/interface/qd/bill/confirm';

//热线=>待反馈=>确认反馈
export const FEEDBACK = '/interface/qd/bill/feedback';

//热线=>待反馈=>确认延期
export const BILLDELAYED = '/interface/qd/bill/delayed';

//延期代办=>延期审核单个详情信息
export const DELAYINFO = '/interface/qd/delayed/delayinfo';

//延期代办=>审核通过/驳回
export const DELAYREVIEW = '/interface/qd/delayed/review';

//热线=>待反馈=>转发
export const FORWARD = '/interface/qd/bill/forward';

// 供热用户查询
export const HEADINGLIST = '/interface/qd/heating/headingList';

// 供热用户查询详情
export const HEADINGINFO = '/interface/qd/heating/heatingInfo';

// 员工通讯录
export const GETUSERLIST = '/interface/qd/user/getUserList';

// 新建工单
export const UPLOADIMG = '/interface/qd/file/upload'; 

// 下拉数据查询
export const GET_PICKER_DATA = '/interface/qd/combo/query'; 

// 新建工单提交
export const ADD_BILL = '/interface/qd/bill/add'; 

// 获取工单列表
export const GET_SITE_LIST = '/interface/qd/bill/onSiteList'; 

// 查找用户
export const FINDUSER = "/interface/qd/heating/getAreaList"
