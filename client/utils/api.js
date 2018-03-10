import axios from 'axios';
import Cookies from 'js-cookie'
import { message } from 'antd'

const io = axios.create({
  baseURL: '/',
  timeout: 10000,
  withCredentials: true,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
})

io.defaults.headers.common.authorization_admin = Cookies.get('authorization_admin');

function handleVerify(res) {
  const { authorization_admin = null } = res.headers
  if (authorization_admin) {
    Cookies.set('authorization_admin', authorization_admin, { expires: 7 })
    io.defaults.headers.common.authorization_admin = authorization_admin;
  }
  if (res.data.code === 2) {
    // Cookies.remove('authorization_admin')
    message.error('没有操作权限')
  }
  return res
}


export default {
  // company
  getCompanyDetail() {
    return io.get('/company').then(handleVerify);
  },
  updateCompanyDetail(data = {}) {
    return io.put('/company', data).then(handleVerify);
  },


  // user
  getUserList(data = {}) {
    const { userId, userName } = data
    // 条件查询
    if (userId || userName) {
      return io.get(`/user?userId=${userId || ''}&userName=${userName || ''}`).then(handleVerify);
    }
    return io.get('/user').then(handleVerify);
  },
  getUserDetail(data = {}) {
    const { userId } = data
    return io.get(`/user/${userId}`).then(handleVerify);
  },
  addUser(data = {}) {
    return io.post('/user', data).then(handleVerify);
  },
  updateUser(data = {}) {
    return io.put('/user', data).then(handleVerify);
  },

  createRoom(data = {}) {
    return io.post('/room/create', data).then(handleVerify);
  },

  getAttendance(data = {}) {
    return io.post('/attendance/detail', data).then(handleVerify);
  },

  // dep
  getDepDetail(data = {}) {
    const { depId } = data
    return io.get(`/dep/${depId}`).then(handleVerify);
  },
  getDepList(data = {}) {
    const { depId, depName } = data
    // 条件查询
    if (depId || depName) {
      return io.get(`/dep?depId=${depId || ''}&depName=${depName || ''}`).then(handleVerify);
    }
    return io.get('/dep').then(handleVerify);
  },
  addDep(data = {}) {
    return io.post('/dep', data).then(handleVerify);
  },
  updateDep(data = {}) {
    return io.put('/dep', data).then(handleVerify);
  },


  // verify
  verifyAdmin(data = {}) {
    return io.post('/verify/admin', data).then(handleVerify);
  },
}
