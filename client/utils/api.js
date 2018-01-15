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
    return io.get(`/user?userId=${userId||''}&userName=${userName||''}`).then(handleError);
  },

  // dep
  getDepList() {
    return io.get('/dep').then(handleError);
  },
  addDep(data = {}) {
    return io.put('/dep', data).then(handleError);
  },
}
