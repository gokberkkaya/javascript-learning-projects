let script = document.createElement('script');
script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
document.getElementsByTagName('head')[0].appendChild(script);

setTimeout(function(){
  (function ($) {
    $.fn.carouselPlugin = function () {
      return this.each(function () {
    
        var $wrapper = $('.wrapper', this).css('overflow', 'hidden'),
            $slider = $wrapper.find('.list'),
            $items = $slider.find('li'),
            $single = $items.filter(':first'),
            
            singleWidth = $single.outerWidth(),
      
            visible = Math.ceil($wrapper.innerWidth() / singleWidth),
            currentPage = 1,
            pages = Math.ceil($items.length / visible);

            $items.filter(':first').before($items.slice(-visible).clone().addClass('cloned'));
            $items.filter(':last').after($items.slice(0, visible).clone().addClass('cloned'));
            $items = $slider.find('li');

            $items.slice(-visible);
            $wrapper.scrollLeft(singleWidth * visible);

            function gotoPage(page) {
                var dir = page < currentPage ? -1 : 1,
                  n = Math.abs(currentPage - page),
                  left = singleWidth * dir * visible * n;
                
                $wrapper.filter(':not(:animated)').animate({
                  scrollLeft : '+=' + left
                }, 500, function () {
                  if (page == 0) {
                    $wrapper.scrollLeft(singleWidth * visible * pages);
                    page = pages;
                  } else if (page > pages) {
                    $wrapper.scrollLeft(singleWidth * visible);
                    page = 1;
                  }
              
                  currentPage = page;
                });
              
                return false;
              }

            $wrapper.after('<a class="arrow back"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 8.586"><g><g fill="none">'
            +'<path stroke="#555" stroke-linecap="round" d="M2577 1784.713l3.586 3.586 3.586-3.586" transform="translate(0.472 0.707)'
            +' translate(3.821 3) rotate(90) translate(-2579.998 -1784.713)"></path></g></g></svg></a><a class="arrow forward">' 
            +' <svg xmlns="http://www.w3.org/2000/svg" viewBox="3.6 -1 5 8.586"><g><g fill="none"><path stroke="#555" stroke-linecap="round"'
            +' d="M2577 1784.713l3.586 3.586 3.586-3.586" transform="translate(0.472 0.707) translate(3.821 3) rotate(-90)' 
            +'translate(-2579.998 -1784.713)"></path></g></g></svg></a></a>');

            $(".arrow").css({
              
              "width": "18px",
              "position": "absolute",
              "font-weight": "bold",
              "top":"200px",
              "cursor": "pointer",
              "color": "black"
            });

            $(".infiniteCarousel .back").css({
              "left": "-4vw"  
            });
        
            $(".infiniteCarousel .forward").css({
              "right": "-4vw"  
            });

            $('a.back', this).click(function () {
                return gotoPage(currentPage - 1);
            });

            $('a.forward', this).click(function () {
                return gotoPage(currentPage + 1);
            });

            $(this).bind('goto', function (event, page) {
                gotoPage(page);
            });
      });
    };
  
  })(jQuery);


  $(function(){

    $(".footer-content").after('<div class="infiniteCarousel"><h3>You might also like</h3><div class="wrapper">'
    +'</div></div>');

    $(".infiniteCarousel").css({
      "width": "1075px",
      "margin": "auto",
      "position": "relative",
      "font-family": "'Open Sans', sans-serif",
      "height": "500px"
    });

    $(".infiniteCarousel .wrapper").css({
      "overflow": "auto",
      "width": "1075px",
      "min-height": "400px",
      "position": "absolute"
    });
    
    $.ajax({
        url: "https://insider-optimus.herokuapp.com/smart-recommender",
        contentType: "application/json",
        dataType: 'json',
        success: function(result){
            $('.wrapper').append('<ul class="list" style="width: 9999px; margin: 0; padding: 0; position: absolute;"></ul>');
            
            for(let i = 0; i < result.length; i++){
                let li = document.createElement("li");
                li.style.cssText = "display: block; float: left;  width: 215px; padding: .2rem;";
                li.innerHTML = `
                <a href="${result[i].url}" target="_blank" title="${result[i].name}" style="text-decoration: none; color:black">
                    <img src="${result[i].img}" style="width: 100%;">
                    <div style="padding-left:.5rem; padding-right:.5rem;">
                        <h5 style="margin-top:14px; height:32px; overflow: hidden; font-size:14px; font-weight:500;">${result[i].name}</h5>
                        ${result[i].price ? `<span style="color:#193db0; font-size:20px; font-weight:bold;">${result[i].price} TL` 
                            : '<span style="color:grey; display:block; margin-top:15px; font-size:15px;">Stokta Yok'}</span>
                    </div>
                </a>`;
                
                $(".list").append(li);
            }
        }
    })

    $(document).ajaxComplete(function() {
      $(".infiniteCarousel").carouselPlugin();
      });

  });
},100);



