import axios from "axios"
import Response from './../../helpers/Response';
import Define from './../../helpers/Define';
import Types from "./Types";
import CUser from './../../helpers/CUser';

class AuthAction {
    constructor(dispatch) {
        this.dispatch = dispatch
    }
    //isLoggedIn

    //Logout
    Logout = () => {
        //ao/logout
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get('ao/logout')
                const { error, message, response } = res.data
                if (error) {
                    reject(new Error(message))
                } else {
                    //logout success
                    //remove from localstorage
                    CUser.logOut()
                    //update UI
                    this.dispatch({
                        type: Types.AUTH_LOGOUT
                    })
                    //resolve promise
                    const response_ui = Response(true, "Logged Out Successful", message, Define.BT_SUCCESS, response)
                    resolve(response_ui)
                }
            } catch (e) {
                reject(new Error(e.message))
            }
        })
    }

    //login ao/user
    login = (email, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                //hit api get response 
                const res = await axios.post('ao/login', { email, password })
                const { error, message, response } = res.data
                if (error) {
                    reject(new Error(message))
                } else {
                    //login success
                    //save to localstorage
                    delete response.token
                    CUser.setCurrentuser(response)
                    //update UI
                    this.dispatch({
                        type: Types.AUTH_LOGIN,
                        payload: response//user object
                    })
                    //resolve promise
                    const response_ui = Response(true, "Logged In Successful", message, Define.BT_SUCCESS, response)
                    resolve(response_ui)
                }
            } catch (e) {
                reject(new Error(e.message))
            }
        })//end promise
    }
    //signup a user/ao 
    //@param ao object{ao_id,name,email,phone,parents_phone,password,present_address,photo_url}
    signup = (ao_obj) => {
        return new Promise(async (resolve, reject) => {
            try {
                //hit api get response 
                const res = await axios.post('ao/signup', ao_obj)
                const { error, message, response } = res.data
                if (error) {
                    reject(new Error(message))
                } else {
                    //login success
                    //save to localstorage
                    delete response.token
                    CUser.setCurrentuser(response)
                    //update UI
                    this.dispatch({
                        type: Types.AUTH_SIGNUP,
                        payload: response//user object
                    })
                    //resolve promise
                    const response_ui = Response(true, "SignUP Successful", message, Define.BT_SUCCESS, response)
                    resolve(response_ui)
                }
            } catch (e) {
                reject(new Error(e.message))
            }
        })//end promise
    }

}

export default AuthAction