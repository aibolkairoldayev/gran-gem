// Динамичный базовый урл сайта
const baseApiUrl = window.location.origin.includes('localhost') 
  ? 'http://localhost' 
  : 'https://grangem-master-cvkurw.laravel.cloud';

// Функция форматирования цены с пробелами
function formatPriceWithSpaces(price) {
  return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Проверка наличия и актуальности цен избранного при загрузке
function checkFavoritesValidity() {
  let favs = JSON.parse(localStorage.getItem('favsItemsList')) || [];
  if (!favs.length) return;

  const cleanedIds = favs.map(item => {
    const rawId = String(item.id).replace(/^product/i, '').replace(/^0+/, '');
    return rawId;
  }).join(',');

  $.ajax({
    url: `${baseApiUrl}/api/wishlist?products=${cleanedIds}`,
    method: 'GET',
    success: function(response) {
      const validIds = response.map(item => String(item.id));

      favs = favs.filter(fav => {
        const cleanedFavId = String(fav.id).replace(/^product/i, '').replace(/^0+/, '');
        const found = response.find(item => String(item.id) === cleanedFavId);

        if (!found) {
          $(`.side__item[data-id="${fav.id}"]`).remove();
          $(`#${fav.id}`).find('.add-to-fav').removeClass('active');
          $('.product__fav').removeClass('active');
          return false;
        } else {
          if (found.has_price && found.price) {
            const currentPrice = fav.price.replace(/[^\d.,]/g, '').replace(',', '.');
            const newPrice = String(found.price);

            if (parseFloat(currentPrice) !== parseFloat(newPrice)) {
              fav.price = newPrice;
              $(`.side__item[data-id="${fav.id}"]`).find('p').text(formatPriceWithSpaces(newPrice));
            }
          }
          return true;
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
  let favs = JSON.parse(localStorage.getItem('favsItemsList')) || [];

  function addToFavoritesBlock(data) {
    const hasSizes = data.sizes && data.sizes.length;
    const sizeSelector = hasSizes ? `
      <div class="side__item--size">
        <span>${data.sizeTitle || 'Размер'}: </span> 
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
          <p>${formatPriceWithSpaces(data.price)}</p>
        </div>
        <div class="side__del">
          <img src="/assets/img/icons/delete.svg" alt="icon">
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
      selectedSize: getSelectedSize($block),
      sizeTitle: $block.find('.product__size--title2').text().trim() || 'Размер'
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

  favs.forEach(item => {
    addToFavoritesBlock(item);
    $('#' + item.id).find('.add-to-fav').addClass('active');
  });

  $('.fav-count-number').text(favs.length);

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

  $(document).on('click', '.side__item--select, .side__item--current', function (e) {
    e.stopPropagation();
    const $select = $(this).closest('.side__item--select');
    $('.side__item--options').not($select.find('.side__item--options')).hide();
    $select.find('.side__item--options').toggle();
  });

  $(document).on('click', '.side__item--size > span', function (e) {
    e.stopPropagation();
    const $select = $(this).siblings('.side__item--select');
    $('.side__item--options').not($select.find('.side__item--options')).hide();
    $select.find('.side__item--options').toggle();
  });

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

  $(document).on('click', function () {
    $('.side__item--options').hide();
  });
});



////////////////cart

// Проверка наличия и актуальности товаров в корзине при загрузке
function formatPrice(num) {
  return Number(num).toLocaleString('ru-RU').replace(/,/g, ' ');
}

function checkCartValidity() {
  let cart = JSON.parse(localStorage.getItem('cartItemsList')) || [];
  if (!cart.length) return;

  const cleanedIds = cart.map(item => String(item.id).replace(/^product/i, '').replace(/^0+/, '')).join(',');

  $.ajax({
    url: `${baseApiUrl}/api/cart-products?products=${cleanedIds}`,
    method: 'GET',
    success: function(response) {
      cart = cart.filter(cartItem => {
        const cleanedCartId = String(cartItem.id).replace(/^product/i, '').replace(/^0+/, '');
        const found = response.find(item => String(item.id) === cleanedCartId);

        if (!found) {
          $(`.side.cart .side__item[data-id="${cartItem.id}"]`).remove();
          return false;
        } else {
          if (found.has_price && found.price) {
            const currentPrice = cartItem.price.replace(/[^\d.,]/g, '').replace(',', '.');
            const newPrice = String(found.price);

            if (parseFloat(currentPrice) !== parseFloat(newPrice)) {
              cartItem.price = formatPrice(newPrice) + ' ₸';
              $(`.side.cart .side__item[data-id="${cartItem.id}"]`).find('p').text(formatPrice(newPrice) + ' ₸');
            }
          }
          return true;
        }
      });

      localStorage.setItem('cartItemsList', JSON.stringify(cart));
      updateCartCount();
      updateCartTotal();
    },
    error: function() {
      console.error('Не удалось проверить актуальность корзины');
    }
  });
}

function renderOrderItems() {
  let cart = JSON.parse(localStorage.getItem('cartItemsList')) || [];
  if (!cart.length) return;

  const $container = $('.order__items');
  $container.empty();

  cart.forEach(item => {
    const priceClean = item.price.replace(/[^\d.,]/g, '').replace(',', '.');
    const orderItem = `
      <div class="order__item" data-id="${item.id}">
        <div class="order__img">
          <picture><img src="${item.img}" alt="order"></picture>
        </div>
        <div class="order__info">
          <span>${item.code}</span>
          <div class="order__name">${item.name}</div>
          <div class="order__drop"></div>
          <div class="order__price">${formatPrice(priceClean)} ₸</div>
        </div>
        <div class="order__del"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">...</svg></div>
      </div>
    `;
    $container.append(orderItem);
  });

  const cleanedIds = cart.map(item => String(item.id).replace(/^product/i, '').replace(/^0+/, '')).join(',');

  $.ajax({
    url: `${baseApiUrl}/api/cart-products?products=${cleanedIds}`,
    method: 'GET',
    success: function(response) {
      cart = cart.filter(cartItem => {
        const cleanedCartId = String(cartItem.id).replace(/^product/i, '').replace(/^0+/, '');
        const found = response.find(item => String(item.id) === cleanedCartId);

        if (!found) {
          $(`.side.cart .side__item[data-id="${cartItem.id}"]`).remove();
          $(`.order__item[data-id="${cartItem.id}"]`).remove();
          return false;
        } else {
          if (found.has_price && found.price) {
            const currentPrice = cartItem.price.replace(/[^\d.,]/g, '').replace(',', '.');
            const newPrice = String(found.price);

            if (parseFloat(currentPrice) !== parseFloat(newPrice)) {
              cartItem.price = formatPrice(newPrice) + ' ₸';
              $(`.side.cart .side__item[data-id="${cartItem.id}"]`).find('p').text(formatPrice(newPrice) + ' ₸');
              $(`.order__item[data-id="${cartItem.id}"]`).find('.order__price').text(formatPrice(newPrice) + ' ₸');
            }
          }
          return true;
        }
      });

      localStorage.setItem('cartItemsList', JSON.stringify(cart));
      updateCartCount();
      updateCartTotal();
    },
    error: function() {
      console.error('Не удалось проверить актуальность корзины');
    }
  });
}

function updateCartTotal() {
  let total = 0;
  $('.side.cart .side__item--info p').each(function () {
    const priceText = $(this).text().replace(/[^\d]/g, '');
    const price = parseInt(priceText, 10);
    if (!isNaN(price)) total += price;
  });
  $('.main-total').text(formatPrice(total) + ' ₸');
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cartItemsList')) || [];
  $('.cart-count-number').text(cart.length);
}

$(document).ready(function () {
  let cart = JSON.parse(localStorage.getItem('cartItemsList')) || [];
  cart.forEach(item => addToCartBlock(item));
  updateCartCount();
  updateCartTotal();
  checkCartValidity();
  renderOrderItems();

  function addToCartBlock(data) {
    if ($(`.side.cart .side__item[data-id="${data.id}"]`).length) return;

    const priceClean = data.price.replace(/[^\d.,]/g, '').replace(',', '.');
    const cartItem = `
      <div class="side__item" data-id="${data.id}">
        <div class="side__item--img"><picture><img src="${data.img}" alt="product"></picture></div>
        <div class="side__item--info">
          <span>${data.code}</span>
          <b>${data.name}</b>
          ${data.selectedSize ? `<div class="side__size">Размер ${data.selectedSize}</div>` : ''}
          <p>${formatPrice(priceClean)} ₸</p>
        </div>
        <div class="side__del"><img src="/assets/img/icons/delete.svg" alt="icon"></div>
      </div>
    `;
    $('.side.cart .side__items').append(cartItem);
  }

  function getProductPageData($wrapper) {
    return {
      id: $wrapper.attr('id'),
      img: $wrapper.find('.product__slider--item picture img').attr('src') || 'assets/img/noimage.jpg',
      code: $wrapper.find('.product__code').text(),
      name: $wrapper.find('.product__name').text(),
      selectedSize: $wrapper.find('.product__size--selected').text(),
      price: formatPrice($wrapper.find('.product__price').text().replace(/[^\d.,]/g, '').replace(',', '.')) + ' ₸'
    };
  }

  const $pageWrapper = $('.product__content');
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
      renderOrderItems();
    }
  });

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
    renderOrderItems();
  });

  $(document).on('click', '.side.cart .side__del', function () {
    const $item = $(this).closest('.side__item');
    const id = $item.data('id');
    $item.remove();
    let cart = JSON.parse(localStorage.getItem('cartItemsList')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cartItemsList', JSON.stringify(cart));
    updateCartCount();
    updateCartTotal();
    renderOrderItems();
  });

  $(document).on('click', '.order__del', function () {
    const $item = $(this).closest('.order__item');
    const id = $item.data('id');
    $item.remove();
    let cart = JSON.parse(localStorage.getItem('cartItemsList')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cartItemsList', JSON.stringify(cart));
    $(`.side.cart .side__item[data-id="${id}"]`).remove();
    updateCartCount();
    updateCartTotal();
  });
});



/////you watched func
$(document).ready(function() {
    function formatPrice(num) {
        return Number(num).toLocaleString('ru-RU').replace(/,/g, ' ');
    }

    if ($('.product').length) {
        const productContent = $('.product__content');
        const productId = parseInt(productContent.attr('id').replace(/\D/g, ''), 10);
        const productName = $.trim($('.product__name').text());
        const productLink = window.location.href;
        const productImg = $('.product__slider--item picture img').first().attr('src');
        const productArtRaw = $('.product__art').text().match(/\d+/);
        const productArt = productArtRaw ? productArtRaw[0] : '';
        const productPriceRaw = $('.product__price b').text().replace(/\D/g, '');
        const productPrice = productPriceRaw ? formatPrice(productPriceRaw) : '';

        const favsListRaw = localStorage.getItem('favsItemsList');
        let favsList = [];
        if (favsListRaw) {
            try {
                favsList = JSON.parse(favsListRaw);
            } catch (e) {}
        }

        const isFav = favsList.some(item => parseInt(item.id.replace(/\D/g, ''), 10) === productId);

        const productObj = {
            id: productId,
            name: productName,
            link: productLink,
            img: productImg,
            art: productArt,
            price: productPrice,
            fav: isFav
        };

        const watchListRaw = localStorage.getItem('watchItemsList');
        let watchList = [];
        if (watchListRaw) {
            try {
                watchList = JSON.parse(watchListRaw);
            } catch (e) {}
        }

        watchList = watchList.filter(item => parseInt(item.id, 10) !== productId);
        watchList.push(productObj);
        localStorage.setItem('watchItemsList', JSON.stringify(watchList));

        const $watchBlock = $('.watch');
        const $watchContainer = $('.category__items.category__items3');
        $watchContainer.empty();

        const watchListForRender = watchList
            .filter(item => parseInt(item.id, 10) !== productId)
            .slice(-4)
            .reverse();

        if (watchListForRender.length === 0) {
            $watchBlock.hide();
        } else {
            $watchBlock.show();
            watchListForRender.forEach(item => {
                const favClass = item.fav ? ' active' : '';
                const priceText = item.price ? `${formatPrice(item.price.replace(/[^\d.,]/g, '').replace(',', '.'))} ₸` : 'Цена по запросу';
                const productHtml = `
                <a href="${item.link}" class="category__item product0 main-item" id="product${item.id}">
                    <div class="block__item--favs main-item__favs add-to-fav${favClass}">
                        <img class="fav--empty" src="/assets/img/icons/favs.svg" alt="cart">
                        <img class="fav--full" src="/assets/img/icons/favs3.svg" alt="cart">
                    </div>
                    <div class="category__item--img">
                        <picture>
                            <img class="product0-img" src="${item.img}" alt="product">
                        </picture>
                    </div>
                    <div class="category__item--info">
                        <span class="product0-art">${item.art}</span>
                        <b class="product0-name">${item.name}</b>
                        <p class="product0-price">${priceText}</p>
                    </div>
                </a>
                `;
                $watchContainer.append(productHtml);
            });
        }
    }
});
