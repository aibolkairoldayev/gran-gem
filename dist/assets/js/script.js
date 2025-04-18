//preloader close
$(document).ready(()=>{
    $('.preloader').fadeOut('slow', function() {
        $(this).remove();
    });

});

// window.onload = function() {
//     sessionStorage.clear();
// }
setTimeout(function() {
    $('.preloader').fadeOut('slow', function() {
        $(this).remove();
    });
}, 3000);

//container left margin
var wholeWidth = $(window).width();
var containerWidth = $('.container').width();
var containerMargin = (wholeWidth - containerWidth) / 2;
var smallMargin =  containerMargin + 70;
if($(window).width() > 1200) {
    $('.events__bot').css('margin-left', smallMargin + 'px');
    $('.partners').css('margin-left', smallMargin + 'px');
    $('.block2__bot').css('margin-left', smallMargin + 'px');
    $('.gallery').css('margin-left', smallMargin + 'px');
    $('.serv__docs').css('margin-left', smallMargin + 'px');
    $('.chrono').css('margin-left', smallMargin + 'px');
    $('.chrono__slider .arrowRight').css('right', smallMargin + 'px');
    $('.chrono__slider .arrowLeft').css('right', smallMargin + 50 + 'px');
    $('.gallery__slider .arrowRight').css('right', smallMargin + 'px');
    $('.gallery__slider .arrowLeft').css('right', smallMargin + 50 + 'px');
    $('.partners__more').css('margin-right', smallMargin + 'px');

} else if (wholeWidth <= 576) {
    $('.events__bot').css('margin-left', '0');
    $('.partners').css('margin-left', '0');
    $('.gallery').css('margin-left', '0');
    $('.serv__docs').css('margin-left', '0');
    $('.chrono').css('margin-left', '0');
    $('.chrono__slider').css('margin-left', '15px');
    $('.partners__more').css('margin-right', smallMargin + '0');
} else {
    $('.events__bot').css('margin-left', containerMargin + 'px');
    $('.partners').css('margin-left', containerMargin + 'px');
    $('.block2__bot').css('margin-left', containerMargin + 'px');
    $('.gallery').css('margin-left', containerMargin + 'px');
    $('.serv__docs').css('margin-left', containerMargin + 'px');
    $('.chrono').css('margin-left', containerMargin + 'px');
    $('.chrono__slider .arrowRight').css('right', containerMargin + 'px');
    $('.chrono__slider .arrowLeft').css('right', containerMargin + 50 + 'px');
    $('.gallery__slider .arrowRight').css('right', containerMargin + 'px');
    $('.gallery__slider .arrowLeft').css('right', containerMargin + 50 + 'px');
}

//main page tabs
const titles = document.querySelectorAll('.events__group--title');
const items = document.querySelectorAll('.events__items');

titles.forEach((title, index) => {
    title.addEventListener('click', () => {
        titles.forEach(t => t.classList.remove('active'));
        items.forEach(item => item.classList.remove('active'));
        title.classList.add('active');
        items[index].classList.add('active');
    });
});

//about page show more
$('.about__block1--more').click(()=> {
    $('.about__block1--more').toggleClass('active');
    $('.about__block1--hidden').toggleClass('active');
})

//future page show more
$('.future__more').click(()=> {
    $('.future__more').toggleClass('active');
    $('.future__hidden').toggleClass('active');
})

//about page vertical tabs
const titles3 = document.querySelectorAll('.organ__tabs--item');
const items3 = document.querySelectorAll('.organ__content');

titles3.forEach((title, index) => {
    title.addEventListener('click', () => {
        console.log('ssa')
        titles3.forEach(t => t.classList.remove('active'));
        items3.forEach(item => item.classList.remove('active'));
        title.classList.add('active');
        items3[index].classList.add('active');
    });
});

// open and close modal1
if ($('.modal').length) {
    function openModal() {
        $('.modal').addClass('show');
        $('body').css('overflow', 'hidden');
    }
    function closeModal() {
        $('.modal').removeClass('show');
        $('body').css('overflow', 'unset');
    }
    $('.modal__wrapper1').click(()=> {
        closeModal()
    })
}

// open and close modal2
if ($('.modal2').length) {
    function openModal2() {
        $('.modal2').addClass('show');
        $('body').css('overflow', 'hidden');
    }
    function closeModal2() {
        $('.modal2').removeClass('show');
        $('body').css('overflow', 'unset');
    }
    $('.modal__wrapper2').click(()=> {
        closeModal2()
    })
}

