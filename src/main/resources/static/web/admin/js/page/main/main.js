// by Lainfox in PCN - 20130620 
// JS for Main
(function($, Modernizr) {



    $(function() {
		// add width size throttle
		function on_resize(c,t){onresize=function(){clearTimeout(t);t=setTimeout(c,100);};return c;};
		on_resize(function() {
			var width = $(window).width(),
			new_class = width <= 1024 ? 'w1024' : '';
			$(document.body).removeClass('w1024').addClass(new_class);
			
			// Reset service handle
			$services = $('body .services').parent();
			$services.removeClass('toLast toFirst');
		})();


		/* 
		* Promotion 
		*/
		$promotion = {
			  promotion : $('#promotion')
			, item: $('#promotion .jcarousel > ul > li')
			, pos : 0
			, limit : $('#promotion .jcarousel > ul > li').size()
			, handler: $('#promotion .handle-bar')
			, autoHandler : $('#promotion .handle-bar .autoplay')
			, timer : ''
			, delay : 10000
			, autoFlag : false
			, hoverFlag : false
			, init : function() {
				var _this = this;
				this.change(0) // Init

				this.handler.find('.nav-promotion').click(function(ev){
				  ev.preventDefault();
				  ev.stopPropagation();
				  $(this).focus();
				  _this.change( $(this).index() -1 ); // remove autoplay button index integal
				});
				
				this.autoHandler.click(function(ev){
				  ev.preventDefault();
				  ev.stopPropagation();
				  if( $(this).hasClass('toplay') ) {
					  _this.autoFlag = true;
					  _this.start(_this.delay);	
					  $(this).removeClass('toplay');
				  }
				  else {
					   _this.autoFlag = false;
					   _this.pause();
					   $(this).addClass('toplay');
				  }				  
				});
				

				// Mouse handle
				this.promotion.mouseenter(function(){
					_this.hoverFlag = true;
					if( _this.autoFlag ) _this.pause();
				}).mouseleave(function(){
					_this.hoverFlag = false;
					//console.log('leave?')
					if( _this.autoFlag ) {						
						_this.pause();
						_this.start();
					}
				});

				// Keyboard handle
				this.promotion.find('*').focus(function(){
					if( _this.autoFlag ) _this.pause();
				}).blur(function(){					
					if( _this.autoFlag ) {
						_this.pause();
						_this.start();
					}
				});

				// Extra 
				// promotion services
				$('.service-handle')
					.find('.toFirst').on('click',function(ev){
						ev.preventDefault();
						if( _this.autoFlag ) _this.pause();

						$services = $('body.w1024 .services').parent();
						if( $services.hasClass('toLast') ) $services.removeClass('toLast')
						else $services.addClass('toFirst')
					}).end()
					.find('.toLast').on('click',function(ev){
						ev.preventDefault();
						if( _this.autoFlag ) _this.pause();

						$services = $('body.w1024 .services').parent();
						if( $services.hasClass('toFirst') ) $services.removeClass('toFirst')
						else $services.addClass('toLast')
					})
				
				// start auto play
				this.start( _this.delay );
			  }
			, change : function(node) {				
				var _this = this;
				this.pos = node;
				//console.log( 'change to ' + node );
				this.handler.find('.nav-promotion').eq(node).addClass('current').siblings().removeClass('current');
				this.item.eq(node).stop(true,false).fadeTo('slow',1).css({'display':'block','z-index':9})
					.siblings().stop(true,false).fadeTo('slow',0).css('z-index',-1);				
			  }
			, auto : function(delay) {
				var _this = this;
				this.timer = setInterval(function(){
					var targetPos = ( _this.pos +1 >= _this.limit ) ? 0 : _this.pos +1;
					_this.change( targetPos );
				}, delay);
			  }
			, pause : function() {
				var _this = this;
				clearInterval( _this.timer );
			  }
			, start : function() {				
				var _this = this;
				_this.autoFlag = true;
				this.auto( _this.delay );
			  }
			
		}, $promotion && $promotion.init();

		
		
			
		/* 
		* News 
		*/
		var newsList = function()
		{
			var idx = 0;
			$('.news-section .btn-prev')
			$('.news-section .btn-next')			
			var lengths = $('.news-section .news-list li').length;
			function newsMore(idx) {
				log( idx + ' / ' + lengths );
				$('.news-section .news-list li').hide().eq(idx).show()
			}

			$('.news-section .btn-prev').click(function(ev){
				ev.preventDefault();
				idx = idx -1;
				if( idx < 0 ) idx = lengths -1;
				newsMore(idx);
			});
			$('.news-section .btn-next').click(function(ev){
				ev.preventDefault();
				idx = idx +1;
				if( idx >= lengths ) idx = 0;
				newsMore(idx);
			});
		}.call(this);

		
    });
})(jQuery, Modernizr);

