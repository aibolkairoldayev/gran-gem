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
// if ($('.product__names').length) {
//     const $inputs = $('.product__size--items input[type="radio"]');

//     // ✅ Если инпут всего один, сразу выбрать его
//     if ($inputs.length === 1) {
//         $inputs.prop('checked', true);
//         $('.product__cart').addClass('active');
//     }

//     // ✅ При клике по любому инпуту активировать .product__cart
//     $inputs.on('click', () => {
//         $('.product__cart').addClass('active');
//     });
// }

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

//placeholders in forms with red *
$(document).ready(function () {
  $('.contacts__label input').each(function () {
    const $input = $(this);
    const $label = $input.closest('.contacts__label');
    const $b = $label.find('b');

    // Поведение при вводе текста (для всех)
    $input.on('input', function () {
      if ($input.val().trim() !== '') {
        $b.hide();
      } else if (!$label.hasClass('tel__label')) {
        $b.show(); // для tel__label не показываем обратно на input
      }
    });

    // Поведение при фокусе (только для tel__label)
    if ($label.hasClass('tel__label')) {
      $input.on('focus', function () {
        $b.hide();
      });

      $input.on('blur', function () {
        if ($input.val().trim() === '') {
          $b.show();
        }
      });
    }
  });
});


//validation checkbox in order page
$(document).ready(function() {
  const $checkbox = $('#checkbox1');
  const $button = $('.order__form--btn');

  $button.prop('disabled', !$checkbox.is(':checked'));

  $checkbox.on('change', function() {
    $button.prop('disabled', !$(this).is(':checked'));
  });

  $button.closest('form').on('submit', function(e) {
    if (!$checkbox.is(':checked')) {
      e.preventDefault();
      alert('Пожалуйста, согласитесь с правилами и политикой конфиденциальности.');
    }
  });
});

//order page send btn activation validation
$(document).ready(function () {

    //radio btw delivery and pickup tabs
$('input[name="delivery_type"]').on('change', function() {
    $('.order__tab').removeClass('active');
        $(this).closest('.order__tab').addClass('active');
    
        if ($(this).val() === 'self_pickup') {
            $('.order__address').removeClass('active');
            $('#address-input').removeAttr('required');
        } else if ($(this).val() === 'delivery') {
            $('.order__address').addClass('active');
            $('#address-input').attr('required', 'required');
        }

        toggleButtonActive();
    });
    const $orderLeft = $('.order__left');

    if ($orderLeft.length > 0) {
        const $btn = $orderLeft.find('.order__form--btn');

        function toggleButtonActive() {
            // Получаем актуальный список required input каждый раз
            const $requiredInputs = $orderLeft.find('input[required]');
            let allFilled = true;

            $requiredInputs.each(function () {
                if ($.trim($(this).val()) === '') {
                    allFilled = false;
                    return false; // прерываем each
                }
            });

            if (allFilled) {
                $btn.addClass('active');
            } else {
                $btn.removeClass('active');
            }
        }

        // Отслеживаем ввод во все input (required может добавляться и убираться)
        $orderLeft.on('input', 'input', toggleButtonActive);

        // Проверка при загрузке
        toggleButtonActive();

        // Проверка при смене таба
        $('.order__tab').on('click', function () {
            toggleButtonActive();
        });
    }
});



//category page products tab func
$(document).ready(function() {
  $('.category__tab').on('click', function() {
    // Переключить активный таб
    $('.category__tab').removeClass('active');
    $(this).addClass('active');

    // Получить выбранное значение
    const selectedTab = $(this).attr('data-tab');

    // Перебрать все элементы
    $('.category__item').each(function() {
      const itemTab = $(this).attr('data-tab');

      if (
        selectedTab === '0' ||
        (itemTab && itemTab.split(' ').includes(selectedTab))
      ) {
        $(this).removeClass('hide');
      } else {
        $(this).addClass('hide');
      }
    });
  });
});

//show more btn func in categiry page
$(document).ready(function () {
    const itemsPerClick = 4;
    const $itemsContainer = $('.category__items2');
    const $items = $itemsContainer.find('.category__item');
    const $btn = $('.category__btn');

    // Если элементов 4 или меньше — показываем все и скрываем кнопку
    if ($items.length <= itemsPerClick) {
        $items.show();
        $btn.hide();
    } else {
        // Иначе показываем только первые 4, остальные скрываем
        $items.hide().slice(0, itemsPerClick).show();

        $btn.on('click', function () {
            const $hiddenItems = $items.filter(':hidden');
            $hiddenItems.slice(0, itemsPerClick).fadeIn();

            if ($items.filter(':hidden').length === 0) {
                $btn.fadeOut();
            }
        });
    }
});

//order page items adding to form
$(document).ready(function() {
    $('form').on('submit', function(e) {
        // собираем данные всех товаров
        let orderItemsData = [];

        $('.order__item').each(function() {
            const id = $(this).find('.order__info span').text().trim();
            const name = $(this).find('.order__name').text().trim();
            const price = $(this).find('.order__price').text().trim();

            orderItemsData.push({
                id: id,
                name: name,
                price: price
            });
        });

        // вставляем данные в скрытый textarea
        $('#orderItemsData').val(JSON.stringify(orderItemsData));
    });
});


//header numbers dropdown func
$(document).ready(function() {
    $('.header__number--btn').on('click', function(e) {
        e.stopPropagation(); // чтобы клик не всплывал на документ
        $('.header__number').toggleClass('active');
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('.header__number').length) {
            $('.header__number').removeClass('active');
        }
    });
});
