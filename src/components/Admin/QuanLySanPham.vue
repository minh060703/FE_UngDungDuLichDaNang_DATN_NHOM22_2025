<template>
    <div class="container mt-5 mb-5">
        <div class="header">
            <h1>Danh sách sản phẩm</h1>
            <div class="flex items-center">
                <label for="search" class="text-teal-500 mr-2" style="font-size: 25px;">Search:</label>
                <input class="search" type="text" id="search" v-model="searchTerm" placeholder="Tìm kiếm tên...">
            </div>
        </div>
        <div class="row">
            <div class="col-lg-5">
                <div class="card">
                    <div class="mt-3">
                        <label>Mã sản phẩm:</label>
                        <input type="text" v-model="san_pham.ma_san_pham">
                    </div>
                    <div class="mt-3">
                        <label>Tên sản phẩm:</label>
                        <input type="text" v-model="san_pham.ten_san_pham">
                    </div>
                    <div class="mt-3">
                        <label>Giá:</label>
                        <input type="number" v-model="san_pham.gia">
                    </div>
                    <div class="mt-3">
                        <label>Điểm:</label>
                        <input type="number" v-model="san_pham.sao">
                    </div>
                    <div class="mt-3">
                        <label>Số lượng:</label>
                        <input type="number" v-model="san_pham.so_luong">
                    </div>
                    <div class="mt-3">
                        <label>Hình ảnh:</label>
                        <input type="text" v-model="san_pham.hinh_anh">
                    </div>
                    <div class="mt-3">
                        <label>Mô tả:</label>
                        <textarea v-model="san_pham.mo_ta"></textarea>
                    </div>
                    <div class="card-actions d-flex justify-content-around">
                        <button type="button" v-on:click="them_san_pham">Thêm</button>
                        <button type="button" v-on:click="sua_san_pham" v-if="danh_muc_can_xoa !== null">Sửa</button>
                        <button type="button" v-on:click="xoa_san_pham" v-if="danh_muc_can_xoa !== null">Xóa</button>
                    </div>
                </div>
            </div>
            <div class="col-lg-7">
                <div class="card">
                    <div class="row">
                        <div class="col-lg-6 mt-3" v-for="(value, index) in lists_san_pham" :key="index">
                            <div class="card" @click="chon_san_pham(index)">
                                <img v-bind:src="value.hinh_anh" class="img-fluid" alt="">
                                <div class="d-flex justify-content-between mt-3">
                                    <h3 class="h3">{{ value.ten_san_pham }}</h3>
                                    <span class="sao badge custom-badge">
                                        {{ value.sao }}
                                        <i class="fa-solid fa-star ms-2"></i>
                                    </span>
                                </div>
                                <span class="mota mt-3">{{ value.mo_ta }}</span>
                                <div class="d-flex justify-content-between mt-3">
                                    <span class="price badge custom-badge">{{ value.gia }}</span>
                                    <span class="soluong badge custom-badge ">SL :{{ value.so_luong }}
                                    </span>
                                </div>
                            </div>
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
            searchTerm: '', // Dữ liệu tìm kiếm 
            lists_san_pham: [
                {
                    hinh_anh: "https://pos.nvncdn.com/f4d87e-8901/ps/20241204_SMAM3J8dpt.jpeg",
                    ten_san_pham: "Áo khoác",
                    sao: 200,
                    mo_ta: "Áo khoác mùa đông chống gió, giữ ấm tốt.",
                    gia: "200.000",
                    so_luong: 10,
                    ma_san_pham: "SP001"  // Mã sản phẩm
                },
                {
                    hinh_anh: "https://img.bitas.com.vn/sanpham/ZGOM.20/NAU/lg1.png",
                    ten_san_pham: "Giày thể thao",
                    sao: 150,
                    mo_ta: "Giày thể thao nhẹ, thoáng khí, phù hợp tập luyện.",
                    gia: "350.000",
                    so_luong: 20,
                    ma_san_pham: "SP002"  // Mã sản phẩm
                },
                {
                    hinh_anh: "https://kakavietnam.com/wp-content/uploads/2018/03/kk-2070-1.jpg",
                    ten_san_pham: "Balo du lịch",
                    sao: 180,
                    mo_ta: "Balo chống nước, phù hợp cho du lịch và công việc.",
                    gia: "500.000",
                    so_luong: 15,
                    ma_san_pham: "SP003"  // Mã sản phẩm
                },
                {
                    hinh_anh: "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiaomi_2_1.png",
                    ten_san_pham: "Đồng hồ thông minh",
                    sao: 300,
                    mo_ta: "Đồng hồ thông minh với nhiều tính năng sức khỏe.",
                    gia: "1.200.000",
                    so_luong: 8,
                    ma_san_pham: "SP004"  // Mã sản phẩm
                },
            ],
            san_pham: {
                ma_san_pham: '',
                hinh_anh: '',
                ten_san_pham: '',
                sao: '',
                mo_ta: '',
                gia: '',
                so_luong: ''
            },
            danh_muc_can_xoa: null,
        };

    },
    computed: {
        lists_san_pham() {
            return this.lists_san_pham.filter(product => {
                const searchTerm = this.searchTerm.toLowerCase();

                // Hàm normalizeString để loại bỏ dấu
                const normalizeString = (str) => {
                    // Chuyển chuỗi thành dạng NFD (Normalization Form D), phân tách dấu và ký tự
                    // Sau đó loại bỏ tất cả các ký tự dấu phụ (diacritics) bằng cách sử dụng biểu thức chính quy
                    // Ví dụ: "á" sẽ thành "a", "đ" sẽ thành "d", "Đ" thành "D"
                    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                };

                // Kiểm tra nếu tên sản phẩm hoặc mã sản phẩm chứa từ khóa tìm kiếm (không phân biệt dấu và chữ hoa/thường)
                return (
                    normalizeString(product.ten_san_pham).includes(normalizeString(searchTerm)) || // Kiểm tra tên sản phẩm
                    normalizeString(product.ma_san_pham).includes(normalizeString(searchTerm)) // Kiểm tra mã sản phẩm
                );
            });
        }
    },
    methods: {
        chon_san_pham(index) {
            this.san_pham = { ...this.lists_san_pham[index] };  // Sao chép dữ liệu sản phẩm vào san_pham
            this.danh_muc_can_xoa = index;  // Lưu index của sản phẩm để xóa hoặc sửa
        },
        them_san_pham() {
            this.lists_san_pham.push(this.san_pham);
            this.san_pham = {
                ma_san_pham: '',
                hinh_anh: '',
                ten_san_pham: '',
                sao: '',
                mo_ta: '',
                gia: '',
                so_luong: ''
            };
        },
        sua_san_pham() {
            if (this.danh_muc_can_xoa !== null) {
                this.lists_san_pham[this.danh_muc_can_xoa] = { ...this.san_pham };
                this.san_pham = {
                    hinh_anh: '',
                    ten_san_pham: '',
                    sao: '',
                    mo_ta: '',
                    gia: '',
                    so_luong: ''
                };
                this.danh_muc_can_xoa = null;
            }
        },
        xoa_san_pham() {
            if (this.danh_muc_can_xoa !== null) {
                this.lists_san_pham.splice(this.danh_muc_can_xoa, 1);
                this.san_pham = {
                    hinh_anh: '',
                    ten_san_pham: '',
                    sao: '',
                    mo_ta: '',
                    gia: '',
                    so_luong: ''
                };
                this.danh_muc_can_xoa = null;
            }
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

/* Container chứa form nhập liệu */
.row .col-lg-5 .card {
    margin-top: 12px;
    /* Khoảng cách phía trên */
    border: 1px solid #99f6e4;
    /* Viền màu xanh nhạt */
    border-radius: 8px;
    /* Bo góc */
    padding: 16px 16px 16px 16px;
    /* Khoảng cách bên trong */
    background-color: white;
    /* Nền trắng */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    /* Đổ bóng nhẹ */
}

/* Nhóm chứa label và input */
.row .col-lg-5 .card {
    display: flex;
    /* Xếp theo chiều ngang */
    margin-bottom: 12px;
    /* Khoảng cách giữa các nhóm */
}

/* Nhãn trong form */
.row .col-lg-5 .card label {
    width: 40%;
    /* Độ rộng cố định cho nhãn */
    color: #374151;
    /* Màu xám đậm */
}

/* Ô nhập liệu và textarea */
.row .col-lg-5 .card input,
.row .col-lg-5 .card textarea {
    flex: 1;
    width: 60%;
    /* Độ rộng cố định cho nhãn */
    /* Giãn đầy phần còn lại */
    padding: 8px;
    /* Khoảng cách nội dung bên trong */
    background-color: #81DBD14C;
    /* Nền xanh nhạt */
    border-radius: 6px;
    /* Bo góc */
    border: none;
    /* Không có viền */
}

/* Nhóm chứa các nút bấm */
.row .col-lg-5 .card .card-actions {
    display: flex;
    /* Xếp theo chiều ngang */
    padding-top: 16px;
    /* Khoảng cách phía trên */
}

/* Nút bấm */
.row .col-lg-5 .card .card-actions button {
    padding: 8px 16px;
    /* Kích thước nút */
    background-color: #58D0C1;
    /* Màu nền xanh teal */
    color: white;
    /* Màu chữ trắng */
    border-radius: 10px;
    /* Bo góc */
    border: none;
    /* Không có viền */
    cursor: pointer;
    /* Hiển thị con trỏ khi di chuột */
    width: 20%;
    /* Độ rộng cố định cho nhãn */
}

.col-lg-7 .card {
    background-color: aliceblue;
    padding: 0px 10px 10px 10px;
}

.col-lg-7 .card .row .col-lg-6 .card {
    border: 2px solid #ffffff;
    /* Viền bo 2px màu đen */
    border-radius: 10px;
    /* Bo góc card */
    padding: 10px;
    /* Khoảng cách giữa nội dung và viền */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* Hiệu ứng bóng nhẹ */
    height: auto;
    display: flex;
    /* Tạo flex container */

}

.col-lg-7 .card .row .col-lg-6 .card .ten_san_pham,
.col-lg-7 .card .row .col-lg-6 .card .h3 {
    display: block;
    /* Chuyển thẻ label thành block element */
    width: auto;
    /* Chiều rộng cố định */
    height: 65px;
    /* Chiều cao cố định */
    overflow: hidden;
    /* Ẩn phần chữ bị tràn ra ngoài */
    text-overflow: ellipsis;
    /* Dùng ba dấu chấm nếu chữ quá dài */
    white-space: normal;
    /* Cho phép chữ xuống dòng */
    word-wrap: break-word;
    /* Đảm bảo chữ xuống dòng đúng nơi, không làm lệch layout */
    line-height: 1;
    /* Căn chỉnh khoảng cách giữa các dòng */
}

.col-lg-7 .card .row .col-lg-6 .card .img-fluid {
    width: 100%;
    /* Chiều rộng 100% để hình ảnh co giãn theo card */
    height: 300px;
    /* Chiều cao cố định */
    object-fit: cover;
    /* Cắt ảnh để vừa với kích thước mà không bị méo */
    border-radius: 10%;
    /* Bo góc nhẹ cho đẹp */
    display: block;
    /* Đảm bảo hình ảnh là một phần tử khối */
    margin-bottom: 16px;
    /* Đảm bảo khoảng cách giữa ảnh và nội dung dưới  */
    object-fit: contain;
    /* Giữ nguyên tỷ lệ của ảnh, không bị cắt hoặc méo */
    object-position: center;
    /* Đảm bảo ảnh được căn giữa trong khung */
}

.col-lg-7 .card .row .col-lg-6 .card .div .h3 {
    justify-content: center;
    /* Căn giữa theo chiều ngang */
    height: 500px;
    /* Chiều cao cố định */
    display: block;
    /* Một phần tử khối */
    align-items: center;
    /* Căn giữa theo chiều ngang */
}

.col-lg-7 .card .row .col-lg-6 .card .sao {
    border: 2px solid aquamarine;
    /* Viền màu xanh */
    background-color: white;
    /* Nền trắng */
    color: black;
    /* Chữ màu đen */
    padding: 5px 15px;
    /* Khoảng cách giữa viền và chữ */
    border-radius: 50px;
    /* Bo góc để tạo hình tròn */
    display: inline-flex;
    /* Dùng inline-flex để căn giữa nội dung */
    justify-content: center;
    /* Căn giữa theo chiều ngang */
    align-items: center;
    /* Căn giữa theo chiều dọc */
    text-align: center;
    /* Căn giữa chữ trong thẻ */
    font-size: 18px;
    /* Độ lớn của chữ */
    height: 45px;
    /* Chiều cao cố định */

}

.col-lg-7 .card .row .col-lg-6 .card .sao .fa-solid {
    color: rgb(218, 218, 73);
}

.col-lg-7 .card .row .col-lg-6 .card .price {
    background-color: rgb(189, 189, 11);
    /* Nền trắng */
    color: rgb(255, 255, 255);
    /* Chữ màu trắng */
    padding: 10px 15px;
    /* Khoảng cách giữa viền và nội dung */
    border-radius: 50px;
    /* Bo góc để tạo hình tròn */
    display: inline-flex;
    /* Dùng inline-flex để căn giữa nội dung */
    justify-content: center;
    /* Căn giữa theo chiều ngang */
    align-items: center;
    /* Căn giữa theo chiều dọc */
    text-align: center;
    /* Căn giữa chữ trong thẻ */
    font-size: larger;
    /* Độ lớn của chữ */

}

.col-lg-7 .card .row .col-lg-6 .card .soluong {
    border: 2px solid aquamarine;
    /* Viền màu xanh */
    background-color: white;
    /* Nền trắng */
    color: black;
    /* Chữ màu đen */
    padding: 5px 15px;
    /* Khoảng cách giữa viền và nội dung */
    border-radius: 10px;
    /* Bo góc để tạo hình tròn */
    display: inline-flex;
    /* Dùng inline-flex để căn giữa nội dung */
    justify-content: center;
    /* Căn giữa theo chiều ngang */
    align-items: center;
    /* Căn giữa theo chiều dọc */
    text-align: center;
    /* Căn giữa chữ trong thẻ */
    font-size: 18px;
}
</style>
