<template>
    <div class="container mt-5 mb-5">
        <div class="header">
            <h1>Thông tin địa điểm</h1>
            <div class="flex items-center">
                <label for="search" class="text-teal-500 mr-2" style="font-size: 25px;">Search:</label>
                <input class="search" type="text" id="search" v-model="searchTerm" placeholder="Tìm kiếm tên...">
            </div>
        </div>
        <div class="card">
            <div class="them text-end">
                <button type="button" class="btn" data-bs-toggle="modal"
                    data-bs-target="#ModalThemdiadiem">Thêm</button>
            </div>
            <div class="card-content">
                <table class="table table-bordered">
                    <thead>
                        <tr class="text-center">
                            <td>STT</td>
                            <td>Tên địa điểm</td>
                            <td>Hình ảnh</td>
                            <td>Mô tả</td>
                            <td>Tình trạng</td>
                            <td>Danh mục</td>
                            <td>Thao tác</td>
                        </tr>
                    </thead>
                    <tbody v-for="(value, index) in paginatedData" :key="index">
                        <tr class="text-center">
                            <td class="table-stt">{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
                            <td class="table-ten-dia-diem">{{ value.ten_dia_diem }}</td>
                            <td class="table-hinh-anh"><img v-bind:src="value.hinh_anh"></td>
                            <td class="table-mo-ta">{{ value.mo_ta }}</td>
                            <td class="table-tinh-trang">{{ value.tinh_trang }}</td>
                            <td class="table-danh-muc">
                                <button v-if="value.danh_muc == 1" type="button" class="btn"
                                    style="background-color: #58CB51; color: white;">Ăn uống</button>
                                <button v-if="value.danh_muc == 2" type="button" class="btn"
                                    style="background-color: #F9CA24; color: white;">Giải trí</button>
                                <button v-if="value.danh_muc == 3" type="button" class="btn"
                                    style="background-color: #58D0C1; color: white;">Thư giãn</button>
                                <button v-if="value.danh_muc == 4" type="button" class="btn"
                                    style="background-color: #58D0C1; color: white;">Thư viện </button>
                            </td>
                            <td class="table-thao-tac">
                                <button type="button" class="btn btn-warning me-2" data-bs-toggle="modal"
                                    data-bs-target="#ModalChinhsua">Chỉnh sửa</button>
                                <button type="button" class="btn btn-danger"
                                    v-on:click="xoa_dia_diem(index)">Xoá</button>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div> <!-- Nút chuyển trang của bảng -->
            <div class="pagination">
                <button class="btn btn-outline-secondary btn-prev text-dark" :disabled="currentPage === 1"
                    @click="changePage(currentPage - 1)"><i class="fa-solid fa-arrow-left"></i></button>
                <span>{{ currentPage }} / {{ totalPages }}</span>
                <button class="btn btn-outline-secondary btn-next text-dark" :disabled="currentPage === totalPages"
                    @click="changePage(currentPage + 1)"><i class="fa-solid fa-arrow-right"></i></button>
            </div>
        </div>

    </div>
    <!-- Modal Them dia diem -->
    <div class="modal-them modal fade" id="ModalThemdiadiem" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <!-- Đã thêm modal-dialog-centered để nó xuất hiện chính giữa màn hình -->
            <div class="modal-content">
                <div class="modal-header" style="background-color: #D9D9D9;">
                    <h1 class="modal-title fs-5 " id="ModalThemdiadiem">Thông tin địa điểm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="label">ID địa điểm</label>
                        <input type="text" v-model="dia_diem.id_dia_diem" class="input-field">
                    </div>
                    <div class="diem mb-3">
                        <label class="label">Tên địa điểm</label>
                        <input type="text" v-model="dia_diem.ten_dia_diem" class="input-field">
                    </div>
                    <div class="mb-3">
                        <label class="label">Hình ảnh</label>
                        <input type="type" v-model="dia_diem.hinh_anh" class="input-field" placeholder="Upload thư mục">
                    </div>
                    <div class="mb-3">
                        <label class="label">Tình trạng</label>
                        <input type="text" v-model="dia_diem.tinh_trang" class="input-field" placeholder="Tình trạng">
                    </div>
                    <div class="mb-3">
                        <label class="label">Danh Mục</label>
                        <select class="input-field" v-model="dia_diem.danh_muc">
                            <option :value="1">Giải trí</option>
                            <option :value="2">Ăn uống</option>
                            <option :value="3">Thư giãn</option>
                            <option :value="4">Nơi ở</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="label">Mô tả</label>
                        <textarea class="input-field" v-model="dia_diem.mo_ta"></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="label">Địa chỉ</label>
                        <input type="text" class="input-field" v-model="dia_diem.dia_chi">
                    </div>
                    <div class="mb-3">
                        <label class="label">Tọa độ</label>
                        <input type="text" class="input-field" v-model="dia_diem.toa_do">
                    </div>
                </div>
                <div class="modal-footer" style="background-color: #D9D9D9;">
                    <button type="button" class="btn btn-danger text-white" data-bs-dismiss="modal">Huỷ</button>
                    <button type="button" class="btn btn-info text-white" v-on:click="add_dia_diem()">Tạo</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal chính sửa -->
    <div class="modal-chinh-sua modal fade" id="ModalChinhsua" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" style="width: 45vw; max-width: none;">
            <div class="modal-content">
                <div class="modal-header" style="background-color: #D9D9D9;">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thông tin địa điểm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row col-lg-12">
                        <div class="col-trai col-lg-6">
                            <div class="mb-3">
                                <label class="label">ID địa điểm</label>
                                <input type="text" class="input-field">
                            </div>
                            <div class="mb-3">
                                <label class="label">Tên địa điểm</label>
                                <input type="text" class="input-field">
                            </div>
                            <div class="mb-3">
                                <label class="label">Hình ảnh</label>
                                <input type="type" class="input-field" placeholder="Upload thư mục">
                            </div>
                            <div class="mb-3">
                                <label class="label">Tình trạng</label>
                                <input type="text" class="input-field" placeholder="Tình trạng">
                            </div>
                            <div class="mb-3">
                                <label class="label">Danh Mục</label>
                                <select class="input-field">
                                    <option>Giải trí</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-phai col-lg-6">
                            <div class="mb-3">
                                <label class="label">Mô tả</label>
                                <textarea class="input-field"></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="label">Địa chỉ</label>
                                <input type="text" class="input-field">
                            </div>
                            <div class="mb-3">
                                <label class="label">Toạ độ</label>
                                <input type="text" class="input-field">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="background-color: #D9D9D9;">
                    <button type="button" class="btn btn-danger text-white" data-bs-dismiss="modal">Huỷ</button>
                    <button type="button" class="btn btn-info text-white" style="background-color: #58D0C1;"
                        v-on:click="cap_nhat_dia_diem()">Lưu</button>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    data() {
        return {
            currentPage: 1, // Trang bắt đầu với page 1
            itemsPerPage: 6, // Giới hạn 6 dòng thông tin trên table


            isEditMode: false,
            index_dang_chinh_sua: null,

            list_dia_diem: [
                {
                    id_dia_diem: "dd001",
                    ten_dia_diem: "Cầu Rồng",
                    hinh_anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0GncpJuy0m-CJoCDWTIp9FvFJ03fgKDWIw&s",
                    mo_ta: "Cây cầu nổi tiếng với hình dáng con rồng và phun lửa vào cuối tuần.",
                    tinh_trang: "hoạt động",
                    dia_chi: "Đường Trần Hưng Đạo, Đà Nẵng",
                    toa_do: "16.0618,108.2280",
                    danh_muc: 1
                },
                {
                    id_dia_diem: "dd002",
                    ten_dia_diem: "Bãi biển Mỹ Khê",
                    hinh_anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0GncpJuy0m-CJoCDWTIp9FvFJ03fgKDWIw&s",
                    mo_ta: "Một trong những bãi biển đẹp nhất hành tinh theo tạp chí Forbes.",
                    tinh_trang: "hoạt động",
                    dia_chi: "Võ Nguyên Giáp, Đà Nẵng",
                    toa_do: "16.0595,108.2486",
                    danh_muc: 3
                },
                {
                    id_dia_diem: "dd003",
                    ten_dia_diem: "Asia Park",
                    hinh_anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0GncpJuy0m-CJoCDWTIp9FvFJ03fgKDWIw&s",
                    mo_ta: "Công viên giải trí với nhiều trò chơi và vòng quay Sun Wheel.",
                    tinh_trang: "hoạt động",
                    dia_chi: "1 Phan Đăng Lưu, Đà Nẵng",
                    toa_do: "16.0479,108.2192",
                    danh_muc: 1
                },
                {
                    id_dia_diem: "dd004",
                    ten_dia_diem: "Bún chả cá Bà Lữ",
                    hinh_anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0GncpJuy0m-CJoCDWTIp9FvFJ03fgKDWIw&s",
                    mo_ta: "Quán ăn nổi tiếng với món bún chả cá đặc sản Đà Nẵng.",
                    tinh_trang: "hoạt động",
                    dia_chi: "319 Hùng Vương, Đà Nẵng",
                    toa_do: "16.0710,108.2147",
                    danh_muc: 2
                },
                {
                    id_dia_diem: "dd005",
                    ten_dia_diem: "The Memory – Danang",
                    hinh_anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0GncpJuy0m-CJoCDWTIp9FvFJ03fgKDWIw&s",
                    mo_ta: "Homestay được thiết kế độc đáo gần biển Mỹ Khê.",
                    tinh_trang: "hoạt động",
                    dia_chi: "202 Hồ Nghinh, Đà Nẵng",
                    toa_do: "16.0612,108.2413",
                    danh_muc: 4
                },
                {
                    id_dia_diem: "dd006",
                    ten_dia_diem: "Suối Hoa",
                    hinh_anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0GncpJuy0m-CJoCDWTIp9FvFJ03fgKDWIw&s",
                    mo_ta: "Khu du lịch sinh thái với suối tự nhiên và cảnh quan xanh mát.",
                    tinh_trang: "hoạt động",
                    dia_chi: "Hòa Phú, Hòa Vang, Đà Nẵng",
                    toa_do: "15.9795,107.9634",
                    danh_muc: 3
                },
                {
                    id_dia_diem: "dd007",
                    ten_dia_diem: "Chợ Cồn",
                    hinh_anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0GncpJuy0m-CJoCDWTIp9FvFJ03fgKDWIw&s",
                    mo_ta: "Chợ truyền thống nổi tiếng với nhiều món ăn đặc sản và quà lưu niệm.",
                    tinh_trang: "hoạt động",
                    dia_chi: "290 Hùng Vương, Đà Nẵng",
                    toa_do: "16.0694,108.2155",
                    danh_muc: 2
                },
                {
                    id_dia_diem: "dd008",
                    ten_dia_diem: "Golden Bay Hotel",
                    hinh_anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0GncpJuy0m-CJoCDWTIp9FvFJ03fgKDWIw&s",
                    mo_ta: "Khách sạn 5 sao với hồ bơi dát vàng và view toàn cảnh thành phố.",
                    tinh_trang: "hoạt động",
                    dia_chi: "Lê Văn Duyệt, Đà Nẵng",
                    toa_do: "16.0890,108.2238",
                    danh_muc: 4
                },
                {
                    id_dia_diem: "dd009",
                    ten_dia_diem: "Helio Center",
                    hinh_anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0GncpJuy0m-CJoCDWTIp9FvFJ03fgKDWIw&s",
                    mo_ta: "Trung tâm giải trí với khu vui chơi, ẩm thực và chợ đêm.",
                    tinh_trang: "hoạt động",
                    dia_chi: "2/9, Hải Châu, Đà Nẵng",
                    toa_do: "16.0396,108.2211",
                    danh_muc: 1
                },
                {
                    id_dia_diem: "dd010",
                    ten_dia_diem: "Thác Hòa Phú Thành",
                    hinh_anh: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0GncpJuy0m-CJoCDWTIp9FvFJ03fgKDWIw&s",
                    mo_ta: "Trượt thác và các hoạt động mạo hiểm hấp dẫn.",
                    tinh_trang: "hoạt động",
                    dia_chi: "Hòa Ninh, Hòa Vang, Đà Nẵng",
                    toa_do: "15.9860,107.9420",
                    danh_muc: 3
                }
            ],

            dia_diem: {
                id_dia_diem: "",
                ten_dia_diem: "",
                hinh_anh: "",
                mo_ta: "",
                tinh_trang: "",
                dia_chi: "",
                toa_do: "",
                danh_muc: 1
            },
            dia_diem_can_xoa: null,
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
        }
    },
    methods: {
        // Chuyển trang
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        add_dia_diem() {
            this.list_dia_diem.push({ ...this.dia_diem });
            this.dia_diem = {
                id_dia_diem: "",
                ten_dia_diem: "",
                hinh_anh: "",
                mo_ta: "",
                tinh_trang: "",
                dia_chi: "",
                toa_do: "",
                danh_muc: 1
            };
            // TỰ động đóng modal sau khi thêm
            const modal = bootstrap.Modal.getInstance(document.getElementById("ModalThemdiadiem"));
            if (modal) modal.hide();
        },
        cap_nhat_dia_diem() {
            if (this.index_dang_chinh_sua !== null) {
                this.list_dia_diem[this.index_dang_chinh_sua] = { ...this.dia_diem };
                this.dia_diem = {
                    id_dia_diem: "",
                    ten_dia_diem: "",
                    hinh_anh: "",
                    mo_ta: "",
                    tinh_trang: "",
                    dia_chi: "",
                    toa_do: "",
                    danh_muc: 1
                };
                this.index_dang_chinh_sua = null;
                this.isEditMode = false;
                // TỰ động đóng modal sau khi cập nhập
                const modal = bootstrap.Modal.getInstance(document.getElementById("ModalChinhsua"));
                if (modal) modal.hide();
            }
        },
        xoa_dia_diem(index) {
            const vitri = (this.currentPage - 1) * this.itemsPerPage + index;
            this.list_dia_diem.splice(vitri, 1);
        }
    }
}
</script>
<style>
/* Header chứa tiêu đề và ô tìm kiếm */
.header {
    display: flex;
    /* Sắp xếp các phần tử theo chiều ngang */
    align-items: center;
    /* Căn giữa theo chiều dọc */
    justify-content: space-between;
    /* Canh trái phải cách đều */
    margin-bottom: 16px;
    /* Tạo khoảng cách phía dưới */
}

