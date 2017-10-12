var loading = false;
var addTabs = function (addTabsid, addTabsname, addTabsurl, addTabsclose, type) {
       if (loading){
           return;
       }
    var obj = {
        id: addTabsid,
        title: addTabsname,
        url: addTabsurl,
        close: addTabsclose
    };
    var id = "tab_" + obj.id;
    $(".active").removeClass("active");
    var content;
    if (!$("#" + id)[0]) {
        //创建新TAB的title
        var title = '<li role="presentation" id="tab_' + id + '"><a href="javascript:void(0);' + id + '" aria-controls="' + id + '" role="tab" data-toggle="tab" title="' + obj.title + '">' + obj.title;
        //是否允许关闭
        if (!obj.close) {
            title += ' <img  class="glyphicon-remove"  aria-hidden="true" tabclose="' + id + '"/>';
        }
        title += '</a></li>';
        //是否指定TAB内容
        if (obj.content) {
            content = '<div role="tabpanel" class="tab-pane" id="' + id + '">' + obj.content + '</div>';
        } else { //没有内容，使用IFRAME打开链接
            content = '<div role="tabpanel" class="tab-pane" id="' + id + '"><iframe id="iframe-' + id + '" src="' + obj.url + '" width="100%" ' +
                ' frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="yes" allowtransparency="yes"></iframe></div>';
               loading = true;
        }
        //加入TABS
        $(".nav-tabs").append(title);
        $(".tab-content").append(content);
    }
    else {
        if (type == 0) {
            //移除内容重新加载
            $("#" + id).remove();
            if (obj.content) {
                content = '<div role="tabpanel" class="tab-pane" id="' + id + '">' + obj.content + '</div>';
            } else { //没有内容，使用IFRAME打开链接
                content = '<div role="tabpanel" class="tab-pane" id="' + id + '"><iframe id="iframe-' + id + '"src="' + obj.url + '" width="100%" ' +
                    ' frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="yes" allowtransparency="yes"></iframe></div>';
            }
            $(".tab-content").append(content);
        }
    }
       //判断iframe是否加载完成
       var iframe = document.getElementById("iframe-" + id);
       if (!/*@cc_on!@*/0) { //if not IE
           iframe.onload = function () {
               console.log("Local iframe is now loaded.1");
               loading = false;
           };
       } else {
           iframe.onreadystatechange = function () {
               if (iframe.readyState == "complete") {
                   console.log("Local iframe is now loaded.2");
                   loading = false;
               }
           }
       }
    var tabcount = $(".nav-tabs li").size();
    if (tabcount > 8) {
        $(".nav-tabs li").eq(1).remove();
        $(".tab-content div").eq(1).remove();
    }
    //激活TAB
    $("#tab_" + id).addClass('active');
    $("#" + id).addClass("active");
    if(!($("#" + id.substring(4)).hasClass('menu-dropdown'))){//一级
        $("#" + id.substring(4)).parent("li").addClass('active').siblings('').removeClass('active');
    }
    $("#tab_" + id).click(function() {
        addTabs(addTabsid, addTabsname, addTabsurl, addTabsclose);
    });
    //hover出现图标
    $(".nav-tabs li a ").hover(function() {
        $(this).find('.glyphicon-remove').css({'display': 'inline-block','height':'15px'}).attr('src', 'Content/css/Common/icons/close_icon.png');
    }, function() {
        $(this).find('.glyphicon-remove').removeAttr('src').css('display', 'none');
    });
    $(window).resize();
};

var closeTab = function(id) {
    //如果关闭的是当前激活的TAB，激活他的前一个TAB
    if ($(".nav-tabs li.active").attr('id') == "tab_" + id) {
    
        $("#tab_" + id).prev().addClass('active');
        $("#" + id).prev().addClass('active');
    }
    //关闭TAB
    $("#tab_" + id).remove();
    $("#" + id).remove();
    $(".nav-tabs li.active").trigger('click')//2017年9月14日15:43:18
};

var closeTabByTitle = function(title) {
    var tabId = $('.nav-tabs').find("a[title='" + title + "']").attr("aria-controls");
    //如果关闭的是当前激活的TAB，激活他的前一个TAB
    if ($("li.active").attr('id') == "tab_" + tabId) {
        $("#tab_" + tabId).prev().addClass('active');
        $("#" + tabId).prev().addClass('active');
    }
    //关闭TAB
    $("#tab_" + tabId).remove();
    $("#" + tabId).remove();
};

$(function() {
    //默认首页 不可关闭
    addTabs("home_manage", "欢迎页", "welcome.html", true, 0);
    $("[addtabs]").click(function() {
        addTabs($(this).attr("id"), $(this).attr('title'), $(this).attr('url'), false, 0);
    });

    $(".nav-tabs").on("click", "[tabclose]", function(e) {
        var id = $(this).attr("tabclose");
        closeTab(id);
    });

    $("#closealltabs").click(function() {
        $("#tab_tab_home_manage").nextAll().remove();
        $("#tab_home_manage").nextAll().remove();
        $("#tab_tab_home_manage").addClass('active');
        $("#tab_home_manage").addClass("active");
    });
    $(window).resize(function () {
        $('iframe').attr('height', ($(window).height() -100) + "px");
    });
    $(window).resize();
});

