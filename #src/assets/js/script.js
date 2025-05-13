//preloader close
$(document).ready(()=>{
    $('.preloader').fadeOut('slow', function() {
        $(this).remove();
    });

});

setTimeout(function() {
    $('.preloader').fadeOut('slow', function() {
        $(this).remove();
    });
}, 3000);

// ques items open/close in main page
$('.ques__top').on('click', function () {
    const $parent = $(this).closest('.ques__item');
  
    if (!$parent.hasClass('show')) {
      $('.ques__item').removeClass('show');
      $parent.addClass('show');
    } else {
      $parent.removeClass('show');
    }
  });

//burger open/close
function openBurger() {
    $('.burger').addClass('open');
    $('body').css('overflow', 'hidden');
}
function closeBurger() {
    $('.burger').removeClass('open');
    $('body').css('overflow', 'unset');
}
$('.burger__wrapper').click(()=> {
    closeBurger()
})

//burger submenu open/close
if($(window).width() < 768) {
    $('.burger__main').click(()=> {
        $('.burger__submenu').toggleClass('open')
    })
}

//contacts page checkbox active
if ($('.contacts__form--label').length) {
    $('.contacts__form--label').click(()=> {
        $('.checked').toggleClass('active');
    })
} 


//radio btw delivery and pickup tabs
$('input[name="deliveryType"]').on('change', function() {
    $('.order__tab').removeClass('active');
    $(this).closest('.order__tab').addClass('active');
  
    if ($(this).val() === 'pickup') {
      $('.order__address').removeClass('active');
      $('#address-input').removeAttr('required');
    } else if ($(this).val() === 'delivery') {
      $('.order__address').addClass('active');
      $('#address-input').attr('required', 'required');
    }
});

//banks tab in order page
$('input[name="bank"]').on('change', function() {
    $('.order__pay--item').removeClass('active');
    $(this).closest('.order__pay--item').addClass('active');
});

//accordion in product page
$('.product__item--top').on('click', function () {
    $(this).closest('.product__item').toggleClass('active');
});
  
// open/close modal
function openModal() {
    $('.modal1').addClass('open');
    $('body').css('overflow', 'hidden');
}
function closeModal() {
    $('.modal1').removeClass('open');
    $('body').css('overflow', 'unset');
}
$('.modal1__wrapper').click(()=> {
    closeModal()
})

// open/close modal2
function openModal2() {
    $('.modal2').addClass('open');
    $('body').css('overflow', 'hidden');
}
function closeModal2() {
    $('.modal2').removeClass('open');
    $('body').css('overflow', 'unset');
}
$('.modal1__wrapper').click(()=> {
    closeModal2()
})

// open/close modal3
function openModal3() {
    $('.modal3').addClass('open');
    $('body').css('overflow', 'hidden');
}
function closeModal3() {
    $('.modal3').removeClass('open');
    $('body').css('overflow', 'unset');
}
$('.modal1__wrapper').click(()=> {
    closeModal3()
})

// open/close favs
function openFavs() {
    $('.favs').addClass('open');
    $('body').css('overflow', 'hidden');
}
function closeFavs() {
    $('.favs').removeClass('open');
    $('body').css('overflow', 'unset');
}
$('.side__wrapper').click(()=> {
    closeFavs()
})

// open/close cart
function openCart() {
    $('.cart').addClass('open');
    $('body').css('overflow', 'hidden');
}
function closeCart() {
    $('.cart').removeClass('open');
    $('body').css('overflow', 'unset');
}
$('.side__wrapper').click(()=> {
    closeCart()
})

// add congrats checkbox
$('.add-congrats__label').click(()=> {
    $('.add-congrats__label').toggleClass('active');
})

//radio input in product page sizes 
$(document).on('change', 'input[type="radio"][name="size"]', function () {
  $(this).closest('fieldset').find('label').removeClass('active');
  $(this).closest('label').addClass('active');
});

//cart btn activation in product page
if ($('.product__names').length) {
    $('.product__size--items input').click(()=> {
        $('.product__cart').addClass('active')
    })
}

// open/close sizing img
function openSize() {
    $('.sizing').addClass('open');
    $('body').css('overflow', 'hidden');
}
function closeSize() {
    $('.sizing').removeClass('open');
    $('body').css('overflow', 'unset');
}
$('.sizing__wrapper').click(()=> {
    closeSize()
})

//congrats textarea in order page
if ($('.order').length) {
    $(document).ready(function () {
  const $shown = $('#congrats__shown');
  const $hidden = $('#congrats__hidden');
  const $button = $('.order__congrats--btn');

  $shown.on('input', function () {
    if ($(this).val().trim() !== '') {
      $button.addClass('active');
    } else {
      $button.removeClass('active');
    }
  });

  $button.on('click', function () {
    const text = $shown.val();
    $hidden.val(text); 
    console.log('Передано в #congrats__hidden:', $hidden.val());
    $button.removeClass('active');
  });
});

}
