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
* HTML代码格式:
```HTML
<Container id="container">
	<Tab>
		<TabItem>第一个tab</TabItem>
		<TabItem>第二个tab</TabItem>
		<TabItem>.........</TabItem>
		<TabItem>第N个tab </TabItem>
	</Tab>
	<Content>
		<ContentItem>tab1内容</ContentItem>
		<ContentItem>tab2内容</ContentItem>
		<ContentItem>........</ContentItem>
		<ContentItem>tabN内容</ContentItem>
	</Content>
</Container>
```
注意：Container, Tab, TabItem, Content, ContentItem可以为任意标签，但请严格按照此上下文格式编写

* JS代码使用方法：
```JS
//示例中假设N为5
var test = pageTab({
	containerID: "container", //container ID
	tabNums: 5, // 5个tab
	showTab: 1, // 激活展示第一个tab及其内容
	showClass: "active", //激活tab依赖的class
	initFunc: [ //根据showTab来执行对应的初始化函数，这里将执行tab1的初始化函数
				function() {console.log("初始化tab1")},
				function() {console.log("初始化tab2")},
				function() {console.log("初始化tab3")}
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
test._destroy(); //关闭该容器函数响应机制
```
