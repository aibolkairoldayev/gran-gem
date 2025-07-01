// Динамичный базовый урл сайта
const baseApiUrl = window.location.origin.includes('localhost') 
  ? 'http://localhost' 
  : 'https://grangem-master-cvkurw.laravel.cloud';

// Проверка наличия и актуальности цен избранного при загрузке
function checkFavoritesValidity() {
  let favs = JSON.parse(localStorage.getItem('favsItemsList')) || [];
  if (!favs.length) return;

  // Собираем id всех товаров через запятую для запроса
  const ids = favs.map(item => item.id).join(',');
  
  $.ajax({
    url: `${baseApiUrl}/api/wishlist?products=${ids}`,
    method: 'GET',
    success: function(response) {
      const validIds = response.map(item => String(item.id));

      favs = favs.filter(fav => {
        const found = response.find(item => String(item.id) === String(fav.id));

        if (!found) {
          // Удаляем из DOM, localStorage и кнопок, если товара больше нет
          $(`.side__item[data-id="${fav.id}"]`).remove();
          $(`#${fav.id}`).find('.add-to-fav').removeClass('active');
          $('.product__fav').removeClass('active');
          return false; // Удаляем из favs
        } else {
          // Проверяем и обновляем цену, если есть и она изменилась
          if (found.has_price && found.price_in_dollars) {
            const currentPrice = fav.price.replace(/[^\d.,]/g, '').replace(',', '.');
            const newPrice = parseFloat(found.price_in_dollars).toFixed(2);

            if (parseFloat(currentPrice) !== parseFloat(newPrice)) {
              fav.price = newPrice;
              $(`.side__item[data-id="${fav.id}"]`).find('p').text(newPrice);
            }
          }
          return true; // Оставляем в favs
        }
      });

      localStorage.setItem('favsItemsList', JSON.stringify(favs));
      $('.fav-count-number').text(favs.length);
    },
    error: function() {
      console.error('Не удалось проверить актуальность избранного');
    }
  });
}

$(document).ready(function () {
  checkFavoritesValidity();
});


//////old func