// open and close modal3
if ($('.modal3').length) {
    function openModal3() {
        $('.modal3').addClass('show');
        $('body').css('overflow', 'hidden');
    }
    function closeModal3() {
        $('.modal3').removeClass('show');
        $('body').css('overflow', 'unset');
    }
    $('.modal__wrapper3').click(()=> {
        closeModal3()
    })
}

// open and close modal4
if ($('.modal4').length) {
    function openModal4() {
        $('.modal4').addClass('show');
        $('body').css('overflow', 'hidden');
    }
    function closeModal4() {
        $('.modal4').removeClass('show');
        $('body').css('overflow', 'unset');
    }
    $('.modal__wrapper4').click(()=> {
        closeModal4()
    })
}

// open and close modal5
if ($('.modal6').length) {
    function openModal6(id) {
        $('#representative_id').val(id);
        $('.modal6').addClass('show');
        $('body').css('overflow', 'hidden');
    }
    function closeModal6() {
        $('.modal6').removeClass('show');
        $('body').css('overflow', 'unset');
    }
    $('.modal__wrapper6').click(()=> {
        closeModal6()
    })
}

// open and close modal7
if ($('.modal7').length) {
    function openModal7() {
        $('.modal7').addClass('show');
        $('body').css('overflow', 'hidden');
    }
    function closeModal7() {
        $('.modal7').removeClass('show');
        $('body').css('overflow', 'unset');
    }
    $('.modal__wrapper7').click(()=> {
        closeModal7()
    })
}

if ($('.modal8').length) {
    function openModal8() {
        $('.modal8').addClass('show');
        $('body').css('overflow', 'hidden');
    }
    function closeModal8() {
        $('.modal8').removeClass('show');
        $('body').css('overflow', 'unset');
    }
    $('.modal__wrapper8').click(()=> {
        closeModal8()
    })
}

//burger open/closes
if($('.burger').length) {
    function disableScroll() {
        document.addEventListener('touchmove', preventDefault, { passive: false });
    }

    function enableScroll() {
        document.removeEventListener('touchmove', preventDefault);
    }

    function preventDefault(e) {
        e.preventDefault();
    }

    function toggleBurger() {
        const isHidden = $('body').hasClass('hidden');

        $('.burger').toggleClass('open');
        $('.burger__btn').toggleClass('open');
        $('body').toggleClass('hidden');
        $('header').toggleClass('not-transparent');

        if (!isHidden) {
            $('body').addClass('hidden');
            disableScroll();
        } else {
            $('body').removeClass('hidden');
            enableScroll();
        }
    }

    $('.burger__wrapper').click(()=> {
        toggleBurger();
    })
}

// open and close video
if ($('.modal-v').length) {
    function openVideo() {
        $('.modal-v').addClass('show');
        $('body').css('overflow', 'hidden');
    }
    function closeVideo() {
        $('.modal-v').removeClass('show');
        $('body').css('overflow', 'unset');
    }
    $('.modal-v__wrapper').click(()=> {
        closeVideo()
    })
}

//fixed header func
$(window).on('scroll', function() {
    if ($(window).scrollTop() > 100) {
        let currentScrollTop = $(window).scrollTop();

        // Обработка класса sticky
        if (currentScrollTop >= 150) {
            $('.header').addClass('sticky');
        } else {
            $('.header').removeClass('sticky');
        }

        // Обработка класса hidden
        if (currentScrollTop > lastScrollTop) {
            // Скролл вниз
            $('.header').addClass('hidden');
        } else {
            // Скролл вверх
            $('.header').removeClass('hidden');
        }

        lastScrollTop = currentScrollTop;

    }
});
let lastScrollTop = 0;

// const urlParams = new URLSearchParams(window.location.search);
// const start_date_params = urlParams.get('start_date');
// const end_date_params = urlParams.get('end_date');

// var startDate = start_date_params ? start_date_params : ''
// var endDate = end_date_params ?end_date_params :''
// //calendar
// $(document).ready(function() {
//     const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
//     let currentDate = startDate ? new Date(startDate) : new Date();

//     const eventDateShowDate = $(".calendar__days.calendar_show").data('eventdateshow');
//     if(eventDateShowDate){
//         const formattedDate = eventDateShowDate.split(' ')[0];

//         currentDate = new Date(formattedDate);
//     }



