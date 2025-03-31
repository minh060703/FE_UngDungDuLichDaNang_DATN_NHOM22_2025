<template lang="">
    <div class="container">
        <div class="card" >
            <div>
                <div class="text-center">
                    <i class="fa-solid fa-user-tie circle-icon" style="font-size: 50px;"></i>
                </div>
                <div class="text-center mt-2">
                    <h1 style="color: #58D0C1;">Welcome, Admin</h1>
                </div>
                <div class="ms-3 mt-4 me-3 ">
                    <div class="input-wrapper">
                        <i class="fa-solid fa-user-tie"></i>
                        <input type="text" placeholder="Username">
                    </div>
                    <div class="input-wrapper mt-3">
                        <i class="fa-solid fa-lock"></i>
                        <input type="password" placeholder="Password">
                    </div>
                </div>
                <div class="text-center mt-4">
                    <button class="btn-login" v-on:click="login">Đăng nhập</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username: '', // Tên đăng nhập
            password: '', // Mật khẩu
            isAuthenticated: false // Kiểm tra xem người dùng đã đăng nhập chưa
        };
    },
    methods: {
        
    }
}
</script>
<style>
.card {
    width: 500px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid #58D0C1;
    /* viền màu xanh */
    border-radius: 12px;
    /* bo góc */
    padding: 20px;
    background: #fff;
    /* nền trắng */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    /* thêm chút shadow cho đẹp */
}

.circle-icon {
    font-size: 50px;
    color: #58D0C1;
    background: #ffffff;
    /* màu nền vòng tròn */
    border-radius: 50%;
    /* vòng tròn */
    padding: 20px;
    /* đệm trong vòng tròn */
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #58D0C1;
    /* viền vòng tròn */
    width: 100px;
    height: 100px;
}

.form-control {
    font-size: 20px;
    /* phóng to chữ */
    height: 60px;
    /* phóng to chiều cao input */
}

.input-wrapper {
    position: relative;
    width: 100%;

}

.input-wrapper i {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    color: #58D0C1;
    /* màu xanh */
    font-size: 20px;
}

.input-wrapper input {
    padding-left: 45px;
    height: 50px;
    font-size: 18px;
    width: 100%;
    border-radius: 8px;
    border: 1px solid #58D0C1;
    background: #fff;
    /* nền trắng */
    color: #58D0C1;
    /* màu chữ xanh */
}

.input-wrapper input::placeholder {
    color: #58D0C1;
    /* placeholder màu xanh */
    opacity: 1;
    /* đảm bảo không bị mờ */
}

.btn-login {
    background-color: #58D0C1;
    /* màu xanh */
    color: #fff;
    /* chữ trắng */
    font-size: 20px;
    /* chữ to */
    padding: 12px 30px;
    /* đệm trong nút */
    border: none;
    border-radius: 60px;
    /* bo góc */
    cursor: pointer;
    /* con trỏ khi hover */
    transition: 0.5s ease;
    /* hiệu ứng chuyển động */
    border: 2px solid transparent;
    /* đặt sẵn border để hover không làm rung form */
}

.btn-login:hover {
    background-color: #ffffff;
    /* xanh đậm hơn khi hover */
    color: #000000;
    /* chữ trắng */
    border: 2px solid #58D0C1;
    /* viền vòng tròn */
}
</style>