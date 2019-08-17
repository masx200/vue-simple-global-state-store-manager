import Vue from "vue/dist/vue.esm.browser.js";
const _isDestroyed = "_isDestroyed";
const _isMounted = "_isMounted";
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
export function bindGlobalStore(jsonobjopt, vueinitopt) {
  if (!isobject(jsonobjopt)) {
    throw Error("invalid object");
  }

  if (!("function" == typeof vueinitopt || "object" == typeof vueinitopt)) {
    throw Error("invalid component");
  }

  const 全局状态对应组件状态表 = newobjjson(jsonobjopt);
  //一个组件状态只能绑定一个全局状态,否则报错
  if (
    Object.values(全局状态对应组件状态表).length !==
    Array.from(new Set(Object.values(全局状态对应组件状态表))).length
  ) {
    throw new Error("一个组件状态只能绑定一个全局状态,");
  }

  function 使用value从表中查询key(组件状态名) {
    return Object.entries(全局状态对应组件状态表).find(v => {
      return v[1] === 组件状态名;
    })[0];
  }
  Object.values(全局状态对应组件状态表).forEach(v => {
    if (
      typeof v !== "string" ||
      String(v).startsWith("_") ||
      String(v).startsWith("$")
    ) {
      throw new TypeError("invalid value");
    }
  });

  //Vue.extend自动识别是组件构造函数函数还是参数对象

  var vueinitconstructfun = Vue.extend(vueinitopt);
  com.prototype = vueinitconstructfun.prototype;

  Object.keys(vueinitconstructfun).forEach(k => {
    com[k] = vueinitconstructfun[k];
  });

  return com;

  function com(o) {
    const eventchangehandler = {};

    Object.keys(全局状态对应组件状态表).forEach(key => {
      const eventname = key;
      eventchangehandler[eventname] = function() {
        console.log("接受状态改变事件", eventname);
      };
    });
    function onmounted() {
      console.log("onmounted");
      Object.keys(全局状态对应组件状态表).forEach(key => {
        const eventname = key;
        //

        temptarget.addEventListener(eventname, eventchangehandler[eventname]);
      });
    }
    function ondestroyed() {
      console.log("ondestroyed");
      Object.keys(全局状态对应组件状态表).forEach(key => {
        const eventname = key;
        //

        temptarget.removeEventListener(
          eventname,
          eventchangehandler[eventname]
        );
      });
    }
    var i = new Proxy(Object.create(vueinitconstructfun.prototype), {
      set(t, p, v) {
        if (Object.values(全局状态对应组件状态表).includes(p)) {
          console.log(t, p, v);
          //p是组件状态
          let eventname = 使用value从表中查询key(p);
          temptarget.dispatchEvent(new Event(eventname));
          console.log("触发状态改变事件", eventname);
        } else {
          //   console.log(t, p, v);
        }
        //_isMounted;
        if (_isMounted === p && v === true && t[_isMounted] === false) {
          console.log(t, p, v);
          onmounted();
        }

        //_isDestroyed
        if (_isDestroyed === p && v === true && t[_isDestroyed] === false) {
          console.log(t, p, v);
          ondestroyed();
        }
        Reflect.set(t, p, v);
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
