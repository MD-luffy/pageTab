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
```JSI
//示例中假设N为5
var test = pageTab({
	containerID: "container", //container ID
	tabNums: 5, // 5个tab
	showTab: 1, // 激活展示第一个tab及其内容
	showClass: "active", //激活tab依赖的class
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

