$(document).ready(function () {
  // Scroll function to handle navbar active state and scroll-up button visibility
  $(window).scroll(function () {
    var scrollPos = $(document).scrollTop();

    $(".navbar ul li a").each(function () {
      var sectionOffset = $($(this).attr("href")).offset().top - 60;
      if (scrollPos >= sectionOffset) {
        $(".navbar ul li a").removeClass("active");
        $(this).addClass("active");
      }
    });

    if ($(this).scrollTop() > 300) {
      $("#scrollUpButton").fadeIn();
    } else {
      $("#scrollUpButton").fadeOut();
    }
  });

  // Smooth scroll to section with animation when clicking navbar links
  $('a[href*="#"]').on("click", function (event) {
    event.preventDefault();
    var target = this.hash;

    $("html, body").animate(
      {
        scrollTop: $(target).offset().top,
      },
      800,
      function () {
        if (target === "#products") {
          // Reset and trigger animations for the products section on click
          resetProductSectionAnimation();
        } else if (target === "#home") {
          // Reset and trigger animation for the home section
          resetHomeAnimation();
        } else {
          // Trigger animation for other sections
          triggerAnimation($(target), true);
        }
      }
    );

    $(".navbar ul li a").removeClass("active");
    $(this).addClass("active");
  });

  // Function to reset and trigger product animations on click
  function resetProductSectionAnimation() {
    var $productSection = $("#products");
    var $productTitle = $productSection.find("h2");

    // Reset the animations on h2
    $productTitle.removeClass("animate__animated animate__lightSpeedInLeft");

    // Re-trigger the animation after a short delay
    setTimeout(function () {
      $productTitle.addClass("animate__animated animate__lightSpeedInLeft");
    }, 100);

    // Reset and trigger animations for individual products (only when clicking "Produk" on navbar)
    resetProductAnimations();
  }

  // Function to reset and animate products one by one
  function resetProductAnimations() {
    $(".product").each(function (index) {
      var delay = 1 + index * 0.5; // Add delay per product, showing one by one
      // Shorter delay for mobile
      if ($(window).width() <= 768) {
        delay = 0.5 + index * 0.3; // Adjust delay for smaller screens
      }

      $(this).removeClass("animate__animated animate__zoomIn");

      setTimeout(() => {
        $(this)
          .addClass("animate__animated animate__zoomIn")
          .css("animation-delay", delay + "s");
      }, 100);
    });
  }

  // Function to reset animations for the home section (including button and logo)
  function resetHomeAnimation() {
    var $homeText = $("#home .hero-text"); // Target the animated part of the home section
    var $homeButton = $("#home .button"); // Target the button
    var $homeLogo = $("#home .hero-logo img"); // Target the logo

    // Remove existing animations
    $homeText.removeClass("animate__animated animate__zoomIn");
    $homeButton.removeClass("animate__animated animate__zoomIn");
    $homeLogo.removeClass("animate__animated animate__zoomIn");

    // Re-trigger the animation after a short delay
    setTimeout(function () {
      $homeText.addClass("animate__animated animate__zoomIn animate__delay-1s");
      $homeButton.addClass(
        "animate__animated animate__zoomIn animate__delay-1s"
      );
      $homeLogo.addClass("animate__animated animate__zoomIn animate__delay-1s");
    }, 100);
  }

  // Trigger animation for sections including h2
  function triggerAnimation($section, force) {
    if (!$section.hasClass("animated") || force) {
      $section.addClass("animated");
      $section.removeClass(
        "animate__animated animate__slideInDown animate__fadeInUp animate__lightSpeedInLeft animate__slideInUp"
      );

      setTimeout(function () {
        if ($section.is(".about")) {
          $section.addClass("animate__animated animate__fadeInUp");
        } else if ($section.is(".contact")) {
          $section.addClass("animate__animated animate__slideInUp");
        } else {
          $section.addClass("animate__animated animate__pulse");
        }
      }, 100);
    }
  }

  // IntersectionObserver for section animations (for scroll-triggered animations)
  const sections = document.querySelectorAll("section");
  const observerOptions = {
    root: null,
    threshold: window.innerWidth <= 768 ? 0.1 : 0.3,
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !$(entry.target).hasClass("animated")) {
        triggerAnimation($(entry.target), false);

        if ($(entry.target).is("#products")) {
          // Trigger the h2 animation on scroll
          $(entry.target)
            .find("h2")
            .addClass("animate__animated animate__lightSpeedInLeft");

          // Trigger product animations one by one when section becomes visible
          $(entry.target)
            .find(".product")
            .each(function (index) {
              var delay = 1 + index * 0.5; // Delay between product animations
              if ($(window).width() <= 768) {
                delay = 0.5 + index * 0.3; // Adjust delay for smaller screens
              }

              // Only animate if it hasn't already been animated
              if (!$(this).hasClass("animate__animated")) {
                $(this).css("animation-delay", delay + "s");
                $(this).addClass("animate__animated animate__zoomIn");
              }
            });
        }
      }
    });
  }, observerOptions);

  sections.forEach(function (section) {
    observer.observe(section);
  });
});

$(document).ready(function () {
  $("#darkModeToggle").on("click", function () {
    $("body").toggleClass("dark-mode");
    $("header").toggleClass("dark-mode");
    $(".navbar").toggleClass("dark-mode");
    $("footer").toggleClass("dark-mode");
    $(".hero").toggleClass("dark-mode");
    $(".about").toggleClass("dark-mode");
    $(".products").toggleClass("dark-mode");
    $(".contact").toggleClass("dark-mode");
    $(".scroll-up").toggleClass("dark-mode");
    $(".product").toggleClass("dark-mode");
    $(".mobile-menu").toggleClass("dark-mode");
    $(".more-info").toggleClass("dark-mode");
    $(".footer-socials, .footer-right").toggleClass("dark-mode");

    if ($("body").hasClass("dark-mode")) {
      $("#darkModeIcon").text("🌞");
    } else {
      $("#darkModeIcon").text("🌙");
    }
  });
});

$(document).ready(function () {
  $("#hamburgerMenu").click(function () {
    $("#mobileMenu").toggleClass("active");
    $("body").toggleClass("no-scroll");
  });

  $("#mobileMenu a").click(function () {
    $("#mobileMenu").removeClass("active");
    $("body").removeClass("no-scroll");
  });

  $(document).click(function (e) {
    if (!$(e.target).closest("#hamburgerMenu, #mobileMenu").length) {
      $("#mobileMenu").removeClass("active");
      $("body").removeClass("no-scroll");
    }
  });
});

function showInfo(image) {
  const product = image.closest(".product");
  const moreInfo = product.querySelector(".more-info");
  moreInfo.style.display = "flex";
}

function hideInfo(info) {
  info.style.display = "none";
}
