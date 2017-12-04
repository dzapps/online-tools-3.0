

// ID of the Google Spreadsheet
 var spreadsheetID = "1P9eq5Mco0cg7h5DZRaxNt45o5r5TS-7NJlqOKXJbG1c";

 // Make sure it is public or set to Anyone with link can view 
 var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";

 $.getJSON(url, function(data) {

  var entry = data.feed.entry;

  $(entry).each(function(){
    // Column names are name, age, etc.
	  
	  
	  
    $('.results').prepend('<li class="card  '+this.gsx$category.$t+' '+this.gsx$usage.$t+'"> <a href="'+this.gsx$url.$t+'">'+'<img class="favico"   src="http://favicon.yandex.net/favicon/'+this.gsx$url.$t+'"><h2>'+this.gsx$title.$t+'</h2><p>'+this.gsx$descreption.$t+'</p>'+'<div class="grade">'+this.gsx$grade.$t+'</div>'+'</a></li>');
  });

 });

// external js: isotope.pkgd.js
$( document ).ajaxComplete(function() {
  
// Or, hide them
$("img").error(function() {
  $(this).hide();
});

$('.header .button').on('click', function() { $('.header .button').toggleClass('is-checked')
          $('.menudiv').toggleClass('open')
           $('#list').toggleClass('mini')
        });

// quick search regex
var qsRegex;
var buttonFilter;
//favico  

  
// init Isotope

var $grid = $('#list').isotope({
  itemSelector: '.card',
 layoutMode: 'masonry',
  filter: function() {
    var $this = $(this);
    var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
    var buttonResult = buttonFilter ? $this.is( buttonFilter ) : true;
    return searchResult && buttonResult;
  }
});
  $('.filters').on('click', '.button', function() {
     buttonFilter = $( this ).attr('data-filter');
  $grid.isotope();
});

// use value of search field to filter
var $quicksearch = $('.quicksearch').keyup( debounce( function() {
  qsRegex = new RegExp( $quicksearch.val(), 'gi' );
  $container.isotope();
 }) );


  // change is-checked class on buttons
$('.button-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});
   //todo  
$('.quicksearch').keyup(function() {
  $('.filters p button').addClass('typing').delay(1000).queue(function(next){
    $(this).removeClass("typing");
    next();
});
   });
// debounce so filtering doesn't happen every millisecond
function debounce( fn, threshold ) {
  var timeout;
  return function debounced() {
    if ( timeout ) {
      clearTimeout( timeout );
    }
    function delayed() {
      fn();
      timeout = null;
    }
    setTimeout( delayed, threshold || 100 );
  };
}


});
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

function insertAfter(newElement,targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement,targetElement.nextSibling);
  }
}

function faviconize() { 
  if (!document.getElementsByTagName) return false;
  if (!document.createElement) return false;
  var links = document.getElementsByTagName("a");
  	for (var j=0; j<links.length; j++) {
  		var hoststring = /^http:/;
  		var hrefvalue = links[j].getAttribute("href",2);
		if (hrefvalue.search(hoststring) != -1) {
			var domain = hrefvalue.match(/(\w+):\/\/([^/:]+)(:\d*)?([^# ]*)/);
			domain = RegExp.$2;
			var cue = document.createElement("img");
			cue.className = "faviconimg";
			var cuesrc = "http://"+domain+"/favicon.ico";
			cue.setAttribute("src",cuesrc);
			cue.onerror = function () {
				this.src = "external.gif";
				}
			insertAfter(cue,links[j]);
		}
	}
}$( document ).ajaxComplete(function() {
//addLoadEvent(faviconize);
});
