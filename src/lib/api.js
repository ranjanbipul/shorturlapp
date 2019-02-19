import {SET_TRANSFER_STATE} from "../store/actionTypes";

class Api {
  static host = "//su.webjack.in:8080/api";
  static store = null;
  static url_patt = /^https?:\/\//i;
  static count = 0;
  static headers() {
    let headerList = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
    let token  = this.store.getState().app.token;
    if(token) headerList['Authorization'] = "Bearer "+token;
    return headerList;
  }

  static setStore(store){
    this.store = store;
  }

  static add(){
    this.count+=1
    if(this.count===1){
      this.store.dispatch({type:SET_TRANSFER_STATE,state:true})
    }
  }

  static remove(){
    this.count-=1
    if(this.count===0){
      this.store.dispatch({type:SET_TRANSFER_STATE,state:false})
    }
  }

  static get(route,params) {
    return this.xhr(route, params, 'GET');
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT')
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST')
  }

  static upload(route, params,verb='POST') {
    return this.xhr(route, params, verb,true)
  }

  static delete(route, params) {
    return this.xhr(route, params, 'DELETE')
  }


  static async xhr(route, params, verb,multipart=false) {
    this.add()
    var url=route;
    if (!Api.url_patt.test(route)){
        url = `${window.location.protocol}${Api.host}${route}`;
    }
    let options = null
    if(multipart){
      options = Object.assign({ method: verb,credentials: 'include' }, params ? { body: params } : null );
      options.headers = {'Accept': 'application/json'}
    }else{
      options = Object.assign({ method: verb,credentials: 'include' }, params ? { body: JSON.stringify(params) } : null );
      options.headers = Api.headers()
    }
    return fetch(url, options)
    .then( resp => {
      console.log(resp);
      this.remove()
      if (resp.ok) 
        return resp.json();
      throw resp;
    },resp=>{
      console.error(resp);
      this.remove()
      let error = {
        success: false, message:resp
      };
      throw error;
    })
    .then( json => {
      if (json.success)
        return json.data;
      throw json;
    });
  }
}
export default Api