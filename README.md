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

```js
import Vue from "vue/dist/vue.esm.browser.min.js";

import SimpleStoreManager,{bindGlobalStore,initGlobalState} from "vue-simple-global-state-store-manager"; 
Vue.use(SimpleStoreManager);


new Vue({
    el: document.querySelector("#root"),
    
    components: {
      
    },
    
    render(h) {
      return h(AppHome);
    }
    
  });

```
