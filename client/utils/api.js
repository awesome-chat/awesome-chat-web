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
  getCompanyDetail(data = {}) {
    const { companyId } = data;
    return io.get(`/company/${companyId}`).then(handleError);
  },
}
