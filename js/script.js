$(document).ready(function () {
  // Sticky Navbar Highlight on Scroll
  $(window).scroll(function () {
    var scrollPos = $(document).scrollTop();

    $(".navbar ul li a").each(function () {
      var sectionOffset = $($(this).attr("href")).offset().top - 60; // Adjust based on your navbar height
      if (scrollPos >= sectionOffset) {
        $(".navbar ul li a").removeClass("active");
        $(this).addClass("active");
      }
    });

    // Show/hide scroll-up button when scrolling
    if ($(this).scrollTop() > 300) {
      $("#scrollUpButton").fadeIn();
    } else {
      $("#scrollUpButton").fadeOut();
    }
  });

  // Smooth scroll and trigger animation refresh on navbar click
  $('a[href*="#"]').on("click", function (event) {
    event.preventDefault();
    var target = this.hash;

    // Smooth scroll
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top,
      },
      800,
      function () {
        // Jika bagian produk diklik, maka refresh animasinya
        if (target === "#products") {
          resetProductAnimations();
        }
        triggerAnimation($(target), true); // Force re-trigger animation when clicking navbar
      }
    );

    // Remove old active class and add new one
    $(".navbar ul li a").removeClass("active");
    $(this).addClass("active");
  });

  // Function to trigger animation on section
  function triggerAnimation($section, force) {
    if (!$section.hasClass("animated") || force) {
      // Apply animation class only if it hasn't been animated or force is true (when clicking navbar)
      $section.addClass("animated"); // Mark section as animated to prevent re-trigger

      $section.removeClass(
        "animate__animated animate__slideInDown animate__fadeInLeft animate__fadeInRight animate__fadeInUpBig"
      ); // Reset animations

      // Reset animation by forcing browser reflow/repaint
      setTimeout(function () {
        if ($section.is(".about")) {
          $section.addClass("animate__animated animate__fadeInLeft"); // Custom animation for about section
        } else if ($section.is(".products")) {
          $section.addClass(
            "animate__animated animate__fadeInRight animate__delay2s"
          );
        } else if ($section.is(".contact")) {
          $section.addClass("animate__animated animate__fadeInUpBig"); // Custom animation for products section
        } else {
          $section.addClass("animate__animated animate__slideInDown"); // Default animation for other sections
        }
      }, 100); // Delay to ensure animation resets properly
    }
  }

  // Function to reset animations for products
  function resetProductAnimations() {
    $(".product").each(function (index) {
      var delay = 1 + Math.floor(index / 3); // Mengatur delay animasi bertahap untuk setiap produk
      $(this).removeClass(
        "animate__animated animate__zoomIn animate__delay-" + delay + "s"
      ); // Remove existing animations

      // Re-add animation with delay
      setTimeout(() => {
        $(this).addClass(
          "animate__animated animate__zoomIn animate__delay-" + delay + "s"
        );
      }, 100); // Reset with small delay
    });
  }

  // Intersection Observer for scroll-triggered animations
  const sections = document.querySelectorAll("section");
  const observerOptions = {
    root: null, // Uses the viewport as the container
    threshold: 0.3, // Trigger when 30% of the section is visible
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !$(entry.target).hasClass("animated")) {
        // Trigger animation when section first comes into view and hasn't been animated
        triggerAnimation($(entry.target), false); // No forced animation for scrolling
      }
    });
  }, observerOptions);

  // Observe each section
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

    // Change the icon based on the mode
    if ($("body").hasClass("dark-mode")) {
      $("#darkModeIcon").text("🌞"); // Icon matahari untuk mode gelap
    } else {
      $("#darkModeIcon").text("🌙"); // Icon bulan untuk mode terang
    }
  });
});
