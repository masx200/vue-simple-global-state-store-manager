import Vue from "vue/dist/vue.esm.browser.js";



const temptarget = new EventTarget();
const simpleglobalstatestore = {};


function newobjjson(obj) {
  if (typeof obj !== "object") {
    throw new TypeError("传入的参数必须是个object!");
  }
  return JSON.parse(JSON.stringify(obj));
}
function isobject(o) {
  return (
    typeof o === "object" &&
    Object.prototype.toString.call(o) === "[object Object]" &&
    o.__proto__ === Object.prototype
  );
}
export default function(组件状态对应全局状态表, vueinitopt) {
  if (!isobject(组件状态对应全局状态表)) {
    throw Error("invalid object");
  }
  const 组件状态对应全局状态表 = newobjjson(组件状态对应全局状态表);
Object.keys(组件状态对应全局状态表).forEach((k)=>{

if(

//typeof k==="symbol"||


String(k).startsWith("_")||String(k).startsWith("$")){

throw new TypeError("invalid key")

}


})

Object.values(组件状态对应全局状态表).forEach((v)=>{

if(

typeof v!=="string"
//||


//String(k).startsWith("_")||String(k).startsWith("$")

){

throw new TypeError("invalid value")

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
        if (p in ((组件状态对应全局状态表))) {
          console.log(t, p, v);
        }

        return true;
      }
    });
    vueinitconstructfun.call(i, o);
    return i;
  };
}
