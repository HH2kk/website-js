// Lấy dữ liệu sản phẩm từ localStorage (nếu có), nếu không thì tạo mảng rỗng
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Biến đếm số lượng sản phẩm đã thêm vào giỏ (tính theo độ dài mảng)
let cartCount = cartItems.length;

// Lấy tất cả các nút "Thêm vào giỏ" và phần tử hiển thị số lượng giỏ hàng
const buttons = document.querySelectorAll('.button-btn');
const cartCountEl = document.querySelector('.cart-count');

// Cập nhật số lượng hiển thị ban đầu lên giao diện
cartCountEl.textContent = cartCount;

// Gắn sự kiện click cho từng nút "Thêm vào giỏ"
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định (nếu là thẻ <a>)

        // Tìm phần tử chứa thông tin sản phẩm gần nhất
        const product = button.closest('.product');

        // Lấy tên và giá sản phẩm
        const productName = product.querySelector('h3')?.innerText;
        const productPrice = product.querySelector('p')?.innerText;

        // Nếu có đủ thông tin sản phẩm thì thêm vào mảng và lưu lại
        if (productName && productPrice) {
            cartItems.push({ name: productName, price: productPrice });
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }

        // Tăng số lượng sản phẩm đã thêm
        cartCount++;
        cartCountEl.textContent = cartCount;

        // Thêm hiệu ứng nhấn vào biểu tượng giỏ hàng
        cartCountEl.classList.add('bump');
        setTimeout(() => cartCountEl.classList.remove('bump'), 200);

        // Thêm hiệu ứng cho nút khi được nhấn
        button.classList.add('clicked');
        setTimeout(() => button.classList.remove('clicked'), 300);
    });
});
