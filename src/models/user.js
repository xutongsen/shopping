import { login } from "../api/user"
import router from "umi/router"
const userInfo = JSON.parse(localStorage.getItem("USER_INFO")) || {
  token: "",
  role: "",
  userName: "",
  balance: 0
}

export default {
  namespace: "user",
  state: userInfo,
  effects: {
    *login({payload},{put, call}) {
      try {
        let {userInfo} = yield call(login, payload)
        localStorage.setItem("USER_INFO", JSON.stringify(userInfo))
        yield put({type: 'init', payload: userInfo})
        router.push('/')
      } catch(e) {
        console.log(e)
      }
    
    }
  },
  reducers: {
    init(state, action) {
      return action.payload
    }
  }
}