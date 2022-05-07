const swiper = new Swiper('.swiper', {
    // Optional parameters
    spaceBetween: 40,
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },


});


function countFunc(count) {
    let btnPlus = count.querySelector('.add');
    let btnMinus = count.querySelector('.subtract');
    let field = count.querySelector('.js-number');
    let fieldValue = parseFloat(field.value, 10);

    btnMinus.addEventListener('click', function () {
        if (fieldValue > 1) {
            fieldValue--;
            field.value = fieldValue;
        } else {
            return 1;
        }
    });
    btnPlus.addEventListener('click', function () {
        fieldValue++;
        field.value = fieldValue;
    });

}
let counts = document.querySelectorAll('.button-card-wrapper');
counts.forEach(countFunc);


