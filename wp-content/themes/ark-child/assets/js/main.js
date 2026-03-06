jQuery(document).ready(function () {
  // console.log("js sotatek");

  // menu header
  const menuItemLinks = jQuery(
    "#sotatek_header_menu .menu-item-has-children > a"
  );
  const body = jQuery("body");
  const toggle = jQuery(".sotatek-header .toggle");

  menuItemLinks.click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    jQuery(this).siblings(".sub-menu").toggleClass("expand");

    // close form search
    // console.log("close popup form search");
    jQuery(".header-search-form").removeClass("active");
  });

  toggle.click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    body.toggleClass("header-active");

    // close form search
    // console.log("close popup form search");
    jQuery(".header-search-form").removeClass("active");
  });

  // scroll header
  jQuery(window).on("scroll", function () {
    if (jQuery(window).scrollTop() > 50) {
      jQuery("header").addClass("stick");
    } else {
      jQuery("header").removeClass("stick");
    }

    var scrollPosition = jQuery(window).scrollTop(); // Vị trí cuộn hiện tại
    var documentHeight = jQuery(document).height(); // Tổng chiều cao trang
    var windowHeight = jQuery(window).height(); // Chiều cao cửa sổ trình duyệt

    // Mặc định: Tính 85% tổng chiều cao trang
    var scrollTrigger = documentHeight * 0.85;

    // Nếu là trang đặc biệt → đổi trigger thành 30%
    if (jQuery("body").hasClass("page-newsnew")) {
      scrollTrigger = documentHeight * 0.3;
    }

    if (scrollPosition > scrollTrigger - windowHeight) {
      jQuery("#back_to_top").fadeIn(300);
    } else {
      jQuery("#back_to_top").fadeOut(300);
    }
  });

  // Back to top
  if (jQuery("#back_to_top").length) {
    jQuery("#back_to_top").on("click", function () {
      jQuery("html, body").animate(
        {
          scrollTop: jQuery("html, body").offset().top,
        },
        1000
      );
    });
  }

  // tool socical mobile ở menu, lấy data tool socical ở footer
  const toolLinks = jQuery(".tool__item a");
  const societyLinks = jQuery(".menu-mobile-society a");
  const societyImages = jQuery(".menu-mobile-society img");

  toolLinks.each(function (index) {
    const href = jQuery(this).attr("href");
    const bg = jQuery(this).css("background-image");
    const imageMatch = bg.match(/url\(["']?(.*?)["']?\)/);

    if (societyLinks.eq(index).length) {
      // Gán href
      societyLinks.eq(index).attr("href", href);
    }

    if (imageMatch && societyImages.eq(index).length) {
      // Gán src ảnh
      societyImages.eq(index).attr("src", imageMatch[1]);
    }
  });

  // // language
  // var language_text_icon =
  //   '<img src="../images/icon-language.svg">';
  // var language_text_icon = language_text_icon + currentLang;
  // jQuery(".s-language-switcher .language-active").html(language_text_icon);

  // var $el = jQuery(".s-language-switcher .language-active");
  // var $ee = jQuery(".s-language-switcher ul");
  // $el.click(function (e) {
  //   e.stopPropagation();
  //   $ee.toggleClass("active");
  // });
  // jQuery(document).on("click", function (e) {
  //   if (jQuery(e.target) != $el && $ee.hasClass("active")) {
  //     $ee.removeClass("active");
  //   }
  // });

	//語系選單
		const langSwitcher = document.querySelector('.s-language-switcher');
		const langList = langSwitcher.querySelector('ul');

		// 1. 處理點擊選單本身的切換
		langSwitcher.addEventListener('click', function(e) {
		    langList.classList.toggle('active');
		    // 阻止事件往上傳到 window，避免觸發下方的關閉邏輯
		    e.stopPropagation();
		});

		// 2. 點擊螢幕任何其他地方就移除 active
		window.addEventListener('click', function() {
		    if (langList.classList.contains('active')) {
		        langList.classList.remove('active');
		    }
		});
  // search header
  jQuery(".header-search > img").click(function (e) {
    e.stopPropagation();
    jQuery(".header-search-form").toggleClass("active");
  });
  // Khi click bên ngoài form, ẩn form nếu nó đang mở
  jQuery(document).click(function (e) {
    // console.log("click out form search");
    // nếu đang click ngoài form thì close form
    if (!jQuery(e.target).closest(".header-search-form").length) {
      jQuery(".header-search-form").removeClass("active");
    }
  });
  // Khi click img close form search
  jQuery("img.close-form-search").click(function (e) {
    // console.log("click img.close-form-search");
    jQuery(".header-search-form").removeClass("active");
  });

  // required field country cf7
  document.addEventListener(
    "wpcf7invalid",
    function (event) {
      var countryFieldCheck = event.detail.inputs.find(
        (input) => input.name === "country_auto-718"
      );
      if (countryFieldCheck) {
        // console.log("Tồn tại, giá trị là:", countryFieldCheck.value);
        $wpcf7_id = event.detail.unitTag;
        var countryField = jQuery("#" + $wpcf7_id + " select.country_auto");

        if (currentLang == "en") {
          var errorMessage = "Please select a country.";
        } else if (currentLang == "kr") {
          var errorMessage = "국가를 선택하십시오.";
        } else if (currentLang == "tw") {
          var errorMessage = "請選擇一個國家。";
        } else if (currentLang == "vi") {
          var errorMessage = "Vui lòng chọn quốc gia.";
        }

        countryField.parent().find(".wpcf7-not-valid-tip").remove();
        if (countryField.val() === "0") {
          event.preventDefault();
          var new_row = jQuery(
            "<span class='wpcf7-not-valid-tip'>" + errorMessage + "</span>"
          );
          countryField.after(new_row);
        }
      }
    },
    false
  );

  // form 7 accept_representative
  jQuery("form.wpcf7-form").on("submit", function (event) {
    if (!jQuery("input[name='accept_representative[]']").is(":checked")) {
      jQuery(
        ".pum-content .popup-content .form p > [data-name='representative_name']"
      ).hide();
    }
  });

  jQuery("input[name='accept_representative[]']").change(function () {
    if (jQuery(this).is(":checked")) {
      jQuery(
        ".pum-content .popup-content .form p > [data-name='representative_name']"
      ).show();
      jQuery(".representative_name").attr("aria-required", "true");
      jQuery(".representative_name").addClass("wpcf7-validates-as-required");
      jQuery(".representative_name").show();
    } else {
      jQuery(
        ".pum-content .popup-content .form p > span .wpcf7-not-valid-tip"
      ).remove();
      jQuery(
        ".pum-content .popup-content .form p > [data-name='representative_name']"
      ).hide();
      jQuery(".representative_name").attr("aria-required", "");
      jQuery(".representative_name").removeClass("wpcf7-validates-as-required");
    }
  });

  // show-more-cats on list post
  jQuery(".show-more-cats").on("click", function (e) {
    // console.log("show-more-cats");
    e.preventDefault();
    jQuery(this).hide(); // Ẩn nút +n
    jQuery(this).siblings(".hidden-cats").show(); // Hiện toàn bộ cat còn lại
  });
});

// fix link anz no add param gl, glc tracking marketing
jQuery(document).ready(function ($) {
  $('a[href*="sotatek.com.au"]').on("click", function (e) {
    e.preventDefault();
    window.location.href = "https://sotatek.com.au/";
  });
});
