function equalHeight(group) {
  tallest = 0;
  group.each(function () {
    thisHeight = jQuery(this).height();
    if (thisHeight > tallest) {
      tallest = thisHeight;
    }
  });
  group.height(tallest);
}

function debounce(func) {
  var timer;
  return function (event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, 100, event);
  };
}

jQuery(document).ready(function ($) {
  /*===============================================================================
   *  RESIZE HANDLERS
   * =============================================================================*/
  var butlerMediaQueries = (function () {
    var screenSizes = {
      mobile: window.matchMedia("(max-width:467.98px)"),
      largeMobile: window.matchMedia(
        "(min-width:468px) and (max-width:767.98px"
      ),
      tab: window.matchMedia("(min-width:768px) and (max-width:1023.98px)"),
      largeTab: window.matchMedia(
        "(min-width:1024px) and (max-width:1199.98px)"
      ),
      desktop: window.matchMedia("(min-width:1200px)"),
      belowTab: window.matchMedia("(max-width:767.98px)"),
    };
    return {
      register: function (screenSize, callback) {
        if (!screenSizes[screenSize]) {
          throw new Error(
            'No handler for screenSize "' +
              screenSize +
              '". Try ' +
              Object.keys(screenSizes).join(" or ")
          );
        }
        var mediaQuery = screenSizes[screenSize];
        const handleOnChange = function (e) {
          if (e.matches) callback(e.currentTarget);
        };

        try {
          mediaQuery.addEventListener(handleOnChange);
        } catch {
          mediaQuery.addListener(handleOnChange);
        }

        if (mediaQuery.matches) callback(mediaQuery);
      },
    };
  })();

  butlerMediaQueries.register("mobile", function (e) {
    if (e.matches) {
      centerImage();
      // restructureSlider();
      hotspotScroller();
    }
  });

  butlerMediaQueries.register("largeMobile", function (e) {
    if (e.matches) {
      // restructureSlider();
    }
  });

  butlerMediaQueries.register("desktop", function (e) {
    if (e.matches) {
      teamBgChanger();
    }
  });

  /*===============================================================================
   *  MUTATION OBSERVERS
   * =============================================================================*/

  const mutationObserver = new MutationObserver(closePopup);
  parent = document.querySelector("body");
  mutationObserver.observe(parent, {
    childList: true,
  });

  function closePopup(mutations) {
    for (let mutation of mutations) {
      if (mutation.type === "childList") {
        // move element to the top of the popup
        var newNodes = mutation.addedNodes; // DOM NodeList

        if (newNodes !== null) {
          // If there are new nodes added
          var $nodes = $(newNodes); // jQuery set
          $nodes.each(function () {
            var $node = $(this);
            var $close_button = $node.find(".dialog-close-button");

            if ($close_button.length > 0) {
              $close_button
                .clone()
                .prependTo(
                  $node.find(".elementor-inner-column > .elementor-widget-wrap")
                )
                .addClass("copy");
            }
          });
        }

        $(".dialog-close-button").on("click", function () {
          $(".elementor-popup-modal").fadeOut("slow");
        });
      }
    }
  }

  // MOBILE MENU CLICK BUG FIX: REMOVE THE HTML CLASS overflow-controller
  // the fixed header
  function enableFixedWindow() {
    $("body").removeClass("body-stopper");
    $("html").removeClass("overflow-controller");
  }
  $("body").on("click", ".elementor-nav-menu--dropdown a", function (e) {
    enableFixedWindow();
  });
  // the top header
  $("header:nth-child(1)")
    .find(".elementor-nav-menu--dropdown a")
    .on("click", function (e) {
      var url = $(this).attr("href");

      enableFixedWindow();

      if (window.location.hash) {
        var hash = url.split("#")[1];

        $("html, body").animate(
          {
            scrollTop: $("#" + hash).offset().top - 90,
          },
          1000
        );
      } else {
        location.href = url;
      }
    });

  // close on outside of popup
  $("body").on(
    "click",
    ".elementor-popup-modal .elementor-background-overlay",
    function (e) {
      if (e.target !== this) {
        // stop propagate in the center
        e.stopPropagation();
        return false;
      }

      $(".dialog-close-button").click();
    }
  );

  /*===============================================================================
   *  GENERIC
   * =============================================================================*/
  // form: referrer url
  var currentUrl = window.location.href;
  $("#form-field-referrer").val(currentUrl);

  // REMOVES LAZY LOADING
  $(
    "#butlerapp-team-container .elementor-widget-hotspot .elementor-widget-container > img"
  ).removeAttr("loading");

  // TOOLTIPS -- REMOVE EMPTY P TAGS
  $(".e-hotspot__tooltip .team-body p").each(function () {
    var txto = $(this).text();
    var tL = txto.length;
    if (tL <= 0) {
      $(this).remove();
    }
  });

  /*===============================================================================
   *  SWIPER: AUTOSCROLLING LOGO
   * =============================================================================*/
  /*
  var originalTransformProp, originalTransitionDuration;

  function stopTransition(e) {
    var theThing = e.currentTarget,
      computedStyle = window.getComputedStyle(theThing),
      somePause = computedStyle.getPropertyValue("transform");

    originalTransformProp = theThing.style.transform;
    originalTransitionDuration = theThing.style.transitionDuration;

    theThing.style.transitionDuration = "0ms";
    theThing.style.transform = somePause;
    theThing.style.transitionProperty = "none";
  }

  function releaseTransition(e) {
    var theThing = e.currentTarget;
    theThing.style.transitionProperty = "transform";
    theThing.style.transitionDuration = originalTransitionDuration;
    theThing.style.transform = originalTransformProp;
  }

  var speed = 12000;

  window.swipers = [];
  $(".swiper-container").each(function () {
    var swiper = new Swiper(this, {
      spaceBetween: 0,
      centeredSlides: true,
      speed: speed,
      autoplay: {
        delay: 0,
        reverseDirection: $(this).data("reverse") === true,
        disableOnInteraction: false,
        pauseOnMouseEnter: false,
      },
      loop: true,
      slidesPerView: "auto",
      allowTouchMove: true,
    });

    jQuery(swiper.el)
      .children(".swiper-wrapper")
      .on("mouseenter", function (e) {
        stopTransition(e);
        // swiper.autoplay.stop();
      })
      .on("mouseleave", function (e) {
        releaseTransition(e);
        // swiper.autoplay.start();
      });
  });
  */

  $(".function-video-carousel-container").each(function (idx, item) {
    if ($(item).find(".elementor-widget-video").length > 1) {
      $(item).find(".elementor-widget-wrap").slick({
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
      });
    }
  });

  $(".image-carousel-v2").each(function (idx, item) {
    if ($(item).find(".elementor-widget-wrap > div").length > 1) {
      $(item).find(".elementor-widget-wrap").slick({
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
      });
    }
  });

  // this is using elementor gallery because it has linked-lightbox in it
  $(".image-carousel-gallery-v2").each(function (idx, item) {
    if ($(item).find(".gallery .gallery-item").length > 1) {
      $('.gallery br').remove();
      
      $(item).find(".gallery").slick({
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
      });
    }
  });

  /*===============================================================================
   *  POPUPS
   * =============================================================================*/
  // ADD ICON ON TOP OF POPUP
  $(
    ".elementor-location-popup > .elementor-section > .elementor-container > .elementor-column > .elementor-widget-wrap"
  ).prepend(
    '<img class="popup-icon" src="/wp-content/uploads/2022/06/popup-icon.png">'
  );

  $(".elementor-button-link").on("click", function () {
    var thisLink = $(this).attr("href");
    if (thisLink.indexOf("popup") >= 1) {
      $(".elementor-popup-modal button > span > span:first-child").remove();
      $(".elementor-popup-modal button > span").prepend(
        '<span class="elementor-button-icon elementor-align-icon-right"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 6C13.5523 6 14 6.44772 14 7C14 7.51284 13.614 7.93551 13.1166 7.99327L13 8H1C0.447715 8 0 7.55228 0 7C0 6.48716 0.38604 6.06449 0.883379 6.00673L1 6H13Z" fill="url(#paint0_linear_0_221)"></path><path d="M6.29289 0.292893C6.65338 -0.0675907 7.22061 -0.0953203 7.6129 0.209705L7.70711 0.292893L13.7071 6.29289C14.0676 6.65338 14.0953 7.22061 13.7903 7.6129L13.7071 7.70711L7.70711 13.7071C7.31658 14.0976 6.68342 14.0976 6.29289 13.7071C5.93241 13.3466 5.90468 12.7794 6.2097 12.3871L6.29289 12.2929L11.585 7L6.29289 1.70711C5.93241 1.34662 5.90468 0.779392 6.2097 0.387101L6.29289 0.292893Z" fill="url(#paint1_linear_0_221)"></path><defs><linearGradient id="paint0_linear_0_221" x1="0" y1="8.01355" x2="14" y2="8.01355" gradientUnits="userSpaceOnUse"><stop stop-color="#ED1E79"></stop><stop offset="0.85" stop-color="#FBB03B"></stop><stop offset="1" stop-color="#FBB03B"></stop></linearGradient><linearGradient id="paint1_linear_0_221" x1="6" y1="14.0948" x2="14" y2="14.0948" gradientUnits="userSpaceOnUse"><stop stop-color="#ED1E79"></stop><stop offset="0.85" stop-color="#FBB03B"></stop><stop offset="1" stop-color="#FBB03B"></stop></linearGradient></defs></svg></span>'
      );
      /*-- PRIVACY LINK --*/
      $(
        ".elementor-popup-modal .elementor-form-fields-wrapper > div:nth-last-child(2) .elementor-field-option label"
      ).text("Ich akzeptiere die");
      $(
        ".elementor-popup-modal .elementor-form-fields-wrapper > div:nth-last-child(2) .elementor-field-option label"
      ).append('<a class="privacy--link" href="#">Datenschutzbedingungen</a>');
    }
  });

  /*=======================================================================================================
   * HEADER
   * ====================================================================================================*/
  function hamburgerClick() {
    $(".elementor-menu-toggle").on("click", function () {
      $("body").toggleClass("body-stopper");
      $("html").toggleClass("overflow-controller");
    });
  }

  setTimeout(function () {
    hamburgerClick();
  }, 1000);

  /*=======================================================================================
  * CONTACT FORM SECTION 
  =======================================================================================*/

  // CHANGE BG ON INPUT CLICK
  $("#butlerapp-contact input, .elementor-element-16bc62a").click(function () {
    var changeTimer = 100;
    setTimeout(function () {
      $("#butlerapp-contact, .ct-girl-img").css(
        "background-image",
        "url(/wp-content/uploads/2022/06/contact-2-min.png)"
      );
    }, changeTimer);
  });

  // MOBILE RESTRUCTURE
  var getBg = $("#butlerapp-contact").css("background-image");
  $("#butlerapp-contact").prepend(
    '<div class="ct-girl"><div class="ct-girl-img"></div></div>'
  );
  $("#butlerapp-contact .ct-girl-img").css("background-image", getBg);
  $(".ct-girl").append(
    '<img class="floating-icon" src="/wp-content/uploads/2022/06/contact-mob-icon.png">'
  );

  butlerMediaQueries.register("belowTab", function (e) {
    if (e.matches) {
      $("#butlerapp-contact").addClass("nobgimage");
    }
  });

  /*=======================================================================================
  * PERSONLICHER SUPPORT
  =======================================================================================*/

  // NESTING
  $(".ba-points").each(function () {
    $(this).find("h3, p").wrapAll('<div class="mobile-wrapper"></div>');
  });

  /*=======================================================================================
  * TEAMS SECTION (LAST SECTION)
  =======================================================================================*/
  // BACKGROUND CHANGER
  function teamBgChanger() {
    var timeover = null;
    var isClicked = function () {
      return $(".e-hotspot--active").length;
    };

    if ($("#pro-team").length) {
      $(window).scroll(function () {
        if (isClicked()) return;
        var pT = $("#pro-team"),
          cT = $("#casual-team"),
          hT = $("#butlerapp-team-container").offset().top,
          hH = $("#butlerapp-team-container").outerHeight(),
          wH = $(window).height(),
          wS = $(this).scrollTop();
        clearTimeout(timeover);
        if (wS > hT + hH - wH - hH) {
          timeover = setTimeout(function () {
            if (isClicked()) return;
            pT.css("position", "absolute").fadeOut();
            cT.css("position", "relative").fadeIn();
          }, 3000);
        } else {
          timeover = setTimeout(function () {
            if (isClicked()) return;
            cT.css("position", "absolute").fadeOut();
            pT.css("position", "relative").fadeIn();
          }, 3000);
        }
      });
    }
  }
  function hotspotScroller() {
    (function scrollxCloser() {
      $(".e-hotspot:not(:last-child):not(:first-of-type)").on(
        "click",
        function () {
          var leftOffset = $(this).css("left");
          var leftOffset = leftOffset.replace("px", "");
          var halfWindow = $(window).width() / 2;
          $("#butlerapp-team-container").animate(
            {
              scrollLeft: leftOffset - halfWindow,
            },
            1000
          );
        }
      );

      $(".e-hotspot:last-child").on("click", function () {
        var leftOffset = $(this).css("left");
        var leftOffset = leftOffset.replace("px", "");
        $("#butlerapp-team-container").animate(
          {
            scrollLeft: leftOffset - $(window).width(),
          },
          1000
        );
      });

      $(".e-hotspot:first-of-type").on("click", function () {
        var leftOffset = $(this).css("left");
        var leftOffset = leftOffset.replace("px", "");
        $("#butlerapp-team-container").animate(
          {
            scrollLeft: leftOffset,
          },
          1000
        );
      });
    })();
  }

  // HOTSPOT MOUSE IN & OUT
  $(".e-hotspot__button").mouseenter(function () {
    setTimeout(function () {
      $(this).removeClass("ba--inactive");
    }, 500);
  });

  // When clicking outside popup and hotspot cards
  $(document).on("click", function () {
    $(".e-hotspot").removeClass("e-hotspot--active");
    $(".e-hotspot__button").removeClass("ba--inactive");
  });

  $('.personal-services-section .elementor-widget-hotspot').click(function() {
      // close if any
      $('.personal-services-section').find('.e-hotspot--active:first-child').removeClass('e-hotspot--active');
  });
  
  // HOTSPOT ONCLICK ACTIONS
  $(document).on(
    "click",
    ".e-hotspot__button:not(.ba--inactive)",
    function (e) {
      e.stopPropagation();
      if ($(this).parents().hasClass('support-cards-container')) return;

      var getParent = $(this).parent();
      var isActive = getParent.hasClass("e-hotspot--active");

      if (!isActive) {
        $(".e-hotspot__button.ba--inactive").removeClass("ba--inactive");
        $(".e-hotspot__button").addClass("ba--inactive");
        getParent.removeClass("ba--inactive").addClass("e-hotspot--active");
      } else if (isActive) {
        $(".e-hotspot__button").addClass("ba--inactive");
        $(".e-hotspot__button").not(this).removeClass("ba--inactive");
      } else {
        // WEBOZZA
      }
    }
  );

  // TEAM CARDS - CLOSE FUNCTION
  $(".e-hotspot .ba-close-icon").click(function (e) {
    e.preventDefault();
    $(this).parent().parent().parent().removeClass("e-hotspot--active");
    $('.e-hotspot-active').removeClass('e-hotspot-active');
    $(".e-hotspot__button").removeClass("ba--inactive");
  });

  // NESTING THE HOTSPOTS
  $("#pro-team .e-hotspot").wrapAll('<div class="hotspot-container">');
  $("#casual-team .e-hotspot").wrapAll('<div class="hotspot-container">');

  $("#butlerapp-informal-team-container .e-hotspot").wrapAll('<div class="hotspot-container">');

  function centerImage() {
    // img width is 320% of screen width..so
    var centerPoint = window.innerWidth * 3.2;
    $("#butlerapp-team-container").scrollLeft(centerPoint / 2.9);
    $("#butlerapp-informal-team-container").scrollLeft(centerPoint / 2.9);
  }

  function mediaCenterImage(e) {
    e.matches && centerImage();
  }

  butlerMediaQueries.register("mobile", mediaCenterImage);

  /*=======================================================================================
  * OTHERS
  =======================================================================================*/
  // Mobile Menu Active Link
  $(
    "#masthead nav.elementor-nav-menu--dropdown.elementor-nav-menu__container ul li:not(li:last-child)"
  ).click(function (e) {
    e.stopPropagation();
    e.preventDefault();
    $(
      "#masthead nav.elementor-nav-menu--dropdown.elementor-nav-menu__container ul li:not(li:last-child)"
    ).removeClass("active");
    $(this).addClass("active");
  });

  // Append Mobile Footer
  $(
    "#masthead nav.elementor-nav-menu--dropdown.elementor-nav-menu__container"
  ).append(
    "<div class='mobiler-footer'><a href='tel:493031199425'><span class='caller-icon-container'><img class='caller-icon' src='/wp-content/uploads/2022/07/caller-icon-no-bg.png'></span><span>Kostenlose Beratung</span><span>+49 30 311 994 25</span></a><div class='mobile-copyright'><p>Butlerapp © 2023 Webbee GmbH</p><div class='footer-links'><a href='https://butlerapp.de/datenschutz/'>Datenschutz</a><a href='https://butlerapp.de/impressum/'>Impressum</a></div></div>"
  );

  /*=======================================================================================
  * FAIRE PREISE 2
  =======================================================================================*/
  // Make same height of description
  equalHeight($(".price-item-v2 .description"));

  /*=======================================================================================
  * price features: ALLE FUNCTIONEN CLICKABLE
  =======================================================================================*/
  // fixed position header when scrolled. only 1024 above..smaller device a bit buggy
  function destroyScrolltoFixed() {
    if ( $(window).width() < 1024) return;

    // destroy first if any
    $(".features-list-table-fixed .header")
      .removeClass("scroll-to-fixed-fixed")
      .removeAttr("style");
    $(".features-list-table-fixed .header").next().remove();
  }

  function initScrolltoFixed() {
    if ( $(window).width() < 1024) return;

    var limit = $(".features-list-footer").offset().top - 150;

    // calculate the offsetTop
    // offsetTop is the height of masthead clone and the product-menu-container (if any)
    var mastheadHeight = $('#masthead.headhesive--clone.headhesive--stick').height() || 0;
    var productMenuHeadHeight = $('.product-menu-container').height() || 0;
    var offsetTop = parseInt(mastheadHeight) + parseInt(productMenuHeadHeight);
    
    $(".features-list-table-fixed .header").scrollToFixed({
      limit: limit,
      marginTop: offsetTop,
      zIndex: 10
    });
  }

  // hide this link if no any more features
  if ($(".more-features-list").length == 0) {
    $(".butler-price-features .alle-funktionen").hide();
  }

  /******************************************************
   * INIT FIXED HEADER
   * since it has calculation of offsetTop,
   * do the init when the element is showing in viewport
   * and do it one time only
   * ****************************************************/
  // init fixed header
  if ($( '.features-list-table').length) {
    var isInit = 0;
    $( '.features-list-table').exopiteInViewPort({
      onEnter: function(element, inViewport) {
        if (isInit) return;
        
        initScrolltoFixed();
        isInit = 1;
        
      },
      onWholeInside: function(element, inViewport) {
        if (isInit) return;
        
        initScrolltoFixed();
        isInit = 1;
      }
    });
  }
  

  $(".butler-price-features .alle-funktionen").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("active");

    $(".more-features-list").slideToggle("slow", function () {
      // recalculate limit for fixed header
      destroyScrolltoFixed();
      initScrolltoFixed();
    });

    if ($(".butler-price-features .alle-funktionen").hasClass("active")) {
      // scroll to the bottom of the list
      $("html, body").animate(
        {
          scrollTop: $(".features-list-footer").offset().top - 150,
        },
        1000
      );
    } else {
      // scroll to the top of the list
      $("html, body").animate(
        {
          scrollTop: $(".features-list-table").offset().top - 150,
        },
        1000
      );
    }
  });

  window.addEventListener(
    "resize",
    debounce(function (e) {
      // init fixed header
      if ($(".features-list-table").length > 0) {
        destroyScrolltoFixed();
        initScrolltoFixed();
      }
    })
  );

  /*=======================================================================================
  * Popup Exit intent: give delay before showing popup
  =======================================================================================*/
  var hasTriggered = 0;
  var timeout = 20000;
  $(document).mouseleave(function () {
    if (hasTriggered > 0) return;
    hasTriggered++;
    setTimeout(function () {
      // show exit popup
      // elementorProFrontend.modules.popup.showPopup({ id: 897 });
    }, timeout);
  });
}); // THE ENDING...
