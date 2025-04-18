<template>
    <div class="row">
        <div class="card">
            <div class="card-header" style="padding: 20px;">
                <div>
                    <h2>Quản lý địa điểm</h2>
                </div>
            </div>
            <div class="card-body">
                <!-- Tiêu đề -->
                <div class="d-lg-flex align-items-center mb-4 gap-3">
                    <div class="position-relative">
                        <input type="text" class="form-control ps-5 radius-30 search" placeholder="Tìm kiếm" id="search"
                            v-model="searchTerm">
                        <span class="position-absolute top-50 product-show translate-middle-y">
                            <i class="bx bx-search"></i>
                        </span>
                    </div>
                    <div class="ms-auto"><a href="javascript:;" class="btn btn-primary radius-30 mt-2 mt-lg-0"
                            data-bs-toggle="modal" data-bs-target="#ModalThemDiaDiem"><i
                                class="bx bxs-plus-square"></i>Thêm
                            mới địa điểm</a></div>
                </div>
                <!-- Bảng thống kê -->
                <div class=" d-flex justify-content-b" style="font-size: 18px;">
                    <div class="card" style="width: 18%;">
                        <div class="card-body d-flex justify-content-between">
                            <h5 class="card-title">Tổng số địa điểm</h5>
                            <div class="widget-numbers">{{ tongSoDiaDiem }}</div>
                        </div>
                    </div>
                    <div class="card ms-3 text-success bg-light-success" style="width: 18%;">
                        <div class="card-body  d-flex justify-content-between">
                            <h5 class="card-title">Địa điểm đang hoạt động</h5>
                            <div class="widget-numbers">{{ soDiaDiemHoatDong }}</div>
                        </div>
                    </div>
                    <div class="card ms-3 text-warning bg-light-warning" style="width: 18%;">
                        <div class="card-body d-flex justify-content-between">
                            <h5 class="card-title">Địa điểm tạm dừng</h5>
                            <div class="widget-numbers">{{ soDiaDiemTamDung }}</div>
                        </div>
                    </div>
                </div>
                <!-- Danh sách sản phẩm -->
                <div class="table-responsive ">
                    <table class="table mb-0 table-hover">
                        <thead class="table-light">
                            <tr>
                                <th class="text-center">STT</th>
                                <th class="text-center">ID địa điểm</th>
                                <th class="">Tên địa điểm</th>
                                <th class="text-center">Mô tả</th>
                                <th class="text-center">Địa chỉ</th>
                                <th class="text-center">Danh mục</th>
                                <th class="text-center">Tình trạng</th>
                                <th class="text-center">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(value, index) in paginatedData" :key="index"
                                style="vertical-align: middle;font-size: 16px;">
                                <td class="text-center">
                                    <h6 class="mb-0 font-14">{{ index + 1 + (currentPage - 1) * itemsPerPage }}</h6>
                                </td>
                                <td class="text-center"># {{ value.id_dia_diem }}</td>
                                <td>
                                    <img v-bind:src="value.hinh_anh" class="me-3" alt=""
                                        style="max-width: 60px;max-height: 60px;height: 60px;width: 60px;border-radius: 10px;">{{
                                            value.ten_dia_diem }}
                                </td>
                                <td>{{ value.mo_ta }}</td>
                                <td>{{ value.dia_chi }}</td>
                                <td class="text-center">
                                    {{ value.danh_muc }}
                                </td>
                                <td style="text-align: center;font-size: 18px;">
                                    <a v-if="value.tinh_trang == 0"
                                        class="badge rounded-pill text-danger bg-light-danger p-2 text-uppercase px-3"><i
                                            class='bx bxs-circle me-1'></i> ĐANG TẠM DỪNG</a>
                                    <a v-else
                                        class="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3"><i
                                            class='bx bxs-circle me-1'></i> ĐANG HOẠT ĐỘNG</a>
                                </td>
                                <td>
                                    <div class="d-flex order-actions justify-content-center">
                                        <a href="javascript:;" class="ms-3" data-bs-toggle="modal"
                                            data-bs-target="#ModalSuaDiaDiem" @click="moModalSua(value)"><i
                                                class='bx bxs-edit'></i></a>
                                        <a href="javascript:;" class="ms-3" data-bs-toggle="modal"
                                            data-bs-target="#ModalXoaDiaDiem" @click="moModalSua(value)"><i
                                                class='bx bxs-trash'></i></a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- Nút chuyển trang -->
                <div class="dt--pagination d-flex justify-content-end mt-3">
                    <div class="dataTables_paginate paging_full_numbers">
                        <ul class="pagination">

                            <!-- Nút về đầu -->
                            <li class="paginate_button page-item" :class="{ disabled: currentPage === 1 }">
                                <a href="#" class="page-link" @click.prevent="currentPage = 1">
                                    <i class="fa-solid fa-angles-left"></i>
                                </a>
                            </li>

                            <!-- Nút trước -->
                            <li class="paginate_button page-item" :class="{ disabled: currentPage === 1 }">
                                <a href="#" class="page-link" @click.prevent="currentPage--">
                                    <i class="fa-solid fa-angle-left"></i>
                                </a>
                            </li>

                            <!-- Các trang -->
                            <li class="paginate_button page-item" v-for="page in totalPages" :key="page"
                                :class="{ active: page === currentPage }">
                                <a href="#" class="page-link" @click.prevent="currentPage = page">{{
                                    page }}</a>
                            </li>

                            <!-- Nút sau -->
                            <li class="paginate_button page-item" :class="{ disabled: currentPage === totalPages }">
                                <a href="#" class="page-link" @click.prevent="currentPage++">
                                    <i class="fa-solid fa-angle-right"></i>
                                </a>
                            </li>

                            <!-- Nút cuối -->
                            <li class="paginate_button page-item" :class="{ disabled: currentPage === totalPages }">
                                <a href="#" class="page-link" @click.prevent="currentPage = totalPages">
                                    <i class="fa-solid fa-angles-right"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Them dia diem -->
    <div class="modal fade" id="ModalThemDiaDiem" tabindex="-1" aria-labelledby="ModalThemDiaDiemLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" style="width: 60vw; max-width: none;">
            <div class="modal-content">
                <div class="modal-header" style="background-color: #D9D9D9;">
                    <h1 class="modal-title fs-5" id="ModalThemDiaDiemLabel">Thông tin địa điểm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="font-size: 16px;">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="p-4 rounded">
                                <div class="mb-3">
                                    <label for="add_id_dia_diem" class="form-label">ID địa điểm</label>
                                    <input type="text" class="form-control" id="add_id_dia_diem"
                                        v-model="luu_tam.id_dia_diem" placeholder="Nhập ID địa điểm">
                                </div>
                                <div class="mb-3">
                                    <label for="add_ten_dia_diem" class="form-label">Tên địa điểm</label>
                                    <input type="text" class="form-control" id="add_ten_dia_diem"
                                        v-model="luu_tam.ten_dia_diem" placeholder="Nhập tên địa điểm">
                                </div>
                                <div class="mb-3">
                                    <label for="add_toa_do" class="form-label">Tọa độ</label>
                                    <input type="text" class="form-control" id="add_toa_do" v-model="luu_tam.toa_do"
                                        placeholder="Nhập hoặc chọn tọa độ">
                                </div>
                                <div class="mb-3">
                                    <label for="add_hinh_anh" class="form-label">Hình ảnh</label>
                                    <input type="text" class="form-control" id="add_hinh_anh" v-model="luu_tam.hinh_anh"
                                        placeholder="Nhập link hình ảnh" @input="previewImage">
                                    <div v-if="imagePreview" class="mt-2">
                                        <img :src="imagePreview" alt="Xem trước hình ảnh"
                                            style="max-width: 100%; height: auto; border-radius: 5px;">
                                    </div>

                                    <div v-else-if="luu_tam.hinh_anh" class="mt-2">
                                        <img :src="luu_tam.hinh_anh" alt="Hình ảnh hiện tại"
                                            style="max-width: 100%; height: auto; border-radius: 5px;">
                                    </div>
                                    <div v-else class="mt-2">
                                        <span class="text-muted">Chưa có link hình ảnh.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="p-4 rounded">
                                <div class="mb-3">
                                    <label for="add_danh_muc" class="form-label">Danh mục</label>
                                    <input type="text" class="form-control" id="add_danh_muc" v-model="luu_tam.danh_muc"
                                        placeholder="Nhập danh mục">
                                </div>
                                <div class="mb-3">
                                    <label for="add_tinh_trang" class="form-label">Tình trạng</label>
                                    <select class="form-select" id="add_tinh_trang" v-model="luu_tam.tinh_trang">
                                        <option value="1">Đang hoạt động</option>
                                        <option value="0">Tạm nghỉ</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="add_dia_chi" class="form-label">Địa chỉ</label>
                                    <input type="text" class="form-control" id="add_dia_chi" v-model="luu_tam.dia_chi"
                                        placeholder="Nhập địa chỉ">
                                </div>
                                <div class="mb-3">
                                    <label for="add_mo_ta" class="form-label">Mô tả</label>
                                    <textarea class="form-control" id="add_mo_ta" rows="7" v-model="luu_tam.mo_ta"
                                        placeholder="Nhập mô tả địa điểm"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="background-color: #D9D9D9;">
                    <button type="button" class="btn btn-danger text-white" data-bs-dismiss="modal">Huỷ</button>
                    <button type="button" class="btn btn-primary text-white" @click="them_dia_diem()">Thêm</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal chính sửa -->
    <div class="modal fade" id="ModalSuaDiaDiem" tabindex="-1" aria-labelledby="ModalSuaDiaDiemLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" style="width: 60vw; max-width: none;">
            <div class="modal-content">
                <div class="modal-header" style="background-color: #D9D9D9;">
                    <h1 class="modal-title fs-5" id="ModalSuaDiaDiemLabel">Sửa thông tin địa điểm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="font-size: 16px;">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="p-4 rounded">
                                <div class="mb-3">
                                    <label for="edit_id_dia_diem" class="form-label">ID địa điểm</label>
                                    <input type="text" class="form-control" id="edit_id_dia_diem"
                                        v-model="dia_diem.id_dia_diem" placeholder="Nhập ID địa điểm">
                                </div>
                                <div class="mb-3">
                                    <label for="edit_ten_dia_diem" class="form-label">Tên địa điểm</label>
                                    <input type="text" class="form-control" id="edit_ten_dia_diem"
                                        v-model="dia_diem.ten_dia_diem" placeholder="Nhập tên địa điểm">
                                </div>
                                <div class="mb-3">
                                    <label for="edit_toa_do" class="form-label">Tọa độ</label>
                                    <input type="text" class="form-control" id="edit_toa_do" v-model="dia_diem.toa_do"
                                        placeholder="Nhập hoặc chọn tọa độ">
                                </div>
                                <div class="mb-3">
                                    <label for="edit_hinh_anh" class="form-label">Hình ảnh</label>
                                    <input type="text" class="form-control" id="edit_hinh_anh"
                                        v-model="dia_diem.hinh_anh" placeholder="Nhập link hình ảnh"
                                        @input="previewImage">
                                    <div v-if="imagePreview" class="mt-2">
                                        <img :src="imagePreview" alt="Xem trước hình ảnh"
                                            style="max-width: 100%; height: auto; border-radius: 5px;">
                                    </div>

                                    <div v-else-if="dia_diem.hinh_anh" class="mt-2">
                                        <img :src="dia_diem.hinh_anh" alt="Hình ảnh hiện tại"
                                            style="max-width: 100%; height: auto; border-radius: 5px;">
                                    </div>
                                    <div v-else class="mt-2">
                                        <span class="text-muted">Chưa có link hình ảnh.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="p-4 rounded">
                                <div class="mb-3">
                                    <label for="edit_danh_muc" class="form-label">Danh mục</label>
                                    <input type="text" class="form-control" id="edit_danh_muc"
                                        v-model="dia_diem.danh_muc" placeholder="Nhập danh mục">
                                </div>
                                <div class="mb-3">
                                    <label for="edit_tinh_trang" class="form-label">Tình trạng</label>
                                    <select class="form-select" id="edit_tinh_trang" v-model="dia_diem.tinh_trang">
                                        <option value="1">Đang hoạt động</option>
                                        <option value="0">Tạm nghỉ</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="edit_dia_chi" class="form-label">Địa chỉ</label>
                                    <input type="text" class="form-control" id="edit_dia_chi" v-model="dia_diem.dia_chi"
                                        placeholder="Nhập địa chỉ">
                                </div>
                                <div class="mb-3">
                                    <label for="edit_mo_ta" class="form-label">Mô tả</label>
                                    <textarea class="form-control" id="edit_mo_ta" rows="7" v-model="dia_diem.mo_ta"
                                        placeholder="Nhập mô tả địa điểm"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="background-color: #D9D9D9;">
                    <button type="button" class="btn btn-danger text-white" data-bs-dismiss="modal">Huỷ</button>
                    <button type="button" class="btn btn-primary text-white" @click="capNhatDiaDiem">Lưu thay
                        đổi</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal xoá địa điểm -->
    <div class="modal fade" id="ModalXoaDiaDiem" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="content p-5 px-3 text-center">
                        <span class="fa-stack fa-2x mb-3">
                            <i class="fa-solid fa-2xl fa-circle" style="color: #ffc8c2;"></i>
                            <i class="fa-solid fa-trash-can text-danger fa-stack-1x"></i>
                        </span>
                        <h3 class="fs-20 text-gray-9 fw-bold mb-2 mt-1">Xoá địa điểm</h3>
                        <p class="text-gray-6 mb-0 fs-16">Bạn có chắc chắn muốn xoá địa điểm này không?</p>
                        <h5 class="mt-3">{{ dia_diem.id_dia_diem }} - {{ dia_diem.ten_dia_diem }}</h5>
                        <div class="modal-footer-btn mt-3 d-flex justify-content-center mt-5">
                            <button type="button" class="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
                                data-bs-dismiss="modal" style="background-color: #FF2C2C;width: 30%;">Huỷ</button>
                            <button type="submit" class="btn btn-primary fs-13 fw-medium p-2 px-3"
                                style="background-color: #FE9F43;width: 30%;" @click="xoaDiaDiem">Đồng ý xoá</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            imagePreview: null, // Dùng để xem trước hình ảnh
            currentPage: 1, // Trang bắt đầu với page 1
            itemsPerPage: 8, // Giới hạn 6 dòng thông tin trên table
            dia_diem_tam_thoi: null, // Dùng để lưu trữ thông tin địa điểm khi mở modal sửa/xóa
            list_dia_diem: [
                {
                    id_dia_diem: "dd001",
                    ten_dia_diem: "Cầu Rồng",
                    hinh_anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0GncpJuy0m-CJoCDWTIp9FvFJ03fgKDWIw&s",
                    mo_ta: "Cây cầu nổi tiếng với hình dáng con rồng và phun lửa vào cuối tuần.",
                    tinh_trang: 1,
                    dia_chi: "Đường Trần Hưng Đạo, Đà Nẵng",
                    toa_do: "16.0618,108.2280",
                    danh_muc: "Vui chơi"
                },
                {
                    id_dia_diem: "dd002",
                    ten_dia_diem: "Bãi biển Mỹ Khê",
                    hinh_anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0GncpJuy0m-CJoCDWTIp9FvFJ03fgKDWIw&s",
                    mo_ta: "Một trong những bãi biển đẹp nhất hành tinh theo tạp chí Forbes.",
                    tinh_trang: 1,
                    dia_chi: "Võ Nguyên Giáp, Đà Nẵng",
                    toa_do: "16.0595,108.2486",
                    danh_muc: "Nghỉ ngơi"
                },
                {
                    id_dia_diem: "dd003",
                    ten_dia_diem: "Asia Park",
                    hinh_anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0GncpJuy0m-CJoCDWTIp9FvFJ03fgKDWIw&s",
                    mo_ta: "Công viên giải trí với nhiều trò chơi và vòng quay Sun Wheel.",
                    tinh_trang: 1,
                    dia_chi: "1 Phan Đăng Lưu, Đà Nẵng",
                    toa_do: "16.0479,108.2192",
                    danh_muc: "Vui chơi"
                },
                {
                    id_dia_diem: "dd004",
                    ten_dia_diem: "Bún chả cá Bà Lữ",
                    hinh_anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0GncpJuy0m-CJoCDWTIp9FvFJ03fgKDWIw&s",
                    mo_ta: "Quán ăn nổi tiếng với món bún chả cá đặc sản Đà Nẵng.",
                    tinh_trang: 1,
                    dia_chi: "319 Hùng Vương, Đà Nẵng",
                    toa_do: "16.0710,108.2147",
                    danh_muc: "Ăn uống"
                },
                {
                    id_dia_diem: "dd005",
                    ten_dia_diem: "The Memory – Danang",
                    hinh_anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0GncpJuy0m-CJoCDWTIp9FvFJ03fgKDWIw&s",
                    mo_ta: "Homestay được thiết kế độc đáo gần biển Mỹ Khê.",
                    tinh_trang: 1,
                    dia_chi: "202 Hồ Nghinh, Đà Nẵng",
                    toa_do: "16.0612,108.2413",
                    danh_muc: "Nghỉ ngơi"
                },
                {
                    id_dia_diem: "dd006",
                    ten_dia_diem: "Suối Hoa",
                    hinh_anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0GncpJuy0m-CJoCDWTIp9FvFJ03fgKDWIw&s",
                    mo_ta: "Khu du lịch sinh thái với suối tự nhiên và cảnh quan xanh mát.",
                    tinh_trang: 1,
                    dia_chi: "Hòa Phú, Hòa Vang, Đà Nẵng",
                    toa_do: "15.9795,107.9634",
                    danh_muc: "Nghỉ ngơi"
                },
                {
                    id_dia_diem: "dd007",
                    ten_dia_diem: "Chợ Cồn",
                    hinh_anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0GncpJuy0m-CJoCDWTIp9FvFJ03fgKDWIw&s",
                    mo_ta: "Chợ truyền thống nổi tiếng với nhiều món ăn đặc sản và quà lưu niệm.",
                    tinh_trang: 1,
                    dia_chi: "290 Hùng Vương, Đà Nẵng",
                    toa_do: "16.0694,108.2155",
                    danh_muc: "Ăn uống"
                },
                {
                    id_dia_diem: "dd008",
                    ten_dia_diem: "Golden Bay Hotel",
                    hinh_anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0GncpJuy0m-CJoCDWTIp9FvFJ03fgKDWIw&s",
                    mo_ta: "Khách sạn 5 sao với hồ bơi dát vàng và view toàn cảnh thành phố.",
                    tinh_trang: 0,
                    dia_chi: "Lê Văn Duyệt, Đà Nẵng",
                    toa_do: "16.0890,108.2238",
                    danh_muc: "Nghỉ ngơi"
                },
                {
                    id_dia_diem: "dd009",
                    ten_dia_diem: "Helio Center",
                    hinh_anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0GncpJuy0m-CJoCDWTIp9FvFJ03fgKDWIw&s",
                    mo_ta: "Trung tâm giải trí với khu vui chơi, ẩm thực và chợ đêm.",
                    tinh_trang: 1,
                    dia_chi: "2/9, Hải Châu, Đà Nẵng",
                    toa_do: "16.0396,108.2211",
                    danh_muc: "Vui chơi"
                },
                {
                    id_dia_diem: "dd010",
                    ten_dia_diem: "Thác Hòa Phú Thành",
                    hinh_anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0GncpJuy0m-CJoCDWTIp9FvFJ03fgKDWIw&s",
                    mo_ta: "Trượt thác và các hoạt động mạo hiểm hấp dẫn.",
                    tinh_trang: 0,
                    dia_chi: "Hòa Ninh, Hòa Vang, Đà Nẵng",
                    toa_do: "15.9860,107.9420",
                    danh_muc: "Vui chơi"
                }
            ],  
            luu_tam: {},
            dia_diem: {
                id_dia_diem: "",
                ten_dia_diem: "",
                hinh_anh: "",
                mo_ta: "",
                tinh_trang: 1,
                dia_chi: "",
                toa_do: "",
                danh_muc: "",
            },
        }
    },
    computed: {
        // Tính tổng số trang
        totalPages() {
            return Math.ceil(this.list_dia_diem.length / this.itemsPerPage);
        },

        // paginatedData để điều chỉnh thông tin sao cho khi chuyển page thì thông tin theo mới
        paginatedData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.list_dia_diem.slice(start, end);
        },

        tongSoDiaDiem() {
            return this.list_dia_diem.length;
        },

        soDiaDiemHoatDong() {
            return this.list_dia_diem.filter(diaDiem => diaDiem.tinh_trang === 1).length;
        },

        soDiaDiemTamDung() {
            return this.list_dia_diem.filter(diaDiem => diaDiem.tinh_trang === 0).length;
        }
    },
    methods: {
        // Chuyển trang
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        // Xem trước hình ảnh khi nhập link
        previewImage() {
            this.imagePreview = this.dia_diem.hinh_anh;
        },
        resetDiaDiem() {
            this.dia_diem = {
                id_dia_diem: "",
                ten_dia_diem: "",
                hinh_anh: "",
                mo_ta: "",
                tinh_trang: 1,
                dia_chi: "",
                toa_do: "",
                danh_muc: "",
            };
            this.imagePreview = ""; // nếu có dùng preview hình
        },
        them_dia_diem() {
            this.list_dia_diem.push(this.luu_tam);
            this.dia_diem = {};
        },
        xoaDiaDiem() {
            const id = this.dia_diem.id_dia_diem;

            // Xóa phần tử trong danh sách (ví dụ mảng là this.ds_dia_diem)
            this.list_dia_diem = this.list_dia_diem.filter(item => item.id_dia_diem !== id);

            // Đóng modal
            const modal = bootstrap.Modal.getInstance(document.getElementById("ModalXoaDiaDiem"));
            modal.hide();

            // Reset lại data nếu cần
            this.dia_diem = {
                id_dia_diem: "",
                ten_dia_diem: "",
                hinh_anh: "",
                mo_ta: "",
                tinh_trang: 1,
                dia_chi: "",
                toa_do: "",
                danh_muc: "",
            };
            this.imagePreview = ""; // nếu có dùng preview hình
        },
        moModalSua(value) {
            this.dia_diem = { ...value };
            this.imagePreview = value.hinh_anh; // nếu có xem trước ảnh
        },
        capNhatDiaDiem() {
            // Tìm vị trí phần tử cần cập nhật
            const index = this.list_dia_diem.findIndex(item => item.id_dia_diem === this.dia_diem.id_dia_diem);
            if (index !== -1) {
                // Gán lại object tại vị trí đó
                this.list_dia_diem[index] = { ...this.dia_diem };
            }

            // Optionally đóng modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('ModalSuaDiaDiem'));
            modal.hide();
        }

    }
}
</script>
<style></style>