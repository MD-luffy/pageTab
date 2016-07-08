/**
 * 页面tab标签类，支持同页面多个容器的情况
 * @param  {Object} options 初始化传值对象
 * @param {String} options.containerID 页面容器ID，必填参数
 * @param {Number} options.tabNums 页面tab个数，必填参数
 * @param {String} [options.clickType="click"] tab点击事件类型，默认为click事件
 * @param {Number} [options.showTab=1] 激活哪个tab展示，默认为激活第一个tab
 * @param {String} options.showClass 激活对应tab所依赖的class样式，必填参数
 * @param {Array} [options.initFunc=[]] 根据showTab来执行对应的tab初始化函数
 * @param {Array} [options.switchIn=[]] 该数组存放每个tab在进入的时候需要执行的函数句柄，默认为null
 * @param {Array} [options.switchOut=[]] 该数组存放每个tab在离开的时候需要执行的函数句柄，默认为null
 * @example
 *  HTML代码部分：
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
		说明：
			Container, Tab, TabItem, Content, ContentItem可以为任意标签，但请严格按照此上下文格式编写
	JS使用部分：(假设N为5)
		var test = pageTab({
			containerID: "container", //container ID
			tabNums: 5, // 5个tab
			showTab: 1, // 激活展示第一个tab及其内容
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
 */
var pageTab = function(options) {
    this.options = {
        containerID: "",
        tabNums: null,
        clickType: "click",
        showTab: 1,
        showClass: "",
        initFunc: [],
        switchIn: [],
        switchOut: []
    };
    /*
     *	每个容器对应一个handleEvent，用于处理当前容器tab点击事件
     */
    this.handleEvent = function(e) {
        var swin, swout, oldItem, newItem, ele = e.target,
            parent = this.tabItem.parentNode,
            options = this.options,
            contentItem = this.contentItem,
            tabItem = this.tabItem;
        // e.preventDefault();
        e.stopPropagation();
        if (parent === ele.parentNode) { //保证是tab直接子元素被点击
            if (!$(ele).hasClass(options.showClass)) { //处理非激活tab点击
                oldItem = $(parent).children().index(tabItem);
                newItem = $(parent).children().index(ele);
                // 执行离开tab函数
                typeof(swout = options.switchOut[oldItem]) === "function" && swout();
                // tab和content区展示更新
                $(tabItem).removeClass(options.showClass);
                $(ele).addClass(options.showClass);
                $(contentItem).hide();
                $(contentItem.parentNode).children().eq(newItem).show();
                // 执行进入tab函数
                typeof(swin = options.switchIn[newItem]) === "function" && swin();
                // 更新tabIndex, tabItem，contentItem状态
                this.tabIndex = newItem + 1;
                this.tabItem = ele;
                this.contentItem = $(contentItem.parentNode).children()[newItem];
            }
        }
    };
    // 初始化this.options值
    for (var i in options) {
        this.options[i] = options[i];
    }
    try {
        // 判断HTML格式是否合法
        if (!this.isFormatCorrect(this.options.containerID)) {
            throw new Error("Tab容器HTML格式不正确!");
        } else {
            // 初始化tabIndex, tabItem, contentItem
            this.tabIndex = this.options.showTab;
            this.tabItem = $("#" + this.options.containerID).children().first().children()[this.options.showTab - 1];
            this.contentItem = $("#" + this.options.containerID).children().last().children()[this.options.showTab - 1];
            // 初始化处理程序
            this.init();
        }
    } catch (e) {
        alert(e.message);
    }
};
/*
 * pageTab对象属性
 */
pageTab.prototype = {
    /**
     * [init description]
     * @private
     */
    init: function() {
        var me = this;
        $(me.tabItem).addClass(me.options.showClass); //初始化展示各tab样式
        $.each($(me.contentItem).parent().children(), function(index, item) { //初始化展示内容区
            if (me.options.showTab === index + 1) {
                $(item).show();
		//执行初始化TAB的初始化函数
		typeof me.options.initFunc[me.options.showTab - 1] === "function" && me.options.initFunc[me.options.showTab - 1]();
            } else {
                $(item).hide();
            }
        });
        //绑定事件处理程序
        me.bindEvent();
    },
    /**
     * [bindEvent description]
     * @private
     */
    bindEvent: function() {
        this.tabItem.parentNode.addEventListener(this.options.clickType, this); // 传递this对象，click将触发handleEvent函数
    },
    /**
     * [isFormatCorrect description]
     * @param  {String}  containerID 容器ID
     * @private
     * @return {Boolean} true: HTML格式合法  false: HTML格式非法
     */
    isFormatCorrect: function(containerID) {
        var container = $("#" + containerID),
            node,
            me = this;
        if (!container.length) {
            console.log("ID为：" + containerID + "的DOM节点不存在！");
            return false;
        } else {
            var contents = container.children(),
                isCorrect = true;
            if (contents.length === 2) {
                contents.each(function(index, item) {
                    if ($(item).children().length !== me.options.tabNums) {
                        console.log("tab个数和设置个数不一致！");
                        return isCorrect = false;
                    }
                    $(item).children().each(function(index, item) {
                        if (index === 0) {
                            node = item.nodeName;
                        } else {
                            if (node !== item.nodeName) {
                                console.log("tab标签不一致！");
                                return isCorrect = false;
                            }
                        }
                    });
                });
                if (!isCorrect) {
                    return false;
                }
            } else {
                console.log("tab容器子节点个数不为2！");
                return false;
            }
        }
        return true;
    },
    /**
     * 销毁对象（目前只是把tab点击事件取消了），供外部JS调用
     * @public
     */
    _destroy: function() {
        this.tabItem.parentNode.removeEventListener(this.options.clickType, this);
    },
    /**
     * 设置进入某个tab item的函数句柄，供外部JS调用
     * @param {Number} whichTab 	tab item, 最小值为1，必填参数
     * @param {Function} func     	对应函数句柄，必填参数
     * @example
       		test._setSwitchIn(1, function() {console.log("我把tab1的进入执行函数变喽！")});
     */
    _setSwitchIn: function(whichTab, func) {
        this.options.switchIn[whichTab - 1] = func;
    },
    /**
     * 设置离开某个tab item的函数句柄，供外部JS调用
     * @param {Number} whichTab 	tab item, 最小值为1，必填参数
     * @param {Function} func     	对应函数句柄，必填参数
     * @example
     		test._setSwitchOut(1, function() {console.log("我把tab1的离开执行函数变喽！")});
     */
    _setSwitchOut: function(whichTab, func) {
        this.options.switchOut[whichTab - 1] = func;
    },
    /**
     * 获取当前活动tab索引
     * @return {int} 活动tab索引值
     */
    _getTabIndex: function() {
	return this.tabIndex;
    }
}
