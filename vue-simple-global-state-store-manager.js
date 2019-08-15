import Vue from "vue/dist/vue.esm.browser.js";



const temptarget = new EventTarget();
const simpleglobalstatestore = {};

export default function(组件状态对应全局状态表, vueinitopt) {
Object.keys(组件状态对应全局状态表).forEach((k)=>{

if(typeof k==="symbol"||String(k).startsWith("_")||String(k).startsWith("$")){

throw new TypeError("")

}


})
//Vue.extend自动识别是函数还是参数对象

  var vueinitconstructfun = Vue.extend(vueinitopt);
com.prototype  =vueinitconstructfun.prototype
return com

function com(o) {
    var i = new Proxy(Object.create(vueinitconstructfun.prototype), {
      set(t, p, v) {
        Reflect.set(t, p, v);
        if (p in (Object.keys(组件状态对应全局状态表))) {
          console.log(t, p, v);
        }

        return true;
      }
    });
    vueinitconstructfun.call(i, o);
    return i;
  };
}
