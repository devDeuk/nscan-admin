// by Lainfox in PCN - 20131021 
!function($, window) {
	TGate = {};
	TGate.Foo = function(){};
	
	// 2016.11.23 : 마우스 오른쪽 버튼 금지 추가
	// document.oncontextmenu = function(e) {
	// 	return false;
	// }
	
	//var ua = detect.parse(navigator.userAgent);
	//$('html').addClass( ua.browser.family );
	
	
	conditionizr.add('chrome', ['class'], function () {
		return !!window.chrome && /google/i.test(navigator.vendor);
	});
	conditionizr.add('safari', ['class'], function () {
		return /constructor/i.test(window.HTMLElement);
	});
	conditionizr.add('firefox', ['class'], function () {
		return typeof InstallTrigger !== 'undefined';
	});
	conditionizr.add('opera', ['class'], function () {
		return !!window.opera || /opera|opr/i.test(navigator.userAgent);
	});
	conditionizr.add('android', ['class'], function () {
		return /Android/i.test(navigator.userAgent);
	});
	


	conditionizr.add('ie8', ['class'], function () {
		return document.all && document.querySelector && !document.addEventListener;
	});

	
	conditionizr.add('ie7', ['class'], function () {
		return document.all && !document.querySelector;
	});



	var IS_ANDROID = navigator.userAgent.match(/Android/i)  != null;
	if(IS_ANDROID)
	{
		$('html').addClass('android');
	}


	$(function(){
		// ����ƼĿ		
		if( $('.notice-alarm').length > 0 ) 
		{
			var $newsTicker = $('.notice-alarm');
			setTimeout(function(){				
				$newsTicker.vTicker({
					speed: 700, // ������ �̵��ϴ� �ð� ( 700 = 0.7�� )
					pause: 5000, // �̵� ������ ������ �ð� ( 5000 = 5�� )
					showItems: 1,
					animation: 'fade',
					mousePause: true,
					height: '37px',
					direction: 'up'
				},500);
			});			
		}		


		// GNB hover delay & focus
		$('#gnb > li').filter('.current').attr('data-current',true).end()
			.hover(
			function(){	
				$(this).siblings('.current').removeClass('current');
				$(this).addClass('active') 
			}
			, function(){
				$(this).siblings("[data-current='true']").addClass('current')
				$(this).removeClass('active') 
			}
			, 200
		)
		
		// All check
		$('#selectAll').change(function() {
			var $this = $(this);

			var $target;
			if( $(this).data('target') == 'innerTable' ) $target = $('.innerTable');
			else $target = $(this).closest('table');

			var checkboxes = $target.find('input:checkbox');
			if( checkboxes.length == 0 ) var checkboxes = $target.find('input:checkbox');
			
			
			/*
			if($(this).is(':checked')) {
				checkboxes.prop('checked', true);
			} else {
				checkboxes.prop('checked', false);
			}
			*/

			checkboxes.prop('checked', ($this.is(':checked')) ? true : false );
		});

		
		
		// ��� ��η� ����� �ּ���. '/' �� ���� �Ǵ� http ��
		/*
		conditionizr.polyfill('/web/admin/js/lib/html5shiv.js', ['ie7', 'ie8']); // Polyfill
		conditionizr.polyfill('/web/admin/js/lib/IE7.js', ['ie7']); // Polyfill
		conditionizr.polyfill('/web/admin/js/lib/IE8.js', ['ie8']); // Polyfill
		*/
		if( conditionizr.ie7 || conditionizr.ie8 )  // IE 7,8
		{
			$('body > #content').wrap('<div id="ieContent"></div>');

			// �˾�â�� �ƴҶ��� html �� overflow auto ����
			if( !$('body').hasClass('popup') ) $('html').css('overflow','auto');
		}
		
	}); // end Document ready

}(window.jQuery, window);




function popup(url,width,height) {
	var opt = 'width=' + width + ',height=' + height;
	newwindow = window.open(url,'name', opt);
	if(window.focus) { newwindow.focus() }
	return false;
}
