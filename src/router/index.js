import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save

const routes = [
    {
        path : '/quanlytaikhoan',
        component: ()=>import('../components/QuanLy/QuanLyTaiKhoan/index.vue')
    },
    {
        path : '/quanlydonhang/dondangxetduyet',
        component: ()=>import('../components/QuanLy/QuanLyDonHang/DonDangXetDuyet/index.vue')
    },
    {
        path : '/quanlydonhang/dondanggiao',
        component: ()=>import('../components/QuanLy/QuanLyDonHang/DonDangGiao/index.vue')
    },
    {
        path : '/quanlydonhang/dondathanhtoan',
        component: ()=>import('../components/QuanLy/QuanLyDonHang/DonDaThanhToan/index.vue')
    },
    {
        path : '/quanlydonhang/dondahuy',
        component: ()=>import('../components/QuanLy/QuanLyDonHang/DonDaHuy/index.vue')
    },
    {
        path : '/quanlydiadiem',
        component: ()=>import('../components/QuanLy/QuanLyDiaDiem/index.vue')
    },
    {
        path : '/quanlysanpham',
        component: ()=>import('../components/QuanLy/QuanLySanPham/index.vue')
    },
    {
        path : '/quanlynhaphang',
        component: ()=>import('../components/QuanLy/QuanLyNhapHang/index.vue')
    },
    {
        path : '/quanlybaiviet',
        component: ()=>import('../components/QuanLy/QuanLyBaiViet/index.vue')
    },
    {
        path : '/baocaothongke',
        component: ()=>import('../components/QuanLy/BaoCaoThongKe/index.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router