$(document).ready(function () {
  checkFavoritesValidity();
  let favs = JSON.parse(localStorage.getItem('favsItemsList')) || [];

  // Функция отрисовки блока избранного
  function addToFavoritesBlock(data) {
    const hasSizes = data.sizes && data.sizes.length;
    const sizeSelector = hasSizes ? `
      <div class="side__item--size">
        <span>Размер: </span>
        <div class="side__item--select" data-id="${data.id}">
          <div class="side__item--current">${data.selectedSize}</div>
          <div class="side__item--options">
            ${data.sizes.map(size => `
              <div class="side__item--option ${size === data.selectedSize ? 'active' : ''}">${size}</div>
            `).join('')}
          </div>
        </div>
      </div>
    ` : '';

    const favItem = `
      <div class="side__item" data-id="${data.id}">
        <div class="side__item--img">
          <picture>
            <img src="${data.img}" alt="product">
          </picture>
        </div>
        <div class="side__item--info">
          <span>${data.code}</span>
          <b>${data.name}</b>
          ${sizeSelector}
          <p>${data.price}</p>
        </div>
        <div class="side__del">
          <img src="assets/img/icons/delete.svg" alt="icon">
        </div>
      </div>`;
    
    $('.favs__items').append(favItem);
  }

  function getSelectedSize($block) {
    const $checked = $block.find('input[type="radio"]:checked');
    if ($checked.length) return $checked.val();
    const $first = $block.find('input[type="radio"]').first();
    return $first.length ? $first.val() : null;
  }

  function getAllSizes($block) {
    return $block.find('input[type="radio"]').map(function () {
      return $(this).val();
    }).get();
  }

  function getProductPageData($block) {
    return {
      id: $block.attr('id'),
      img: $block.find('.product__slider--item').first().find('picture img').attr('src') || 'assets/img/noimage.jpg',
      name: $block.find('.product__name').text().trim(),
      price: $block.find('.product__price b').text().trim(),
      code: $block.find('.product__art').text().replace('Артикул:', '').trim(),
      sizes: getAllSizes($block),
      selectedSize: getSelectedSize($block)
    };
  }

  function getProductData($product) {
    return {
      id: $product.attr('id'),
      img: $product.find('picture img').attr('src'),
      name: $product.find('.product0-name').text(),
      price: $product.find('.product0-price').text(),
      code: $product.find('span').first().text(),
      sizes: [],
      selectedSize: null
    };
  }

  // Инициализация
  favs.forEach(item => {
    addToFavoritesBlock(item);
    $('#' + item.id).find('.add-to-fav').addClass('active');
  });

  $('.fav-count-number').text(favs.length);

  // Клик по кнопке "в избранное" в списке
  $('.add-to-fav').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    const $product = $(this).closest('.main-item');
    const id = $product.attr('id');
    const index = favs.findIndex(item => item.id === id);

    if (index !== -1) {
      favs.splice(index, 1);
      $(this).removeClass('active');
      $('.side__item[data-id="' + id + '"]').remove();
    } else {
      const itemData = getProductData($product);
      favs.push(itemData);
      $(this).addClass('active');
      addToFavoritesBlock(itemData);
    }

    $('.fav-count-number').text(favs.length);
    localStorage.setItem('favsItemsList', JSON.stringify(favs));
  });

  // Кнопка "в избранное" на странице товара
  const $pageWrapper = $('.product__content');
  const productId = $pageWrapper.attr('id');

  if (productId && favs.find(item => item.id === productId)) {
    $('.product__fav').addClass('active');
  }

  $('.product__fav').on('click', function () {
    const index = favs.findIndex(item => item.id === productId);

    if (index !== -1) {
      favs.splice(index, 1);
      $(this).removeClass('active');
      $('.side__item[data-id="' + productId + '"]').remove();
    } else {
      const itemData = getProductPageData($pageWrapper);
      favs.push(itemData);
      $(this).addClass('active');
      addToFavoritesBlock(itemData);
    }

    $('.fav-count-number').text(favs.length);
    localStorage.setItem('favsItemsList', JSON.stringify(favs));
  });

  // Удаление из блока избранного
  $(document).on('click', '.side__del', function () {
    const $item = $(this).closest('.side__item');
    const id = $item.data('id');

    $item.remove();
    favs = favs.filter(item => item.id !== id);
    $('.fav-count-number').text(favs.length);
    localStorage.setItem('favsItemsList', JSON.stringify(favs));
    $('#' + id).find('.add-to-fav').removeClass('active');
    $('.product__fav').removeClass('active');
  });

   // Клик по select или current
  $(document).on('click', '.side__item--select, .side__item--current', function (e) {
    e.stopPropagation();
    const $select = $(this).closest('.side__item--select');
    $('.side__item--options').not($select.find('.side__item--options')).hide();
    $select.find('.side__item--options').toggle();
  });

  // Клик по span в side__item--size
  $(document).on('click', '.side__item--size > span', function (e) {
    e.stopPropagation();
    const $select = $(this).siblings('.side__item--select');
    $('.side__item--options').not($select.find('.side__item--options')).hide();
    $select.find('.side__item--options').toggle();
  });

  // Клик по опции
  $(document).on('click', '.side__item--option', function (e) {
    e.stopPropagation();
    const $option = $(this);
    const selectedText = $option.text().trim();
    const $select = $option.closest('.side__item--select');
    const id = $select.data('id');

    $select.find('.side__item--option').removeClass('active');
    $option.addClass('active');
    $select.find('.side__item--current').text(selectedText);
    $select.find('.side__item--options').hide();

    let favs = JSON.parse(localStorage.getItem('favsItemsList')) || [];
    const item = favs.find(i => i.id === id);
    if (item) {
      item.selectedSize = selectedText;
      localStorage.setItem('favsItemsList', JSON.stringify(favs));
    }
  });

  // Клик вне элементов — закрывает всё
  $(document).on('click', function () {
    $('.side__item--options').hide();
  });
});



