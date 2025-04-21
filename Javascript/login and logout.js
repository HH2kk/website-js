const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");
    const loginBtn = document.getElementById("loginBtn");

    loginBtn.onclick = () => loginModal.style.display = "block";

    function closeModal() {
      loginModal.style.display = "none";
      registerModal.style.display = "none";
    }

    function showRegister() {
      loginModal.style.display = "none";
      registerModal.style.display = "block";
    }

    function showLogin() {
      registerModal.style.display = "none";
      loginModal.style.display = "block";
    }

    function register() {
      const newUser = document.getElementById("reg-username").value;
      const newPass = document.getElementById("reg-password").value;

      if (!newUser || !newPass) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
      }

      localStorage.setItem("username", newUser);
      localStorage.setItem("password", newPass);
      alert("Đăng ký thành công!");

      // Tự động chuyển sang đăng nhập với thông tin vừa tạo
      document.getElementById("login-username").value = newUser;
      document.getElementById("login-password").value = newPass;

      showLogin();
    }

    function login() {
      const inputUser = document.getElementById("login-username").value;
      const inputPass = document.getElementById("login-password").value;

      const storedUser = localStorage.getItem("username");
      const storedPass = localStorage.getItem("password");

      if (inputUser === storedUser && inputPass === storedPass) {
        alert("Đăng nhập thành công!");
        closeModal();
        // Có thể chuyển trang ở đây nếu muốn
        // window.location.href = "trang-chinh.html";
      } else {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
      }
    }

    // Tắt modal khi click ngoài vùng
    window.onclick = function(event) {
      if (event.target === loginModal || event.target === registerModal) {
        closeModal();
      }
    }