//     function renderCalendar(date) {
//       const year = date.getFullYear();
//       const month = date.getMonth();

//       $(".calendar__month").text(months[month]);
//       $(".calendar__year").text(year);

//       const firstDay = new Date(year, month, 1).getDay();
//       const lastDate = new Date(year, month + 1, 0).getDate();

//       const daysContainer = $(".calendar__days.calendar_main");
//       const daysShowContainer = $(".calendar__days.calendar_show");
//       const eventDateShow = $(".calendar__days.calendar_show").data('eventdateshow');
//       const eventDates = $(".calendar__days.calendar_main").data('eventdate');
//     //   console.log(eventDates);
//       daysContainer.empty();
//       daysShowContainer.empty();

//       // Пустые ячейки до первого дня
//       for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
//         daysContainer.append('<div class="calendar__day calendar__day--empty"></div>');
//         daysShowContainer.append('<div class="calendar__day calendar__day--empty"></div>');
//       }



//       // Дни месяца
//       for (let day = 1; day <= lastDate; day++) {
//         const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;



//         let extraClass = '';
//         let extraShowClass = '';
//         let date = new Date(dateString);
//         let dateStart = new Date(startDate);
//         let dateEnd = new Date(endDate);
//         if(dateString === startDate){
//             extraClass = 'start_date'
//         }else if(dateString === endDate){
//             extraClass = 'end_date'
//         }else if( date > dateStart && date < dateEnd){
//             extraClass = 'range_date'
//         }

//         if(eventDates){
//             if (eventDates.includes(dateString)) {
//                 extraClass += " dot"
//             }
//         }

//         if(eventDateShow){
//             if(eventDateShowDate.split(' ')[0] == dateString){
//                 extraShowClass = " event_curr"
//             }
//         }

//         daysContainer.append(`<div class="calendar__day calendar__day--filled ${extraClass}" data-date="${dateString}" onclick="clickDay(this)"><div class="circle">${day}</div></div>`);
//         daysShowContainer.append(`<div class="calendar__day calendar__day--filled ${extraShowClass}" data-date="${dateString}">${day}</div>`);

//       }

//     //   if()

//     }

//     $(".calendar__nav--prev").click(function() {
//       currentDate.setMonth(currentDate.getMonth() - 1);
//       renderCalendar(currentDate);
//     });

//     $(".calendar__nav--next").click(function() {
//       currentDate.setMonth(currentDate.getMonth() + 1);
//       renderCalendar(currentDate);
//     });

//     renderCalendar(currentDate);


//   });


//   function clickDay(e){
//     clicked_date = $(e).data('date');
//     start_date =  $( ".calendar_main .calendar__day.start_date" );
//     end_date =  $( ".calendar_main .calendar__day.end_date" );
//     if(startDate && endDate){
//         $(start_date[0]).removeClass('start_date')
//         $(end_date[0]).removeClass('end_date')
//         $( ".calendar__day.range_date" ).removeClass('range_date')
//         startDate=''
//         endDate=''

//         // sessionStorage.setItem('start_date',clicked_date)
//     }
//     if(!startDate){
//         $(e).toggleClass('start_date');
//          startDate=clicked_date;

//         // sessionStorage.setItem('start_date',clicked_date)
//         return;
//     }
//     if(startDate && !endDate){

//         if(new Date(clicked_date) > new Date(startDate)){
//             // console.log(start_date)
//             if(start_date.length > 0){

//                 start_date.nextUntil($(e)).addClass('range_date');
//             }else{
//                 let empty = $(".events2__content.active .calendar__day.calendar__day--empty");

//                 $(empty[empty.length - 1]).nextUntil($(e)).addClass('range_date')
//             }

//             $(e).toggleClass('end_date');
//             endDate = clicked_date;
//             const urlParams = new URLSearchParams(window.location.search);

//             urlParams.set('start_date', startDate);
//             urlParams.set('end_date', clicked_date);
//             urlParams.delete('period')

//             window.location.search = urlParams;
//         }

//         // sessionStorage.setItem('end_date',clicked_date)
//         return;
//     }
//   }




//events page tab
const titles2 = document.querySelectorAll('.events2__tab');
const items2 = document.querySelectorAll('.events2__content');

// const period = urlParams.get('period');

// if(period){
//     titles2.forEach(t => t.classList.remove('active'));
//     items2.forEach(item => item.classList.remove('active'));
//     $('.events2__tab.events2__tab--past').addClass('active');
//     items2[1].classList.add('active');
// }


