- 在`Header.vue`中,`class="support"`的`div`为什么要加`v-if`?

一方面是如果该店铺没有活动,那么不生成该`dom`节点

另一方面是,如果是有活动的,但我们的数据是从`App.vue`中通过`ajax`异步获取并传递过来的,所以中间有一个环节,从`App.vue`中传递过来的`seller`对象是空对象,那么浏览器会报错.虽然到最后,还是成功加载出来了,但如果用户网速不给力的情况下,就是一件影响用户体验的事情了

- 为什么在`<style>`中不能使用`webpack`配置的别名路径(即相当于`src`的`@`)?

别名路径是针对`js`的,也就是说,只有在js中进行引用的时候,才能使用别名路径

- 为什么dom结构嵌套多层的时候,最好把深层次的添加`class`

一方面可以减少书写css时候的长度;另一方面,通过`class`来查找元素的性能比只是标签名查找元素的性能要来的好

- 在`vue`中可以获取`dom`节点,通过使用在节点上使用`ref="xxx"`,在实例中使用`this.$refs.xxx`.注意,在节点上写的时候,不能用横杠写法,因为这样写在实例中写驼峰是获取不到的

- 为什么要使用`Vue.set`?

当对一个对象动态添加一个新属性的时候,js是不能响应式检测到的,所以我们要手动使其能够检测到

- 在自适应的状态下,怎么解决因为宽度是整屏幕宽,却要求高度和宽度保持一个尺寸的问题

```html
<style>
.image-header{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%; //padding的四个方向的100%都是计算盒模型的宽度
}
.image-header img{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
</style>
<div class="image-header">
    <img :src="food.image">
</div>
```

- 如何在组件里面使用`central event bus`

在初始化web app的时候,给data添加一个 名字为`bus`的空vue对象

```javascript
new Vue({
    el: '#app',
    router,
    render: h => h(App),
    data: {
    bus: new Vue()
    }
})
```

好的 这个时候 你就可以一劳永逸了,在任何组件都可以调用事件发射 接受的方法了.

如何获取到这个空的vue对象`bus`呢.在组件里面直接调用这个

某一个组件内调用事件触发

```javascript
//通过this.$root.bus获取此对象
//调用$emit 方法
this.$root.bus.$emit('YOUR_EVENT_NAME', yourData)
```

另一个组件内调用事件接受,当然在组件销毁时接触绑定,使用`$on`方法

```javascript
this.$root.bus.$on('YOUR_EVENT_NAME', (yourData)=>{
    handle(yourData)
} )
```