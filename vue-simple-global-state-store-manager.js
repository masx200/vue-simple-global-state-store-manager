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
export  function bindGlobalStore(jsonobjopt, vueinitopt) {
  if (!isobject(jsonobjopt)) {
    throw Error("invalid object");
  }



if("function"!==typeof vueinitopt||"object"!==typeof vueinitopt){
throw Error("invalid component");
}

  const 全局状态对应组件状态表 = newobjjson(jsonobjopt);

  Object.values(全局状态对应组件状态表).forEach(v => {
    if (
      typeof v !== "string"
      ||
            String(v).startsWith("_") ||
      String(v).startsWith("$")

    ) {
      throw new TypeError("invalid value");
    }
    
    })
    
  //Vue.extend自动识别是组件构造函数函数还是参数对象

  var vueinitconstructfun = Vue.extend(vueinitopt);
  com.prototype = vueinitconstructfun.prototype;
  
  
  
  
   Object.keys(com).forEach(k => {
com[k]=vueinitconstructfun[k]
  });
  
  
  return com;

  function com(o) {
Object.keys(全局状态对应组件状态表).forEach(key => {
     const eventname = "globalstatechange-" + key;
    //
    })
function onmounted(){}
function ondestroyed(){}
    var i = new Proxy(Object.create(vueinitconstructfun.prototype), {
      set(t, p, v) {
        Reflect.set(t, p, v);
        if (Object.values(全局状态对应组件状态表).includes(p)) {
          console.log(t, p, v);
        }
else{
console.log(t, p, v);
}
        return true;
      }
    });
    vueinitconstructfun.call(i, o);
    return i;
  }
}
export function initGlobalState(jsonobject) {
  if (!isobject(jsonobject)) {
    throw Error("invalid object");
  }

  const newjsonobj = newobjjson(jsonobject);
  const newobjtoreturn = {};

  Object.keys(newjsonobj).forEach(key => {

    if ("undefined" === typeof simpleglobalstatestore[key]) {
      simpleglobalstatestore[key] = newjsonobj[key];
    }
    newobjtoreturn[key] = simpleglobalstatestore[key];
  });
  console.log("全局状态生成", simpleglobalstatestore);
  return newobjtoreturn;
}