titles2.forEach((title, index) => {
    title.addEventListener('click', () => {
        titles2.forEach(t => t.classList.remove('active'));
        items2.forEach(item => item.classList.remove('active'));
        title.classList.add('active');
        items2[index].classList.add('active');
    });
});

// sovet page items active toggle
$(document).ready(function () {
    $(".sovet__count").on("click", function () {
        const countryId = $(this).data("id");

        if($(this).hasClass('active')){
            $(this).removeClass("active");
            $(".sovet__item").each(function () {
                // var countries = $(this).data('countries');
                // if (countries.includes(countryId))
                    $(this).addClass("active");
            });
            return
        }

        // Remove 'active' class from all elements
        $(".sovet__count").removeClass("active");
        $(".sovet__item").removeClass("active");

        $(this).toggleClass("active");
        $(".sovet__item").each(function () {
            var countries = $(this).data('countries');
            if (countries.includes(countryId))
                $(this).toggleClass("active");
        });
    });
});

//search burger open/close
function searchOpen() {
    $('.sovet__search').addClass('open');
}

function searchClose() {
    $('.sovet__search').removeClass('open');
}

//search burger items active toggle
$(document).ready(function () {
    $('.sovet__search--item').on('click', function (e) {
      if ($(e.target).is('input[type="checkbox"]')) {
        return;
      }
      e.preventDefault();

     $('.sovet__search--item').each((index,item)=>{
        let checkboxLoop = $(item).find('input[type="checkbox"]')

        checkboxLoop.prop('checked', false);

        $(item).removeClass('active')

     })

      const checkbox = $(this).find('input[type="checkbox"]');

      checkbox.prop('checked', !checkbox.prop('checked'));

     $(this).toggleClass('active');

      updateAcceptState();
    });

    // Клик по элементу sovet__reset
    $('.sovet__reset').on('click', function () {
      $('.sovet__search--item').removeClass('active');
      $('.sovet__search--item input[type="checkbox"]').prop('checked', false);
      $('.sovet__accept').removeClass('active');

    });

    $('.sovet__accept').on('click', function (e) {

        const active = $('.sovet__search--item.active');
        const id = ($(active[0]).data('filtercountry'));

        $(".sovet__count").removeClass("active");
        $(".sovet__item").removeClass("active");


        $(".sovet__item").each(function () {
            var countries = $(this).data('countries');
            if (countries.includes(id))
                $(this).toggleClass("active");
        });

        searchClose()
    });

    $(".sovet__search__action").on("input", function () {
        let searchText = $(this).val().toLowerCase(); // Get input value and convert to lowercase
        $(".sovet__search--item").each(function () {
            let blockText = $(this).text().toLowerCase(); // Get text content of each block
            if (blockText.includes(searchText)) {
                $(this).removeClass("d-none"); // Show if text matches
            } else {
                $(this).addClass("d-none"); // Hide if text doesn't match
            }
        });
    });


    // Функция для обновления состояния sovet__accept
    function updateAcceptState() {
      if ($('.sovet__search--item.active').length > 0) {
        $('.sovet__accept').addClass('active');
      } else {
        $('.sovet__accept').removeClass('active');
      }
    }
  });

//sovetpage members tabs
const titles4 = document.querySelectorAll('.members__tab');
const items4 = document.querySelectorAll('.members__items');

titles4.forEach((title, index) => {
    title.addEventListener('click', () => {
        titles4.forEach(t => t.classList.remove('active'));
        items4.forEach(item => item.classList.remove('active'));
        title.classList.add('active');
        items4[index].classList.add('active');
    });
});

setTimeout(() => {
    $('.members__items').eq(1).removeClass('active');
}, 100);

