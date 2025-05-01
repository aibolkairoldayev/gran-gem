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
  