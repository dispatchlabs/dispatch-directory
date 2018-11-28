$(document).ready(function() {
	var $json =	[
	{
		id: 1,
		label: "Baremetrics",
		category: "Analytics",
		tagline : "Get deep business analytics and insights from your Stripe data.",
		icon: "img/mp-logos/baremetrics.png"
	},
	{
		id: 2,
		label: "ZenHub",
		category: "CRM",
		tagline : "Agile project management within GitHub",
		icon: "img/mp-logos/9.png"
	},
	{
		id: 2,
		label: "ZenHub 2",
		category: "CRM",
		tagline : "Agile project management within GitHub",
		icon: "img/mp-logos/9.png"
	},
	{
		id: 3,
		label: "Travis CI",
		category: "Automation",
		tagline : "Test and deploy with confidence",
		icon: "img/mp-logos/4.png"
	},
	{
		id: 4,
		label: "Blackfire.io",
		category: "Customer Support",
		tagline: "Fire up your PHP Apps Performance",
		icon: "img/mp-logos/72.png"
	},
	{
		id: 4,
		label: "Percy",
		category: "Financing",
		tagline: "Continuous visual testing and reviews for web apps",
		icon: "img/mp-logos/92.png"
	}
];
	
	$('.sidebar-toggle button').on('click', function() {
		if( $(this).hasClass('active') ) {
			$('.sidebar').fadeOut(400).css({'left':'-100%'});
			$(this).removeClass('active');
		}
		else {
			$('.sidebar').fadeIn({queue: false, duration: 'slow'});
			$('.sidebar').animate({ left: "-15px" }, 'slow');
		
			$(this).addClass('active');
		}
	});
	
	
	/*if( $.fn.bxSlider) {
		$('.thumb-slider ul').bxSlider();
	}*/
	
	
	var obj = $("#IntegrationSearch").autocomplete({
		source: $json,
		select: function( event, ui ) {

			$("#IntegrationSearch").val( ui.item.label );
			var html = '<a class="Integration-box" href="detail-page.html" data-slug="'+ ui.item.label +'" data-context="'+ ui.item.category +'">';			
				html += '<div class="row">';
				html += '<img class="Integration-Icon" src="'+ ui.item.icon +'">';
				html += '<div class="Integration-Detail">';
				html += '<h3>'+ ui.item.label +'</h3>';
				//html += '<p class="IntegrationCategory">'+ ui.item.category +'</p>';
				html += '<p class="IntegrationTagline">'+ ui.item.tagline +'</p></div></div></a>';
				
			$('.main-content').html(html);
			return false;
		}
	}).autocomplete( "instance" );
	
	obj && (obj._renderItem = function( ul, item ) {
      return $( "<li>" )
        .append( "<div>" + item.label + "</div>" )
        .appendTo( ul );
    });
	
	$( "#IntegrationSearch" ).on( "autocompletechange", function( event, ui ) {
		if( $(this).val().length < 1 ) {
			$('.main-content').html('');
		}
	});
	
	
/*	var keys = $.map($json, function(item, key) {
	  return item.category;
	});
	$( "[data-category]").on('click', function(e){
		e.preventDefault();
		
		var $cat = $(this).attr('data-category');
		
		console.log(keys);
	});*/
	
	$( "[data-category]").on('click', function(e){
		e.preventDefault();
		var $cat = $(this).attr('data-category');
		
		$('[data-category]').parent().removeClass('active');
		$(this).parent().addClass('active');
		
		if( $cat === '*'){
			$('.main-content').find('[data-context]').fadeIn();
		}
		else {
			$('.main-content').find('[data-context]').hide();
			$('.main-content').find('[data-context="'+$cat+'"]').fadeIn(800);
		}
	});
	/*$("#IntegrationSearch").autocomplete({
		source: function (request, response) {
			var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
			$.ajax({
				url: "data/data.json",
				dataType: "json",
				success: function (data) {
					var html = '';
					response($.map(data, function(v,i){
						var text = v.name;
						if ( text && ( !request.term || matcher.test(text) ) ) {
							
							return {
								label: v.name,
								value: v.name
						   };
						}
					}));
					
					$('.main-content').append(html);
				}
			});
		}
	});*/
	
	
});