/* Tiêu đề trong header */
.header h1 {
    font-size: 40px;
    /* Kích thước chữ */
    font-weight: 300;
    /* Độ đậm của chữ */
    color: #58D0C1;
    /* Màu xanh teal */
}

/* Nhãn cho ô tìm kiếm */
.header label {
    color: #58D0C1;
    /* Màu chữ xanh teal */
    margin-right: 8px;
    /* Khoảng cách với ô input */
    font-size: 35px;
    /* Kích thước chữ */
}

/* Ô tìm kiếm */
.header .flex .search {
    background-color: white;
    /* Nền trắng */
    border: 2px solid #58D0C1;
    /* Viền màu xanh teal */
    padding: 10px;
    /* Khoảng cách nội dung bên trong */
    font-size: 18px;
    /* Kích thước chữ */
    border-radius: 6px;
    /* Bo góc */
    width: 250px;
    /* Độ rộng của ô input */
}

.card {
    background-color: #F8F8F8;
    padding: 20px 20px 20px 20px;
    height: 800px;
    margin-bottom: 10px;
}

.card .card-content {
    /* flex: 1; */
    height: 100%;
}

/* Nút thêm */
.card .them .btn {
    width: 150px;
    color: white;
    background-color: #FFDF6F;
    border-radius: 15px;
    margin: 10px 10px 30px;
}

