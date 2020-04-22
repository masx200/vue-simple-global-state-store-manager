# 注意,此代码存储库已被弃用,不会再更新维护了.

# Note that this code repository has been deprecated and will not be updated and maintained.











# vue-simple-global-state-store-manager













此代码库仅供学习交流使用

适用于`Vue.js`的极简全局状态管理库,基于`Proxy`和 `EventTarget`实现

此库需要使用 vue2.x 的 api

https://github.com/masx200/vue-simple-global-state-store-manager

希望世上再无 难用的全局状态管理！

## 使用简单,可能是使用方法最简单的全局状态管理工具！

使用步骤只有两步，初始化全局状态，组件状态与全局状态双向绑定

跟其他全局状态管理工具相比，使用这个库对于原有的代码不需要太多的修改

## 组件状态与全局状态双向绑定

组件状态改变时全局状态改变

全局状态改变时组件状态改变

# 局部安装

```powershell
cnpm install  --save https://github.com/masx200/vue-simple-global-state-store-manager.git
```

或者

```powershell
yarn add https://github.com/masx200/vue-simple-global-state-store-manager.git
```

## 用法

```javascript
import SimpleStoreManager, {
    bindGlobalStore,
    initGlobalState,
    getGlobalStates,
} from "@masx200/vue-simple-global-state-store-manager";
```

使用前先使用`Vue.use(SimpleStoreManager)`注册一下

### 函数`getGlobalStates`用来读取全局状态

### 函数`initGlobalState`用来生成状态初始值，可以多次使用

第一个参数为一个`object`，键名为全局状态名，值为全局状态初始值

### 函数`bindGlobalStore`用来订阅全局状态，组件状态与全局状态双向绑定，

第一个参数为一个`object`， 键名为全局状态名，值为组件状态名称

第二个参数为一个`object`或者`function`，是`vue`组件的构造参数或者`vue`组件的构造函数

返回值是`vue`组件的构造函数

# 示例

`index.js`

```js
import Vue from "vue";

import SimpleStoreManager, {
    bindGlobalStore,
    initGlobalState,
} from "@masx200/vue-simple-global-state-store-manager";

Vue.use(SimpleStoreManager);

initGlobalState({
    globaltestname: "helloworld-使用全局状态管理",
});

import AppHome from "./apphome.vue";

new Vue({
    el: document.querySelector("#root"),

    render(h) {
        return h(AppHome);
    },
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
        <button
            class="btn btn-outline-success btn-lg"
            v-on:click="changevalue()"
        >
            修改testname
        </button>
    </div>
</template>
<script>
    import {
        initGlobalState,
        bindGlobalStore,
    } from "@masx200/vue-simple-global-state-store-manager";

    initGlobalState({
        globaltestname: "helloworld-使用全局状态管理",
    });

import Vue from "vue";

    const comp = Vue.extend({
        methods: {
            changevalue() {
                this.testname =
                    Math.random() > 0.5
                        ? this.testname + "te--"
                        : "--st" + this.testname;
            },
        },
        data() {
            return { testname: "helloworld-test使用全局状态管理" };
        },
    });

    const comfu = bindGlobalStore(
        {
            globaltestname: "testname",
        },

        comp
    );

    export default comfu;
</script>
```

# 演示网址

https://masx200.github.io/my-vue-router-project/index.html#/vue-simple-global-state-store-manager

# 为什么要写这个状态管理工具？

因为

现有的 redux，mobx，vuex 等等管理工具使用太过繁琐，

不喜欢那些使用特别麻烦的状态管理工具

这个状态管理工具可能是学习成本和使用成本最低的

状态双向绑定使用非常简单

# 原理

使用事件发布者订阅者模式来同步状态

基于`EventTarget`

使用了通过在`EventTarget`上触发事件和接收事件的方式，来通知组件刷新，一个事件触发对应多个事件监听

当组件被卸载时，清除事件监听器，防止内存泄漏

当组件挂载之后,会自动同步全局状态

由于事件监听函数是异步执行，所以组件状态刷新也是异步执行的

初始化全局状态时，如果当前全局状态已经存在，则不会重复初始化

使用`Proxy`来代理组件的构造函数，适配`vue-loader`，`vue-loader`会把预编译好的`render`函数等参数添加到`vuecomponent`构造函数的`options`属性上

返回的构造函数生成的实例是被 `Proxy`代理的`vue`组件实例，监听组件的状态变化和挂载卸载事件

# Vue

Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用

https://cn.vuejs.org/v2/guide/

# Proxy

Proxy 对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）。

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy

在 2019 年，除了 IE 浏览器之外的浏览器都已经支持 Proxy 了

可以尝试添加 proxy 的 polyfill，不能保证在 IE 浏览器上正常运行

https://github.com/GoogleChrome/proxy-polyfill

# EventTarget

EventTarget 是一个由可以接收事件的对象实现的接口，并且可以为它们创建侦听器

https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget

IE 浏览器需要添加 EventTarget 的 polyfill 和 Event 构造函数 polyfill

https://github.com/mysticatea/event-target-shim

https://github.com/masx200/webpack-react-vue-spa-awesome-config/blob/master/polyfill/polyfill.min.js
