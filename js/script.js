$(document).ready(function () {
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
          resetProductAnimations(); // Reset and trigger animations for products
        }
        // Trigger animation for the section when navigating from navbar
        triggerAnimation($(target), true);
      }
    );

    $(".navbar ul li a").removeClass("active");
    $(this).addClass("active");
  });

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
        } else if ($section.is(".products")) {
          // Animate h2 (Koleksi Parfum Kami)
          $section.find("h2").addClass("animate__animated animate__fadeInUp");
          resetProductAnimations(); // Trigger product animations
        } else if ($section.is(".contact")) {
          $section.addClass("animate__animated animate__slideInUp");
        } else {
          $section.addClass("animate__animated animate__pulse");
        }
      }, 100);
    }
  }

  // Reset and animate products one by one
  function resetProductAnimations() {
    $(".product").each(function (index) {
      var delay = 1 + index * 0.5; // Add delay per product, showing one by one
      // Shorter delay for mobile
      if ($(window).width() <= 768) {
        delay = 0.5 + index * 0.3; // Adjust delay for smaller screens
      }

      $(this).removeClass(
        "animate__animated animate__zoomIn animate__delay-" + delay + "s"
      );

      setTimeout(() => {
        $(this).addClass(
          "animate__animated animate__zoomIn"
        ).css('animation-delay', delay + 's');
      }, 100);
    });
  }

  // IntersectionObserver for section animations
  const sections = document.querySelectorAll("section");
  const observerOptions = {
    root: null, 
    threshold: window.innerWidth <= 768 ? 0.1 : 0.3, 
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !$(entry.target).hasClass("animated")) {
        triggerAnimation($(entry.target), false);
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
