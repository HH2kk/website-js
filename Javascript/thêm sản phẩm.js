let cartCount = 0;
        const cartItems = [];

        const buttons = document.querySelectorAll('.button-btn');
        const cartCountEl = document.querySelector('.cart-count');

        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const product = button.closest('.product');
                const productName = product.querySelector('h3')?.innerText;
                const productPrice = product.querySelector('p')?.innerText;

                if (productName && productPrice) {
                    cartItems.push({ name: productName, price: productPrice });
                    localStorage.setItem('cartItems', JSON.stringify(cartItems));
                }

                cartCount++;
                cartCountEl.textContent = cartCount;

                cartCountEl.classList.add('bump');
                setTimeout(() => cartCountEl.classList.remove('bump'), 200);

                button.classList.add('clicked');
                setTimeout(() => button.classList.remove('clicked'), 300);
            });
        });