import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:7001/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getInvitation = (slug) => api.get(`/invitation/${slug}`)
export const getGuests = () => api.get('/guest')

export default api
