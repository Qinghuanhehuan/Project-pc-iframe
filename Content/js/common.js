//slideBtn下拉   传入slide-container
function SlideFn(ele){
	return function(){
		//表单区域下拉
		var open = true;
		var sliderCon = ele;
		var tableMenu = ele.siblings('.table-menu');
		var slideBtn = ele.children('.toggle-slide');
		var sliderReg = ele.children('.select-region');
//		var tableBody = tableMenu.children('.table-body');
//		var page = tableMenu.children('#page');
//		var tableTitle = tableMenu.children('.table-title');
		var rightCon = ele.parent();
		var h = sliderCon.height();
		var maxHeight = 122;//max-height
		
		sliderCon.css('height',h);
		
		window.addEventListener('resize',function () {
	    	h = sliderReg.height();
			if(h > maxHeight && open==true){
	    		sliderCon.css('height',h+10+'px');
	    		slideBtn.css('bottom',0);
	    	}
			if(slideBtn.css('display')=='none'){
	    		sliderCon.css('height',h+10+'px');
	    		tableMenu.css('marginTop', (h+20)+'px');
			}
		});
		
		if(h < maxHeight){
	        slideBtn.hide();
	    	tableMenu.css('marginTop', (h+10)+'px');
//	    	tableMenu.css({'marginTop': (h+10)+'px', 'height':(rightCon.height()-h-3)+'px'});
	    	sliderCon.css('paddingBottom',0);
	    }else{
	        tableMenu.css('marginTop', (maxHeight+20)+'px');
//	        tableMenu.css({'marginTop': (maxHeight+20)+'px', 'height':(rightCon.height()-maxHeight-13)+'px'});
	    	slideBtn.show();
	    }
//	    tableBody.css('height', (tableMenu.height()-page.height()-tableTitle.height()-40)+'px');
	    
	    slideBtn.click(function(){
	    	if(open){
            	sliderCon.css('height', maxHeight+'px');
//	            $(this).removeClass('arrowRotate180').addClass('arrowRotate0');
	            open = false;
	        }else{
	    		h = sliderReg.height();
	            sliderCon.css('height', (h+15)+'px');
//	            $(this).removeClass('arrowRotate0').addClass('arrowRotate180');
	            open = true;
	        }
	    })
	}
}

//layui带来的bug，计算table宽度
function ComputeWidth(ele){
	console.log(ele)
	return function(){
		var $layuiTable = ele;
		if($layuiTable.width()){
			setTimeout(function(){
//				console.log($layuiTable.width())
				$('.layui-table-view').css('width',$layuiTable.width()+1+'px');
			},10)
		}else{
			setTimeout(function(){
				computeWidth();
			},10)
		}
	}	
}
