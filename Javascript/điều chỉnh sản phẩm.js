let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Gộp sản phẩm trùng tên khi load giỏ hàng
        const mergedCart = [];
        cartItems.forEach(item => {
            const existing = mergedCart.find(i => i.name === item.name);
            if (existing) {
                existing.quantity += item.quantity || 1;
            } else {
                mergedCart.push({...item, quantity: item.quantity || 1});
            }
        });
        cartItems = mergedCart;
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        const cartBody = document.getElementById('cart-body');
        const totalPriceEl = document.getElementById('total-price');

        function renderCart() {
            cartBody.innerHTML = '';
            let total = 0;

            cartItems.forEach((item, index) => {
                const itemPrice = parseInt(item.price.replace(/[^0-9]/g, ''));
                const lineTotal = item.quantity * itemPrice;
                total += lineTotal;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td class="quantity-controls">
                        <button onclick="changeQuantity(${index}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity(${index}, 1)">+</button>
                    </td>
                    <td>${lineTotal.toLocaleString('vi-VN')}₫</td>
                `;
                cartBody.appendChild(row);
            });

            totalPriceEl.textContent = total.toLocaleString('vi-VN') + '₫';
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }

        function changeQuantity(index, delta) {
            cartItems[index].quantity += delta;
            if (cartItems[index].quantity < 1) cartItems[index].quantity = 1;
            renderCart();
        }

        renderCart();