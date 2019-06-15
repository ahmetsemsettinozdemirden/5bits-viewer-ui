import { store } from 'react-easy-state'

const globalStore = store({
  token: '',
  num: 0,
  increment () {globalStore.num++}
})

export default globalStore