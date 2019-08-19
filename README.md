# vue-simple-global-state-store-manager

适用于`Vue.js`的极简全局状态管理库,基于`Proxy`和 `EventTarget`实现

## 使用简单,可能是使用方法最简单的全局状态管理工具！

使用步骤只有两步，初始化全局状态，组件状态与全局状态双向绑定


## 组件状态与全局状态双向绑定

组件状态改变时全局状态改变

全局状态改变时组件状态改变

# 局部安装
```
cnpm install  --save https://github.com/masx200/vue-simple-global-state-store-manager.git
```
或者
```
yarn add https://github.com/masx200/vue-simple-global-state-store-manager.git
```
## 用法

使用前先使用`Vue.use(SimpleStoreManager)`注册一下`SimpleStoreManager`

### 函数`initGlobalState`用来生成状态初始值，

第一个参数为一个`object`，键名为全局状态名，键值为全局状态初始值

### 函数`bindGlobalStore`用来订阅全局状态，组件状态与全局状态双向绑定，

第一个参数为一个`object`， 键名为全局状态名，键值为组件状态名称

第二个参数为一个`object`或者`function`，是`vue`组件的构造参数或者`vue`组件的构造函数

返回值是`vue`组件的构造函数

# 示例

`index.js`

```js
import Vue from "vue/dist/vue.esm.browser.min.js";

import SimpleStoreManager,{bindGlobalStore,initGlobalState} from "vue-simple-global-state-store-manager"; 

Vue.use(SimpleStoreManager);

initGlobalState({
  globaltestname: "helloworld-使用全局状态管理"
});

import AppHome from "./apphome.vue"

new Vue({
    el: document.querySelector("#root"),
    
    
    
    render(h) {
      return h(AppHome);
    }
    
  });

```


`apphome.vue`

```html
<template>
  <div>
    <p>
      testname:
      <input class="form-control" v-model="testname" />
    </p>
    <button class="btn btn-outline-success btn-lg" v-on:click="changevalue()">修改testname</button>
  </div>
</template>
<script>
import {
  initGlobalState,
  bindGlobalStore
} from "vue-simple-global-state-store-manager";

initGlobalState({
  globaltestname: "helloworld-使用全局状态管理"
});

var comp = {
  
  methods: {
    changevalue() {
      this.testname =
        Math.random() > 0.5 ? this.testname + "te--" : "--st" + this.testname;
    }
  },
  data() {
    return { testname: "helloworld-test使用全局状态管理" };
  }
};

var comfu = bindGlobalStore(
  {
    globaltestname: "testname"
  },
  
  comp
);

export default comfu;
</script>>
```


# 原理

使用事件发布者订阅者模式来同步状态

基于EventTarget

使用了通过在EventTarget上触发事件和接收事件的方式，来通知组件刷新，一个事件触发对应多个事件监听

当组件被卸载时，清除事件监听器，防止内存泄漏

当组件挂载之后,会自动同步全局状态

由于事件监听函数是异步执行，所以组件状态刷新也是异步执行的



使用`Proxy`来代理组件的构造函数，适配`vue-loader`

返回的构造函数是被 `Proxy`代理的`vue`组件实例，监听组件的状态变化和挂载卸载事件



# Proxy

Proxy 对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）。

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy
