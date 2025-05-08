$(document).ready(function () {
    let favs = JSON.parse(localStorage.getItem('favsItemsList')) || [];
  
    // Инициализация: восстановить активные классы и заполнить избранное
    favs.forEach(function (id) {
      const $product = $('#' + id);
      $product.find('.add-to-fav').addClass('active');
      addToFavoritesBlock($product);
    });
  
    $('.fav-count-number').text(favs.length);
  
    // Обработка нажатия на иконку избранного
    $('.add-to-fav').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
  
      const $product = $(this).closest('.main-item');
      const id = $product.attr('id');
      const index = favs.indexOf(id);
  
      if (index !== -1) {
        // Уже в избранном — удалить
        favs.splice(index, 1);
        $(this).removeClass('active');
        $('.side__item[data-id="' + id + '"]').remove();
      } else {
        // Добавить в избранное
        favs.push(id);
        $(this).addClass('active');
        addToFavoritesBlock($product);
      }
  
      $('.fav-count-number').text(favs.length);
      localStorage.setItem('favsItemsList', JSON.stringify(favs));
    });
  
    // Удаление из избранного через блок favs__items
    $(document).on('click', '.side__del', function () {
      const $item = $(this).closest('.side__item');
      const id = $item.data('id');
  
      $item.remove();
      favs = favs.filter(item => item !== id);
      $('.fav-count-number').text(favs.length);
      localStorage.setItem('favsItemsList', JSON.stringify(favs));
  
      // Убрать класс active с основного товара
      $('#' + id).find('.add-to-fav').removeClass('active');
    });
  
    function addToFavoritesBlock($product) {
      const id = $product.attr('id');
      const imgSrc = $product.find('picture img').attr('src');
      const name = $product.find('.product0-name').text();
      const price = $product.find('.product0-price').text();
      const code = $product.find('span').first().text();
  
      const favItem = `
        <div class="side__item" data-id="${id}">
          <div class="side__item--img">
            <picture>
              <img src="${imgSrc}" alt="product">
            </picture>
          </div>
          <div class="side__item--info">
            <span>${code}</span>
            <b>${name}</b>
            <p>${price}</p>
          </div>
          <div class="side__del">
            <img src="assets/img/icons/delete.svg" alt="icon">
          </div>
        </div>`;
  
      $('.favs__items').append(favItem);
    }
  });
