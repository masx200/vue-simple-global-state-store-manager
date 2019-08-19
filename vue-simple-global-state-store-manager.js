"use strict";
export function getGlobalStates() {
  return newobjjson(simpleglobalstatestore);
}
let Vueextend = function() {
  throw new Error("没有先调用'Vue.use()'!");
};
export default function(vuefun) {
  Vueextend = vuefun.extend.bind(vuefun);
}
function jsondeepequal(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
function isinvalidstate(newstate) {
  return (
    "undefined" === typeof newstate ||
    "function" === typeof newstate ||
    newstate === null ||
    "symbol" === typeof newstate
  );
}
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
  const vueinitconstructfun = (vueinitopt => {
    let vueinitconstructfun;
    if ("object" === typeof vueinitopt) {
      vueinitconstructfun = Vueextend(vueinitopt);
    } else if ("function" === typeof vueinitopt) {
      vueinitconstructfun = vueinitopt;
    }
    return vueinitconstructfun;
  })(vueinitopt);
  const com = new Proxy(vueinitconstructfun, {
    construct: function(target, argumentsList) {
      return new comoldconstructor(...argumentsList);
    },
    apply: function(target, thisArg, argumentsList) {
      return new comoldconstructor(...argumentsList);
    }
  });
  com.options._Ctor[0] = com;
  com._Ctor = com.options._Ctor;
  return com;
  function comoldconstructor(o) {
    const vuecominstance = Object.create(vueinitconstructfun.prototype);
    const eventchangehandler = {};
    Object.keys(全局状态对应组件状态表).forEach(key => {
      const eventname = key;
      eventchangehandler[eventname] = function() {
        var newstate = simpleglobalstatestore[key];
        let oldstate = vuecominstance[全局状态对应组件状态表[key]];
        if (!jsondeepequal(newstate, oldstate)) {
          Reflect.set(
            vuecominstance,
            全局状态对应组件状态表[key],
            JSON.parse(JSON.stringify(newstate))
          );
        }
      };
    });
    function onmounted() {
      Object.keys(全局状态对应组件状态表).forEach(key => {
        const eventname = key;
        temptarget.addEventListener(eventname, eventchangehandler[eventname]);
        if ("undefined" === typeof simpleglobalstatestore[key]) {
          simpleglobalstatestore[key] =
            vuecominstance[全局状态对应组件状态表[key]];
        }
        temptarget.dispatchEvent(new Event(eventname));
      });
    }
    function ondestroyed() {
      Object.keys(全局状态对应组件状态表).forEach(key => {
        const eventname = key;
        temptarget.removeEventListener(
          eventname,
          eventchangehandler[eventname]
        );
      });
    }
    var i = new Proxy(vuecominstance, {
      set(t, p, v) {
        if (Object.values(全局状态对应组件状态表).includes(p)) {
          if (isinvalidstate(v)) {
            throw Error("invalid state");
          }
          let eventname = 使用value从表中查询key(p);
          let newstate = v;
          let oldstate = t[p];
          if (!jsondeepequal(newstate, oldstate)) {
            simpleglobalstatestore[eventname] = JSON.parse(JSON.stringify(v));
            console.log("全局状态改变", simpleglobalstatestore);
            temptarget.dispatchEvent(new Event(eventname));
          }
        } else {
          if (_isMounted === p && v === true && t[_isMounted] === false) {
            onmounted();
          }
          if (_isDestroyed === p && v === true && t[_isDestroyed] === false) {
            ondestroyed();
          }
          Reflect.set(t, p, v);
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