/* Bảng thông tin */
.card .table {
    background-color: white;
    text-align: center;
    vertical-align: middle;

}

.card .table .btn {
    width: 110px;
    border-radius: 15px;
}

.card .table img {
    max-width: 150px;
    max-height: 90px;
    border-radius: 10px;
}

/* Cố định khung của table trong card */
.card .table tbody .table-stt {
    width: 40px;
}

.card .table tbody .table-ten-dia-diem {
    width: 200px;
}

.card .table tbody .table-hinh-anh {
    width: 160px;
}

.card .table tbody .table-mo-ta {
    width: auto;
}

.card .table tbody .table-tinh-trang {
    width: 100px;
}

.card .table tbody .table-danh-muc {
    width: 100px;
}

.card .table tbody .table-thao-tac {
    width: 250px;
}

/* Pagination style */
.pagination {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

/*
.pagination button {
    border: 1px solid #14b8a6;
    padding: 5px;
    margin: 2px;
    background-color: transparent;
    color: #14b8a6;
    border-radius: 6px;
    cursor: pointer;
} */



/* Nút chuyển trang */
.pagination {
    justify-content: flex-end;
}

.pagination button {
    border: 1px solid #14b8a6;
    /* Màu viền của nút */
    padding: 1px 1px 1px 5px;
    background-color: transparent;
    color: #14b8a6;
    /* Màu chữ cho nút */
    border-radius: 6px;
    cursor: pointer;
}


/* Modal Thêm địa điểm */
.modal-them .modal-body {
    margin: 20px;
}

.modal-them .modal-body .label {
    width: 40%;
    font-size: 17px;
    vertical-align: top;
}

.modal-them .modal-body input,
textarea,
select {
    width: 60%;
    height: 35px;
    border-radius: 12px;
    border: 1px solid #000000;
    font-size: 17px;
    /* trên, phải, dưới, trái  */
    padding: 5px 10px 5px 10px;
}

.modal-them .modal-body textarea {
    height: 100px;
    width: 60%;
    /* trên, phải, dưới, trái  */
    padding: 5px 10px 5px 10px;
}

.modal-them .modal-body select {
    font-size: 15px;
    width: 60%;
}

.modal-them .modal-footer .btn {
    width: 100px;
    border-radius: 12px;
}

/* Modal Chỉnh sửa địa điểm */
.modal-chinh-sua .modal-body {
    margin: 20px 10px 20px 10px;
}

.modal-chinh-sua .modal-body label {
    width: 120px;
    font-size: 17px;
    vertical-align: top;
}

.modal-chinh-sua .modal-body input,
textarea,
select {
    width: 65%;
    height: 35px;
    border-radius: 12px;
    border: 1px solid #000000;
    font-size: 17px;
    /* trên, phải, dưới, trái  */
    padding: 5px 10px 5px 10px;
}

.modal-chinh-sua .modal-body textarea {
    height: 130px;
    /* trên, phải, dưới, trái  */
    padding: 5px 10px 5px 10px;
}

.modal-chinh-sua .modal-body select {
    font-size: 15px;
}

.modal-chinh-sua .modal-footer .btn {
    width: 100px;
    border-radius: 12px;
}

.modal-chinh-sua .modal-body .col-phai label {
    width: 80px;
    margin-left: 30px;
}

.modal-chinh-sua .modal-body .col-phai input,
textarea {
    width: 70%;
}
</style>