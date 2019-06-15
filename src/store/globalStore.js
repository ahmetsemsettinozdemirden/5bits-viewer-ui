import { store } from 'react-easy-state'

const globalStore = store({
  token: '',
  email: ''
})

export default globalStore