// open and close search in header
if ($('.header__search').length) {
    function openSeacrh() {
        $('.header__menu').addClass('hidden');
        $('.header__input').addClass('show');
        $('.header__search').addClass('hidden');
    }
    function closeSearch() {
        $(".header__menu").removeClass("hidden");
        $(".header__input").removeClass("show");
        $(".header__search").removeClass("hidden");
        $("#searchInput").val("");
        $("#searchResults").empty();
    }

    let searchTimer;

    $("#searchInput").on("keyup", function () {
        clearTimeout(searchTimer);

        const query = $(this).val();

        if (query.length >= 2) {
            searchTimer = setTimeout(function () {
                $.ajax({
                    url: "/ajax/search",
                    method: "GET",
                    data: { query: query },
                    success: function (response) {
                        console.log(response);
                        let html = "";
                        let locale = response.locale ?? "ru";

                        if (response.results.length > 0) {
                            response.results.forEach(function (item) {
                                html += `
                                <div class="header__input--option">
                                    <img src="/assets/img/icons/search.svg" alt="search">
                                    <a
                                    style="display:flex; align-items:center; text-decoration:none; flex-grow:1; color:inherit;"
                                    href="/${locale}/${item.url}">
                                        <span>${item.title}</span>
                                    </a>
                                </div>
                            `;
                            });
                        } else {
                            html = `
                            <div class="header__input--option">
                                <span>Ничего не найдено</span>
                            </div>
                        `;
                        }

                        $("#searchResults").html(html);
                    },
                    error: function (xhr) {
                        console.log("Error:", xhr);
                    },
                });
            }, 500);
        } else {
            $("#searchResults").empty();
            $("#searchResults").html('<div class="loader_container"><div class="loader_search"></div> </div>');

        }
    });
}

//header search options open/close
$(document).ready(function () {
    $('.header__input input').on('input', function () {
      const $options = $('.header__input--options');
      if ($(this).val().trim() !== '') {
        $options.addClass('active');
      } else {
        $options.removeClass('active');
      }
    });

    $(window).on('scroll', function () {
        $('.header__input--options').removeClass('active');
    });

  });

// menu dropdown active
$(document).ready(function () {
    $('.with-drop').on('click', function () {
        $('.with-drop').not(this).removeClass('active');
        $(this).toggleClass('active');
    });

    $('.with-drop').on('mouseleave', function () {
        $(this).removeClass('active');
    });

    $(window).on('scroll', function () {
        $('.with-drop').removeClass('active');
    });
});

// pull items dropdown active
$(document).ready(function () {
    $('.pull__drop span').on('click', function () {
        $(this).closest('.pull__drop').toggleClass('active');
      });

    $('.pull__drop').on('mouseleave', function () {
        $(this).removeClass('active');
    });

    $(window).on('scroll', function () {
        $('.pull__drop').removeClass('active');
    });

    $('.pull__hidden--item').on('click', function (e) {
        const $input = $(this).find('input[type="checkbox"]');
        $(this).toggleClass('active');
        $input.prop('checked', !$input.prop('checked'));
        e.preventDefault();
      });

});

// sort dropdown in pull page
$('.pull__sort--current').click((event) => {
    event.stopPropagation();
    $('.pull__sort--current').toggleClass('active');
    $('.pull__sort--others').toggleClass('active');
});

$('.pull__sort').mouseleave(() => {
    $('.pull__sort--current').removeClass('active');
    $('.pull__sort--others').removeClass('active');
});

$('.pull__sort--other').click((event) => {
    event.stopPropagation();
    $('.pull__sort--current').removeClass('active');
    $('.pull__sort--others').removeClass('active');
});

$('.pull__sort--others').click((event) => {
    event.stopPropagation();
});

//speakers modal close/open
$(document).ready(function () {
    const $modal = $(".modal-s");
    const $modalItems = $(".modal-s__item");

    $(".speaker").on("click", function () {
        const index = $(this).index();

        $modal.addClass("open");
        $modalItems.removeClass("active");
        $modalItems.eq(index).addClass("active");
    });

    $(".modal-s__close, .modal-s__wrapper").on("click", function () {
        $modal.removeClass("open");
        $modalItems.removeClass("active");
    });
});

//thanks modal open/close
function thanksOpen() {
    $('.thanks').addClass('open');
    $('body').css('overflow', 'hidden');
}

function thanksClose() {
    $('.thanks').removeClass('open');
    $('body').css('overflow', 'unset');
}
$(".thanks__wrapper").on("click", function () {
    thanksClose();
});


//live popup open/close
function liveOpen() {
    $('.modal-o').addClass('open');
    $('body').css('overflow', 'hidden');
}

function liveClose() {
    $('.modal-o').removeClass('open');
    $('body').css('overflow', 'unset');
}
$(".modal-o__wrapper").on("click", function () {
    liveClose();
});

