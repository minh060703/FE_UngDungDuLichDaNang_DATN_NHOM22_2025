<template>
  <div class="nav-container primary-menu">
    <div class="mobile-topbar-header">
      <div>
        <img src="assets/images/logo-icon.png" class="logo-icon" alt="logo icon" />
      </div>
      <div>
        <h4 class="logo-text">Rukada</h4>
      </div>
      <div class="toggle-icon ms-auto"><i class="bx bx-arrow-to-left"></i></div>
    </div>
    <nav class="navbar navbar-expand-xl w-100">
      <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
        <li class="nav-item">
          <a class="nav-link" href="/quanlytaikhoan">
            <div class="parent-icon"></div>
            <div class="menu-title">Quản lý tài khoản</div>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/quanlysanpham">
            <div class="parent-icon"></div>
            <div class="menu-title">Quản lý sản phẩm</div>
          </a>
        </li>
        <li class="nav-item dropdown">
          <a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown">
            <div class="parent-icon">
            </div>
            <div class="menu-title">Quản Lý Đơn Hàng</div>
          </a>
          <ul class="dropdown-menu">
            <li> <a class="dropdown-item" href="/quanlydonhang/dondangxetduyet"><i class="bx bx-right-arrow-alt"></i>Đơn đang xét
                duyệt</a>
            </li>
            <li> <a class="dropdown-item" href="/quanlydonhang/dondanggiao"><i class="bx bx-right-arrow-alt"></i>Đơn
                đang giao</a>
            </li>
            <li> <a class="dropdown-item" href="/quanlydonhang/dondathanhtoan"><i class="bx bx-right-arrow-alt"></i>Đơn
                đã thanh toán</a>
            </li>
            <li> <a class="dropdown-item" href="/quanlydonhang/dondahuy"><i class="bx bx-right-arrow-alt"></i>Đơn đã hủy</a>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/quanlybaiviet">
            <div class="parent-icon"></div>
            <div class="menu-title">Quản lý bài viết</div>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/quanlydiadiem">
            <div class="parent-icon"></div>
            <div class="menu-title">Quản lý địa điểm</div>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/quanlynhaphang">
            <div class="parent-icon"></div>
            <div class="menu-title">Quản lý nhập hàng</div>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/baocaothongke">
            <div class="parent-icon"></div>
            <div class="menu-title">Báo cáo thống kê</div>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {};
</script>
<style></style>