import axios from 'axios';

const io = axios.create({
  baseURL: '/',
  timeout: 10000,
  withCredentials: true,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

function handleError(response) {
  return response;
}


export default {
  // company
  getCompanyDetail() {
    return io.get('/company').then(handleError);
  },
  updateCompanyDetail(data = {}) {
    return io.put('/company', data).then(handleError);
  },


  // user
  getUserList(data = {}) {
    const { userId, userName } = data
    // 条件查询
    if (userId || userName) {
      return io.get(`/user?userId=${userId || ''}&userName=${userName || ''}`).then(handleError);
    }
    return io.get('/user').then(handleError);
  },
  getUserDetail(data = {}) {
    const { userId } = data
    return io.get(`/user/${userId}`).then(handleError);
  },
  addUser(data = {}) {
    console.log('data', data)
    return io.post('/user', data).then(handleError);
  },
  updateUser(data = {}) {
    return io.put('/user', data).then(handleError);
  },


  // dep
  getDepDetail(data = {}) {
    const { depId } = data
    return io.get(`/dep/${depId}`).then(handleError);
  },
  getDepList(data = {}) {
    const { depId, depName } = data
    // 条件查询
    if (depId || depName) {
      return io.get(`/dep?depId=${depId || ''}&depName=${depName || ''}`).then(handleError);
    }
    return io.get('/dep').then(handleError);
  },
  addDep(data = {}) {
    console.log('data', data)
    return io.post('/dep', data).then(handleError);
  },
  updateDep(data = {}) {
    console.log('data', data)
    return io.put('/dep', data).then(handleError);
  },
}
