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
      restructureSlider();
      faqMobile();
      hotspotScroller();
    }
  });

  butlerMediaQueries.register("largeMobile", function (e) {
    if (e.matches) {
      restructureSlider();
    }
  });

  butlerMediaQueries.register("desktop", function (e) {
    if (e.matches) {
      serviceBgChanger();
      teamBgChanger();
    }
  });

  butlerMediaQueries.register("belowTab", function (e) {
    if (e.matches) {
      scrollToVideo();
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

  /*===============================================================================
   * FUTURE SLIDER -- Section 3
   * ============================================================================*/

  // MAKES THE FIRST SLIDE ACTIVE ON LOAD
  $("#ba--sliders .slides > li").eq(0).addClass("active");

  // ALL SLIDES
  var slides = $("#ba--sliders .slides > li");

  // REMOVES ELEMENTOR'S ACTIVE STATE
  slides.removeClass("flex-active-slide");
  $("#ba-slider-controls li").on("click", function () {
    $("#ba-slider-controls li").removeClass("active");
    $(this).addClass("active");
    var activePoint = $("#ba-slider-controls li.active").index();
    slides.removeClass("active");
    slides.eq(activePoint).addClass("active");
  });

  // SLIDER CONTROLS
  function slideToIndex(nextIndex) {
    $("#ba-slider-controls li").removeClass("active");
    $("#ba-slider-controls li").eq(nextIndex).addClass("active");
    slides.removeClass("active");
    slides.eq(nextIndex).addClass("active");
  }
  function handlenextclick() {
    var activeLiner = $("#ba-slider-controls li.active");
    var nextIndex = activeLiner.index() + 1;
    if (!$("#ba-slider-controls li").eq(nextIndex).length) {
      nextIndex = 0;
    }
    slideToIndex.call(this, nextIndex);
  }
  function prevClick() {
    var activeLiner = $("#ba-slider-controls li.active");
    var prevIndex = activeLiner.index() - 1;
    slideToIndex.call(this, prevIndex);
  }

  // INITIATES CONTROL FUNCTIONS ON CLICK
  $(".bsa-right").on("click", handlenextclick);
  $(".bsa-left").on("click", prevClick);

  // RESTRUCTURES MOBILE IMAGE CONTAINER
  function restructureSlider() {
    $("#ba--sliders .slides li").each(function () {
      var eachImage = $(this).find(".mobile-slider-img");
      var prependArea = eachImage
        .closest("section")
        .prev()
        .find(".elementor-widget-wrap")
        .eq(0);
      eachImage.prependTo(prependArea);
    });
  }

  /*===============================================================================
   *  VIDEO SWITCHER - Section 4
   * =============================================================================*/

  // MAKES THE FIRST VIDEO ACTIVE ON LOAD
  $("#butler_guides [data-order-no]:first-of-type").addClass("active");
  $(".bm-container .bm-filter").eq(0).addClass("active");

  // ON CLICK STATE
  $("#butler_guides [data-order-no]")
    .not(".guide")
    .on("click", function (e) {
      e.preventDefault();
      var orderNo = $(this).data("order-no");

      // pause previous active's video if played
      $(".b-guides .active").find("video").get(0).pause();

      $(".b-filters > div").removeClass("active");
      $(this).addClass("active");
      $(this).parent().next().find(".guide").removeClass("active");
      $(this)
        .parent()
        .next()
        .children("[data-order-no=" + orderNo + "]")
        .addClass("active");

      // // play previous active's video if played
      // $(".b-guides .active").find("video").get(0).play();
    });

  // FOR THE MORPHED ACCORDION ON MOBILE DEVICES
  $(".bm-filter .bm-head").on("click", function (e) {
    e.preventDefault();

    // pause previous active's video if played
    $(".bm-filter.active").find("video").get(0).pause();

    $(".bm-filter").removeClass("active");
    $(this).parent().toggleClass("active");
    $(".bm-filter .bm-guide").slideUp();
    if ($(this).parent().find(".bm-guide").css("display") == "none") {
      $(this).parent().find(".bm-guide").slideDown();
    } else {
      $(this).parent().find(".bm-guide").slideUp();
      $(this).parent().toggleClass("active");
    }
  });

  // SCROLL TO ACTIVE VIDEO
  function scrollToVideo() {
    $(".bm-filter").on("click", function () {
      setTimeout(function () {
        var activeOffset = $(".bm-filter.active").offset().top;
        console.log(activeOffset);
        var headerHeight = $("#masthead").height();
        $("body, html").animate(
          {
            scrollTop: activeOffset - headerHeight,
          },
          1000
        );
      }, 1000);
    });
  }
  $(".bm-filter.active .bm-guide").attr("style", "display:block");
  $(".bm-filter:not(.active) .bm-guide").attr("style", "display:none");

  /*===============================================================================
   *  KUNDEN SLIDER - Section 5
   * =============================================================================*/
  /*** create prev next buttons  ***/
  $("#kunden--slider #main-flex-slider .flex-control-nav").append(
    '<div class="ba-slider-arrows"><div class="bas-inner"> <div class="bsa-left"> <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="path-1-inside-1_0_351" fill="white"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.99454 0L0 5.99727L6 12"></path></mask><path d="M7.40907 1.41389C8.18994 0.632665 8.18965 -0.633665 7.40843 -1.41454C6.6272 -2.19541 5.36087 -2.19512 4.58 -1.41389L7.40907 1.41389ZM0 5.99727L-1.41454 4.58337C-2.19515 5.36435 -2.19515 6.63018 -1.41454 7.41116L0 5.99727ZM4.58546 13.4139C5.36633 14.1951 6.63267 14.1954 7.41389 13.4145C8.19512 12.6337 8.19541 11.3673 7.41454 10.5861L4.58546 13.4139ZM4.58 -1.41389L-1.41454 4.58337L1.41454 7.41116L7.40907 1.41389L4.58 -1.41389ZM-1.41454 7.41116L4.58546 13.4139L7.41454 10.5861L1.41454 4.58337L-1.41454 7.41116Z" fill="#0B2541" mask="url(#path-1-inside-1_0_351)"></path></svg> </div><div class="bsa-right"> <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="path-1-inside-1_0_354" fill="white"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.00546455 0L6 5.99727L0 12"></path></mask><path d="M-1.40907 1.41389C-2.18994 0.632665 -2.18965 -0.633665 -1.40843 -1.41454C-0.627201 -2.19541 0.63913 -2.19512 1.42 -1.41389L-1.40907 1.41389ZM6 5.99727L7.41454 4.58337C8.19515 5.36435 8.19515 6.63018 7.41454 7.41116L6 5.99727ZM1.41454 13.4139C0.633665 14.1951 -0.632665 14.1954 -1.41389 13.4145C-2.19512 12.6337 -2.19541 11.3673 -1.41454 10.5861L1.41454 13.4139ZM1.42 -1.41389L7.41454 4.58337L4.58546 7.41116L-1.40907 1.41389L1.42 -1.41389ZM7.41454 7.41116L1.41454 13.4139L-1.41454 10.5861L4.58546 4.58337L7.41454 7.41116Z" fill="#0B2541" mask="url(#path-1-inside-1_0_354)"></path></svg> </div></div></div>'
  );

  /*** autoplay and click events ***/
  var myTimer = null;

  function kundenprevclick() {
    var cA = $("#kunden--slider .flex-active").parent(),
      items = $("#kunden--slider .slide-points li"),
      cI = items.toArray().indexOf(cA[0]) - 1;
    items.find("a").removeClass("flex-active");
    items.eq(cI).find("a").addClass("flex-active");
    $("#kunden--slider .slides li")
      .removeClass("flex-active-slide")
      .animate({ opacity: 0 }, 200)
      .eq(cI)
      .addClass("flex-active-slide")
      .animate({ opacity: 1 }, 200);
  }

  function kundennextclick() {
    var cA = $("#kunden--slider .flex-active").parent(),
      items = $("#kunden--slider .slide-points li"),
      cI = items.toArray().indexOf(cA[0]) + 1;
    if (items.length <= cI) {
      cI = 0;
    }
    items.find("a").removeClass("flex-active");
    items.eq(cI).find("a").addClass("flex-active");
    $("#kunden--slider .slides li")
      .removeClass("flex-active-slide")
      .animate({ opacity: 0 }, 200)
      .eq(cI)
      .addClass("flex-active-slide")
      .animate({ opacity: 1 }, 200);
  }

  function kundenClickByIdx(idx) {
    $("#kunden--slider .flex-active").removeClass("flex-active");
    $("#kunden--slider .slide-points li")
      .eq(idx)
      .find("a")
      .addClass("flex-active");

    $("#kunden--slider .slides li")
      .removeClass("flex-active-slide")
      .animate({ opacity: 0 }, 200)
      .eq(idx)
      .addClass("flex-active-slide")
      .animate({ opacity: 1 }, 200);
  }

  function setAutoplay(timer) {
    myTimer = setInterval(function () {
      kundennextclick();
    }, timer);
  }

  // WRAPS SLIDE INDICATORS
  $("#kunden--slider .flex-control-nav li").wrapAll(
    '<div class="slide-points">'
  );

  $("#kunden--slider").on("click", ".bsa-right", function () {
    clearInterval(myTimer);
    myTimer = null;
    kundennextclick();
    setAutoplay(3000);
  });
  $("#kunden--slider").on("click", ".bsa-left", function () {
    clearInterval(myTimer);
    myTimer = null;
    kundenprevclick();
    setAutoplay(3000);
  });
  $("#kunden--slider .slide-points").on("click", "li", function () {
    if ($(this).children(".flex-active").length == 0) {
      var idx = $(this).index();
      clearInterval(myTimer);
      kundenClickByIdx(idx);
      setAutoplay(3000);
    }
  });

  // hover-out
  $("#kunden--slider .slides").mouseenter(function () {
    clearInterval(myTimer);
  });
  $("#kunden--slider .slides").mouseleave(function () {
    setAutoplay(3000);
  });

  setAutoplay(3000);

  /*===============================================================================
   *  POPUPS
   * =============================================================================*/

  $(
    ".elementor-location-popup > div > section > .elementor-container > .elementor-row > .elementor-column > .elementor-column-wrap > .elementor-widget-wrap"
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

  // BA SLIDER BUTTON
  $(
    "#ba--sliders .slides li .elementor-button-content-wrapper .elementor-button-icon:first-child svg"
  ).remove();
  $(
    "#ba--sliders .slides li .elementor-button-content-wrapper .elementor-button-icon:first-child"
  ).append(
    '<img class="btn-replaced" src="/wp-content/uploads/2022/06/contact-mob-icon.png">'
  );

  /*=======================================================================================================
   * HEADER
   * ====================================================================================================*/

  $("#stb-logo-wrapper .elementor-widget-wrap").prepend(
    '<div class="logo-blocker">'
  );
  function hamburgerClick() {
    $(".elementor-menu-toggle").on("click", function () {
      $("body").toggleClass("body-stopper");
      $("html").toggleClass("overflow-controller");
    });
  }

  setTimeout(function () {
    hamburgerClick();
  }, 1000);

  // LOGO ANIMATION
  function throttle(func, timeFrame) {
    var lastTime = 0;
    return function () {
      var now = Date.now();
      if (now - lastTime >= timeFrame) {
        func();
        lastTime = now;
      }
    };
  }

  $(window).scroll(function () {
    var a = 400;
    var b = 200;
    var pos = $(window).scrollTop();
    if (pos > a) {
      $(".logo-blocker").css("opacity", "1");
      $(".logo-blocker").addClass("active");
      $("body").addClass("scrolled");
      $("header").eq(1).css("opacity", 0);
    } else if (pos < b) {
      $(".logo-blocker").removeClass("active");
      $(".logo-blocker").css("opacity", "0");
    } else {
      $(".logo-blocker").removeClass("active");
      $(".logo-blocker").css("opacity", "0");
      $("body").removeClass("scrolled");
      $("header").eq(1).css("opacity", 1);
    }
  });

  /* THROTTLE GIVES DELAY ON CLOSING THE .logo-blocker
  $(window).scroll(
    throttle(function () {
      var a = 400;
      var b = 200;
      var pos = $(document).scrollTop();
      console.log(pos);
      if (pos > a) {
        $(".logo-blocker").css("opacity", "1");
        $(".logo-blocker").addClass("active");
        $("body").addClass("scrolled");
        // $("header").eq(1).css("opacity", 0);
      } else if (pos < b) {
        $(".logo-blocker").removeClass("active");
        $(".logo-blocker").css("opacity", "0");
      } else {
        $(".logo-blocker").removeClass("active");
        $(".logo-blocker").css("opacity", "0");
        $("body").removeClass("scrolled");
        // $("header").eq(1).css("opacity", 1);
      }
    }, 500)
  );
  */

  /*=======================================================================================================
   * SERVICES SECTION
   * ====================================================================================================*/
  function serviceBgChanger() {
    var timeout = null;
    var hasClicked = function () {
      return $(".e-hotspot--active").length;
    };
    if ($("#butlerapp-services").length) {
      $(window).scroll(function () {
        if (hasClicked()) return;
        var hT = $("#butlerapp-services").offset().top,
          hH = $("#butlerapp-services").outerHeight(),
          wH = $(window).height(),
          wS = $(this).scrollTop(),
          bsi1 = $(".butlerapp-services-img-container .pro-service"),
          bsi2 = $(".butlerapp-services-img-container .casual-service");
        clearTimeout(timeout);
        if (wS > hT + hH - wH - 300) {
          timeout = setTimeout(function () {
            if (hasClicked()) return;
            bsi1.fadeOut();
            bsi2.css({ left: "0", opacity: "1" });
          }, 3000);
        } else {
          timeout = setTimeout(function () {
            if (hasClicked()) return;
            bsi1.fadeIn();
            bsi2.css({ left: "150%", opacity: "0" });
          }, 3000);
        }
      });
    }
  }
  /*=======================================================================================
  * FAQs Section
  =======================================================================================*/
  (function faqClosure() {
    var timeout = null;
    var extraTopSpace = 20;
    $(".faq-inner").on("click", function () {
      $(this).parent().find(".faq-content-area").slideToggle();
      $(this).parent().toggleClass("faq-active");
      $(".faq-inner")
        .not(this)
        .parent()
        .find(".faq-content-area")
        .slideUp()
        .removeClass("faq-active");
      var activo = $(".faq-active").length;
      if (activo > 1) {
        $(".faq-inner").not(this).parent().find(".faq-content-area").slideUp();
        $(".faq-inner").not(this).parent().removeClass("faq-active");
      }
      if (!$(this).parent().hasClass(".faq-active")) {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
          var offset = $(".faq-active").offset().top - extraTopSpace;
          var headerHeight = $("#masthead").height();
          $("body, html").animate(
            {
              scrollTop: offset - headerHeight,
            },
            1000
          );
        }, 1000);
      }
    });
  })();
  function faqMobile() {
    // FAQs Close Button --  Buggy (gotta fix this later...)
    $(".faq-close-btn").click(function () {
      if ($("#faqs-container .faq").hasClass("faq-active")) {
        $(this).parent().removeClass("faq-active");
        $(this)
          .parent()
          .find(".faq-content-area")
          .slideUp()
          .css("opacity", "0");
      }
    });
    // 	Restructure faq-meta
    $("#faqs-container .faq-meta").each(function () {
      $(this).find("h5, span, a").wrapAll("<div>");
    });
  }
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

  // HOTSPOT ONCLICK ACTIONS
  $(document).on(
    "click",
    ".e-hotspot__button:not(.ba--inactive)",
    function (e) {
      e.stopPropagation();
      var getParent = $(this).parent();
      var isActive = getParent.hasClass("e-hotspot--active");
      console.log(isActive);
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
  $(".e-hotspot .ba-close-icon").click(function () {
    $(this).parent().parent().parent().removeClass("e-hotspot--active");
    $(".e-hotspot__button").removeClass("ba--inactive");
  });

  // NESTING THE HOTSPOTS
  $("#pro-team .e-hotspot").wrapAll('<div class="hotspot-container">');
  $("#casual-team .e-hotspot").wrapAll('<div class="hotspot-container">');

  function centerImage() {
    var img = $(
      "#butlerapp-team-container .elementor-widget-hotspot img.attachment-full"
    );

    img.on("load", function () {
      var centerPoint = img.width();
      $("#butlerapp-team-container").scrollLeft(centerPoint / 2.9);
    });
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
    "<div class='mobiler-footer'><a href='tel:493031199425'><span class='caller-icon-container'><img class='caller-icon' src='/wp-content/uploads/2022/07/caller-icon-no-bg.png'></span><span>Kostenlose Beratung</span><span>+49 30 311 994 25</span></a><div class='mobile-copyright'><p>Buchungsbutler © 2022 Webbee GmbH</p><div class='footer-links'><a href='#'>Datenschutz</a><a>Impressum</a></div></div>"
  );
}); // THE ENDING...
