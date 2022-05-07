// добаляем в корзину
const products = document.getElementsByClassName("product");
var addCart = function () {
    event.preventDefault();

    let el = this;
    let id = this.getAttribute("data-id");
    let title = this.getAttribute("data-title");
    let price = this.getAttribute("data-price");
    let photo = this.getAttribute("data-photo");
    let components = this.getAttribute("data-components");
    // получаем корзину
    let carts = JSON.parse(sessionStorage.getItem('carts'));
    if (carts) {
        let b = false;
        carts.forEach((element, ind) => {
            if (element.id == id) {
                // элемент в корзине
                // увеличим на  один
                b = true;
                carts[ind].count = 1 + parseInt(carts[ind].count)
            }
        });
        // продукта нету
        if (!b) {
            carts.push({
                id: id,
                title: title,
                price: price,
                photo: photo,
                components: components,
                count: 1
            })
        }
        sessionStorage.setItem("carts", JSON.stringify(carts));
    } else {
        let bdata = [
            {
                id: id,
                title: title,
                price: price,
                photo: photo,
                components: components,
                count: 1
            }
        ];
        sessionStorage.setItem("carts", JSON.stringify(bdata));
    }

    let span = document.createElement("a");
    span.innerHTML = '<img src="../images/icons/shop.svg">'
    span.href = "/card.html";
    span.setAttribute(
        'style',
        ' color:#BA3709; font-size:14px;',
    );
    el.replaceWith(span);
};
Array.from(products).forEach(function (product) {
    product.addEventListener('click', addCart, { once: true });
});
const Cart = {
    data() {
        return {
            carts: [],
            total: 0,
            name: '',
            phone: '',
            email: '',
            adress: '',
            disabled: false,
            success: false
        }
    },
    created() {
        let carts = JSON.parse(sessionStorage.getItem('carts'));
        if (carts) {
            this.carts = carts;
        }
        this.total_get();
    },
    methods: {
        //уменьшить
        minus(key) {
            if (parseInt(this.carts[key].count) > 1) {
                this.carts[key].count = parseInt(this.carts[key].count) - 1;
                this.total_get();
                sessionStorage.setItem("carts", JSON.stringify(this.carts));
            }
        },
        //уменьшить
        plus(key) {
            let count = parseInt(this.carts[key].count) + 1
            this.carts[key].count = count;
            this.total_get();
            sessionStorage.setItem("carts", JSON.stringify(this.carts));
        },
        //удалить с корзины
        del(index) {
            this.carts.splice(index, 1);
            this.total_get();
            sessionStorage.setItem("carts", JSON.stringify(this.carts));
        },
        // цена
        total_get() {
            let total = 0;
            this.carts.forEach((element, ind) => {
                total += parseInt(element.price) * parseInt(element.count);
            });
            this.total = total;
        },
        //отправка формы
        onSubmit() {
            this.disabled = true;
            let xhr = new XMLHttpRequest();
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    const response = JSON.parse(xhr.responseText);
                    this.disabled = false;
                    this.success = true;
                    // обнулить корзину
                    this.carts = [];
                    sessionStorage.setItem("carts", JSON.stringify(this.carts));
                    this.total = 0,
                        this.name = '',
                        this.adress = '',
                        this.email = '',
                        this.phone = '';
                    setTimeout(() => {
                        this.success = false;
                    }, 3000)
                } else {
                    alert('Ошибка!Повторите позже')
                }
            };
            const json = {
                "name": this.name,
                "phone": this.phone,
                "email": this.email,
                "adress": this.adress,
                "total": this.total,
                "carts": this.carts
            };

            xhr.open('POST', '/inc/mail.php', 1);
            xhr.setRequestHeader("Accept", "application/json");
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(json));


        },
        currencyFormat: function (num) {
            num = parseInt(num)
            return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
        }
    }
}
if (document.getElementById('cart')) {
    Vue.createApp(Cart).mount('#cart')
}