// comments show/hide in pull page
$(document).ready(function () {
    $('.comment__btn').on('click', function (e) {
      e.stopPropagation();
      const parent = $(this).closest('.pull__item');
      const comment = parent.find('.pull__comment');

      $('.pull__comment').not(comment).removeClass('active');
      comment.toggleClass('active');
    });

    $(document).on('click', function () {
      $('.pull__comment').removeClass('active');
    });


    $('.pull__comment').on('click', function (e) {
      e.stopPropagation();
    });
  });

//menu dropdown in burger
$(document).ready(function () {
    $('.burger__title').on('click', function () {
        const parentItem = $(this).closest('.burger__item');
        const isActive = parentItem.hasClass('active');
        $('.burger__item').removeClass('active');
        if (!isActive) {
            parentItem.addClass('active');
        }
    });
});

// modal dropdown func
$(document).ready(function () {
    $(".input__drop--current").on("click", function () {
        $(this).parent(".input__drop").toggleClass("active");
    });

    $(".input__drop--other").on("click", function () {
        const selectedText = $(this).text();
        $(".input__drop--current b").text(selectedText);
        $(this).closest(".input__drop").removeClass("active");
    });

    $(document).on("click", function (e) {
        if (!$(e.target).closest(".input__drop").length) {
            $(".input__drop").removeClass("active");
        }
    });
});

//serv page info hide/show
$('.serv__hider').click(()=> {
    $('.serv__text').toggleClass('hidding');
    $('.serv__hider').toggleClass('open');
})

//filters in pull page
function filterOpen() {
    $('.filters').addClass('open');
    $('body').css('overflow', 'hidden');
    $('.header').removeClass('hidden');
}

function filterClose() {
    $('.filters').removeClass('open');
    $('body').css('overflow', 'unset');
}
$(".filters__wrapper").on("click", function () {
    filterClose();
});

function filter2Open() {
    $('.filters').addClass('long');
    $('body').css('overflow', 'hidden');
}

function filter2Close() {
    $('.filters').removeClass('long');
    $('body').css('overflow', 'unset');
}

$(document).ready(function () {
    $(".filter2__item").on("click", function () {
        let index = $(this).index(); // Получаем индекс текущего элемента
        $(".filter3__inner").removeClass("active"); // Убираем класс active у всех элементов
        $(".filter3__inner").eq(index).addClass("active"); // Добавляем класс active соответствующему элементу
    });
});


//filters items active toggle
$(document).ready(function () {
    $(".filter3__item").on("click", function () {
        const checkbox = $(this).find("input[type='checkbox']"); // Находим чекбокс внутри
        const isChecked = checkbox.prop("checked"); // Проверяем текущее состояние чекбокса

        checkbox.prop("checked", !isChecked); // Переключаем состояние чекбокса
        $(this).toggleClass("active", !isChecked); // Переключаем класс active
    });
});
$(document).ready(function () {
    $(".filter3__reject").on("click", function (e) {
        e.preventDefault();

        const parentInner = $(this).closest(".filter3__inner");
        parentInner.find(".filter3__item").removeClass("active");
        parentInner.find("input[type='checkbox']").prop("checked", false);
    });

    $('.filter__line').on('click',function(e){
        filter2Close()
    })
});


//file name in modals width file type
$(document).ready(function () {
    const fileInput = document.getElementByClass('file1');
    const fileNameDiv = document.querySelector('.file-name1');

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            const fileName = fileInput.files[0].name;
            console.log(fileName);
            fileNameDiv.textContent = fileName;
        } else {
            fileNameDiv.textContent = '';
        }
    });
});

$(document).ready(function () {
    const fileInput = document.querySelector('file2');
    const fileNameDiv = document.querySelector('.file-name2');

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            const fileName = fileInput.files[0].name;
            console.log(fileName);
            fileNameDiv.textContent = fileName;
        } else {
            fileNameDiv.textContent = '';
        }
    });
});

//serv page form dropdown services choose
$(document).ready(function () {
    const $dropdown = $('.servdrop');
    const $selected = $('.servdrop__current');
    const $items = $dropdown.find('.servdrop__item');
    const $hiddenInput = $('.servdrop__hidden');
  
    $selected.on('click', function () {
      $dropdown.toggleClass('open');
    });
  
    $items.on('click', function () {
      const value = $(this).data('value');
      const text = $(this).text();
  
      $selected.text(text);
      $hiddenInput.val(value);
      $dropdown.removeClass('open');
    });
  
    $(document).on('click', function (e) {
      if (!$(e.target).closest('.servdrop').length) {
        $dropdown.removeClass('open');
      }
    });
  });