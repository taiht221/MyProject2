
/*
 * jQuery autoResize (textarea auto-resizer)
 * @copyright James Padolsey http://james.padolsey.com
 * @version 1.04
 */

$(document).ready(function(){ 
    if(window.innerWidth > 600){
        let menuHeight = $(".btn-menu").offset().top
        function menuTop(){
            if ($(this).scrollTop() >= menuHeight) { 
                $('.navbar').slideDown(); 
                $(".btn-menu").hide();
            } else { 
                $(".btn-menu").show();
                $('.navbar').slideUp(); 
                
            } 
        };
        menuTop();
        $(window).scroll(menuTop);
    }
});
//      header menu left
$(".menu-mobile").on("click", function(){
    $('.menu-left').toggleClass("active");
    $('.hamburger').toggleClass("active");
})
$(".btn-menu").on("click", function(){
    $("main").addClass("active");
    $('.menu-left').addClass("active");
    $("#overlay").toggleClass("active");
})
$(".btn-close, #overlay").on("click", function(){
    $("main").removeClass("active");
    $('.menu-left').removeClass("active");
    $("#overlay").toggleClass("active");
    $('.popup').removeClass("active");
})
// load
$(window).on("load",function(){
    $(".load").fadeOut(1000);
  });

// slider
$('.slider__item-wrap').flickity({   
    // options
    cellAlign: 'left',
    lazyLoad: true,
    lazyLoad: 1,
    contain: true,
    draggable: true,
    wrapAround: true,
    autoPlay: true,
    autoPlay: 3000,
    selectedAttraction: 0.01,
    friction: 0.25,
    freeScroll: false,
    pauseAutoPlayOnHover: false,
    prevNextButtons: false,
    imagesLoaded: true,
    pageDots: false,
    on: {
        ready: function() {
            $('.--pre').on( 'click', function() {
                $('.slider__item-wrap').flickity('previous');
              });
              $('.--next').on( 'click', function() {
                $('.slider__item-wrap').flickity('next');
              });
        }
    }
});
// back to top
$('#back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},800);
    return false;
});
// select
$(".projects .select").on("click", function(){
    $(".projects .select .select__down").toggle(100);
})
// slider products
$('.carousel').flickity({   
    // options
    cellAlign: 'center',
    lazyLoad: true,
    lazyLoad: 1,
    contain: true,
    draggable: true,
    wrapAround: true,
    autoPlay: false,
    selectedAttraction: 0.05,
    friction: 1.9,
    freeScroll: false,
    pauseAutoPlayOnHover: false,
    prevNextButtons: true,
    imagesLoaded: true,
    pageDots: false,
    arrowShape: { 
        x0: 0,
        x1: 45, y1: 30,
        x2: 25, y2: 5,
        x3: 100
    },
    on: {
        ready: function() {
            $('.--pre').on( 'click', function() {
                $('.carousel').flickity('previous');
            });
            $('.--next').on( 'click', function() {
                $('.carousel').flickity('next');
            });
        }
    }
});
// photoswipe
var initPhotoSwipeFromDOM = function(gallerySelector) {
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;
        for(var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element
            if(figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0]; // <a> element
            size = linkEl.getAttribute('data-size').split('x');
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            if(figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML; 
            }
            if(linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            } 
            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });
        if(!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) { 
                continue; 
            }
            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if(index >= 0) {
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
        params = {};
        if(hash.length < 5) {
            return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');  
            if(pair.length < 2) {
                continue;
            }           
            params[pair[0]] = pair[1];
        }
        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };
    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function(index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect(); 
  
                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },
            showAnimationDuration : 0,
            hideAnimationDuration : 0
        };
        if(fromURL) {
            if(options.galleryPIDs) {
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }
        if( isNaN(options.index) ) {
            return;
        }
        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
    var galleryElements = document.querySelectorAll( gallerySelector );
    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
  };
// Loading screen  
$(window).on("load",function () {
initPhotoSwipeFromDOM('.carousel-img');
})
// liên hệ đặt hàng
$('.show-info').on("click", function(e){
    e.preventDefault();
    $('.popup').toggleClass("active");
    $("#overlay").toggleClass("active");
}) 
$('.close-btn').on("click", function(){
    $('.popup').removeClass("active");
    $("#overlay").removeClass("active");
})