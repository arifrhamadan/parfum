$(document).ready(function() {
  // Mengatur penggulangan aktif pada navbar
  $(window).scroll(function() {
    var scrollPos = $(document).scrollTop();

    $(".navbar ul li a").each(function() {
      var sectionOffset = $($(this).attr("href")).offset().top - 60;
      if (scrollPos >= sectionOffset) {
        $(".navbar ul li a").removeClass("active");
        $(this).addClass("active");
      }
    });

    // Menampilkan atau menyembunyikan tombol scroll ke atas
    if ($(this).scrollTop() > 300) {
      $("#scrollUpButton").fadeIn();
    } else {
      $("#scrollUpButton").fadeOut();
    }
  });

  // Menghapus animasi scroll dan menggunakan AOS
  $('a[href*="#"]').on("click", function(event) {
    event.preventDefault();
    var target = this.hash;

    // Scroll ke target tanpa animasi
    $('html, body').scrollTop($(target).offset().top);

    $(".navbar ul li a").removeClass("active");
    $(this).addClass("active");
  });

  // Reset animasi untuk bagian produk
  function resetProductSectionAnimation() {
    var $productSection = $("#products");
    var $productTitle = $productSection.find("h2");

    // Reset animasi pada h2
    $productTitle.removeClass("animate__animated animate__lightSpeedInLeft");

    // Re-trigger animasi setelah sedikit jeda
    setTimeout(function() {
      $productTitle.addClass("animate__animated animate__lightSpeedInLeft");
    }, 100);

    resetProductAnimations();
  }

  // Reset animasi untuk produk
  function resetProductAnimations() {
    $(".product").each(function(index) {
      var delay = 1 + index * 0.5;
      if ($(window).width() <= 768) {
        delay = 0.5 + index * 0.3;
      }

      $(this).removeClass("animate__animated animate__zoomIn");

      setTimeout(() => {
        $(this)
          .addClass("animate__animated animate__zoomIn")
          .css("animation-delay", delay + "s");
      }, 100);
    });
  }
  
  // Reset animasi untuk bagian home
  function resetHomeAnimation() {
    var $homeText = $("#home .hero-text");
    var $homeButton = $("#home .button");
    var $homeLogo = $("#home .hero-logo img");
  
    // Menghapus animasi yang ada
    $homeText.removeClass("animate__animated animate__zoomIn");
    $homeButton.removeClass("animate__animated animate__zoomIn");
    $homeLogo.removeClass("animate__animated animate__zoomIn");
  
    setTimeout(function() {
      $homeText.addClass("animate__animated animate__zoomIn");
      $homeButton.addClass("animate__animated animate__zoomIn");
      $homeLogo.addClass("animate__animated animate__zoomIn");
    }, 100);
  }
  
  // Men-trigger animasi untuk bagian tertentu
  function triggerAnimation($section, force) {
    if (!$section.hasClass("animated") || force) {
      $section.addClass("animated");
      $section.removeClass(
        "animate__animated animate__slideInDown animate__fadeInUp animate__lightSpeedInLeft animate__slideInUp"
      );
  
      setTimeout(function() {
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
  
  // IntersectionObserver untuk animasi bagian yang di-scroll
  const sections = document.querySelectorAll("section");
  const observerOptions = {
    root: null,
    threshold: window.innerWidth <= 768 ? 0.1 : 0.3,
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !$(entry.target).hasClass("animated")) {
        triggerAnimation($(entry.target), false);

        if ($(entry.target).is("#products")) {
          $(entry.target)
            .find("h2")
            .addClass("animate__animated animate__lightSpeedInLeft");

          $(entry.target)
            .find(".product")
            .each(function(index) {
              var delay = 1 + index * 0.5;
              if ($(window).width() <= 768) {
                delay = 0.5 + index * 0.3;
              }

              if (!$(this).hasClass("animate__animated")) {
                $(this).css("animation-delay", delay + "s");
                $(this).addClass("animate__animated animate__zoomIn");
              }
            });
        }
      }
    });
  }, observerOptions);
  
  sections.forEach(function(section) {
    observer.observe(section);
  });
});

// Fungsi untuk toggle dark mode
$(document).ready(function() {
  $("#darkModeToggle").on("click", function() {
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

// Fungsi untuk hamburger menu
$(document).ready(function() {
  $("#hamburgerMenu").click(function() {
    $("#mobileMenu").toggleClass("active");
    $("body").toggleClass("no-scroll");
  });

  $("#mobileMenu a").click(function() {
    $("#mobileMenu").removeClass("active");
    $("body").removeClass("no-scroll");
  });

  $(document).click(function(e) {
    if (!$(e.target).closest("#hamburgerMenu, #mobileMenu").length) {
      $("#mobileMenu").removeClass("active");
      $("body").removeClass("no-scroll");
    }
  });
});

// Fungsi untuk menampilkan informasi produk
function showInfo(image) {
  const product = image.closest(".product");
  const moreInfo = product.querySelector(".more-info");
  moreInfo.style.display = "flex";
}

// Fungsi untuk menyembunyikan informasi produk
function hideInfo(info) {
  info.style.display = "none";
}