////////////////cart
$(document).ready(function () {
  // ====== INIT: Отрисовка товаров из localStorage при загрузке ======
  let cart = JSON.parse(localStorage.getItem('cartItemsList')) || [];
  cart.forEach(item => addToCartBlock(item));
  updateCartCount();
  updateCartTotal();

  // ====== ФУНКЦИЯ: Отрисовать товар в блоке .side.cart ======
  function addToCartBlock(data) {
    // Проверка на дублирование
    if ($('.side.cart .side__item[data-id="' + data.id + '"]').length) return;

    const cartItem = `
      <div class="side__item" data-id="${data.id}">
        <div class="side__item--img">
          <picture>
            <img src="${data.img}" alt="product">
          </picture>
        </div>
        <div class="side__item--info">
          <span>${data.code}</span>
          <b>${data.name}</b>
          ${data.selectedSize ? `<div class="side__size">Размер ${data.selectedSize}</div>` : ''}
          <p>${data.price}</p>
        </div>
        <div class="side__del">
          <img src="assets/img/icons/delete.svg" alt="icon">
        </div>
      </div>
    `;
    $('.side.cart .side__items').append(cartItem);
  }

  function getProductPageData($wrapper) {
  return {
    id: $wrapper.attr('id'),
    img: $wrapper.find('.product__slider--item').first().find('picture img').attr('src') || 'assets/img/noimage.jpg',
    code: $wrapper.find('.product__code').text(),
    name: $wrapper.find('.product__name').text(),
    selectedSize: $wrapper.find('.product__size--selected').text(), // если есть
    price: $wrapper.find('.product__price').text()
  };
}


  // ====== ФУНКЦИЯ: Обновить счетчик корзины ======
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cartItemsList')) || [];
    $('.cart-count-number').text(cart.length);
  }
  // ====== ФУНКЦИЯ: Обновить общую сумму корзины ======
  function updateCartTotal() {
  let total = 0;

  $('.side.cart .side__item--info p').each(function () {
    const priceText = $(this).text().replace(/[^\d]/g, '');
    const price = parseInt(priceText, 10);
    if (!isNaN(price)) total += price;
  });

  const formatted = total.toLocaleString('ru-RU').replace(/,/g, ' ');
  $('.main-total').text(formatted + ' ₸');
}

  // ====== ДОБАВИТЬ ТОВАР В КОРЗИНУ СО СТРАНИЦЫ ТОВАРА ======
  const $pageWrapper = $('.product__content');
  const productId = $pageWrapper.attr('id');

  $('.product__cart').on('click', function () {
    const itemData = getProductPageData($pageWrapper);
    let cart = JSON.parse(localStorage.getItem('cartItemsList')) || [];

    const alreadyInCart = cart.some(item => item.id === itemData.id);
    if (!alreadyInCart) {
      cart.push(itemData);
      addToCartBlock(itemData);
      localStorage.setItem('cartItemsList', JSON.stringify(cart));
      updateCartCount();
      updateCartTotal();
    }
  });

  // ====== ДОБАВИТЬ ВСЕ ИЗ ИЗБРАННОГО В КОРЗИНУ ======
  $(document).on('click', '.side__btn', function () {
    const favs = JSON.parse(localStorage.getItem('favsItemsList')) || [];
    let cart = JSON.parse(localStorage.getItem('cartItemsList')) || [];

    favs.forEach(favItem => {
      const alreadyInCart = cart.some(cartItem => cartItem.id === favItem.id);
      if (!alreadyInCart) {
        cart.push(favItem);
        addToCartBlock(favItem);
      }
    });

    localStorage.setItem('cartItemsList', JSON.stringify(cart));
    updateCartCount();
    updateCartTotal();
  });

  // ====== УДАЛЕНИЕ ТОВАРА ИЗ КОРЗИНЫ ======
  $(document).on('click', '.side.cart .side__del', function () {
    const $item = $(this).closest('.side__item');
    const id = $item.data('id');

    $item.remove();
    let cart = JSON.parse(localStorage.getItem('cartItemsList')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cartItemsList', JSON.stringify(cart));
    updateCartCount();
    updateCartTotal();
  });
});
