import axios from 'axios';
export const api=axios.create({baseURL:import.meta.env.VITE_API_BASE_URL||'',headers:{'Content-Type':'application/json'}});
api.interceptors.request.use(config=>{const token=localStorage.getItem('fabora-access');if(token)config.headers.Authorization=`Bearer ${token}`;config.headers['x-country-code']=localStorage.getItem('fabora-country')||'EG';return config});
api.interceptors.response.use(r=>r,e=>{if(e?.response?.status===401){localStorage.removeItem('fabora-access');localStorage.removeItem('fabora-email')}return Promise.reject(e)});
