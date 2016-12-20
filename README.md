pageTab组件
===
描述：页面tab标签类，支持同页面多个容器的情况

实现功能：
* 各tab button样式自动切换
* 各tab content区内容展示自动切换
* 提供tab之间切换时所要完成操作的入口函数
* 可单个设定各入口函数的具体实现

使用实例：
---
* 使用方法：
```JS
//示例中假设N为5
var _container =  new pageTab({
	containerID: "container", //container ID
	tabNums: 5, // 5个tab
	showTab: 1, // 激活展示第一个tab及其内容
	tabClass: "tab-item", //标签公用标志类
	contentClass: "content-item", //内容公用标志类
	showClass: "active", //激活tab依赖的class
	initFunc: [ //根据showTab来执行对应的初始化函数，这里将执行tab1的初始化函数
				function() {console.log("初始化tab1")},
				function() {console.log("初始化tab2")},
				function() {console.log("初始化tab3")},
				function() {console.log("初始化tab4")},
				function() {console.log("初始化tab5")}
			],
	switchIn: [ //为方便完整示例，这里给每个tab都设置了函数句柄，实际使用中根据需要传递，默认不传为空
				function() {console.log("进入tab1")},
				function() {console.log("进入tab2")},
				function() {console.log("进入tab3")},
				function() {console.log("进入tab4")},
				function() {console.log("进入tab5")}
			],
	switchOut: [ //同上
				function() {console.log("离开tab1")},
				function() {console.log("离开tab2")},
				function() {console.log("离开tab3")},
				function() {console.log("离开tab4")},
				function() {console.log("离开tab5")}
			]
	});
```
* 其它调用接口:
```JS
//以上例test对象为例
test._setSwitchIn(1, function() {console.log("我把tab1的进入执行函数变喽！")}); //设置进入某个tab item的函数句柄
test._setSwitchOut(1, function() {console.log("我把tab1的离开执行函数变喽！")}); //设置离开某个tab item的函数句柄
test._getTabIndex(); //获取当前活动tab索引
test._destroy(); //关闭该容器函数响应机制
```
===
PS：注意initFunc使用方式，按照当前流程，该数组内指定的每个tab对应的初始化函数都将在每个tab第一次被点击的时候执行，所以各tab在第一次被点击的时候将不会执行其对应的switchIn函数
