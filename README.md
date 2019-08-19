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

函数`initGlobalState`用来生成状态初始值

函数`bindGlobalStore`用来订阅全局状态，组件状态与全局状态双向绑定

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
  name: "",
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
