<template>
 <div >
        <div>
            <div class="col-lg-12">
                <div class="card text-light bg-light" >                
                    <div class="card-body text-light p-3">
                        <div class="row m-3">
                                                     
                            <div class="col-lg-12 text-success">
                                <div class="container">
                                    <div class="d-flex justify-content-between mb-5">
                                        <h4>Đơn Hàng Đang Giao</h4>
                                        <form class="d-flex align-items-center" role="search">
                                            <label for="searchBox" class="me-2">Search:</label>
                                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                                        </form>
                                    </div>
                                    <div>
                                        <table class="table table-bordered table-hover bg-light">
                                            <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Khách Hàng</th>
                                                    <th>Ngày Lập</th>
                                                    <th>Ghi Chú</th>
                                                    <th>Địa Chỉ</th>
                                                    <th>SDT</th>
                                                    <th>Trạng Thái</th>
                                                    <th>Phương Thức</th>
                                                    <th>Thao Tác</th>
                                                </tr>git branch -M main
                                            </thead>
                                            <tbody>
                                                <template v-for="(value,index) in list_bv" :key="index">
                                                    <tr class="align-middle text-center">
                                                        <td>{{index + 1}}</td>
                                                        <td>{{value.name}}</td>
                                                        <td>{{value.datelap}}</td>
                                                        <td>{{value.ghichu}}</td>
                                                        <td>{{value.diachi}}</td>
                                                        <td>{{value.sdt}}</td>
                                                        <td>{{value.trangthai}}</td>
                                                        <td>
                                                            <button class="btn btn-primary rounded-pill me-2 ">Đổi Điểm</button>
                                                        </td>
                                                        <td>
                                                            <button class="btn btn-warning rounded-pill me-2 ">Xem Chi Tiết</button>
                                                            <button class="btn btn-danger rounded-pill me-2 ">Hủy</button>
                                                        </td>
                                                    </tr>
                                                </template>
                                            </tbody>
                                        </table>
                                        <div class="mt-4 flex items-center justify-center text-end pagination-container">
                                            <button @click="changePage(-1)" :disabled="currentPage === 1" class="btn btn-primary icon-page">
                                                <i class="fa-solid fa-chevron-left"></i>
                                            </button>
                                            <span class="mx-4 text-lg" id="pageNumber" style="font-size: 20px;">Page {{ currentPage }}</span>
                                            <button @click="changePage(1)" :disabled="currentPage === totalPages"
                                                class="btn btn-primary icon-page">
                                                <i class="fa-solid fa-chevron-right"></i>
                                            </button>
                                        </div>
                                    </div>
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
                bv: {
                id: '',
                name: '',
                datelap: '',
                ghichu: '',
                diachi: '',
                sdt: '',
                trangthai:'',
            },

            return:{
                rowsPerPage: 10, // Số dòng trên mỗi trang
                    currentPage: 1, // Trang hiện tại
                    searchTerm: '', // Giá trị tìm kiếm
            },
            list_bv: [
                {
                    id: '1',
                    name: 'Trần A',
                    datelap: '11/4/2025',
                    ghichu: 'Khách hàng yêu cầu giao vào lúc 5h chiều',
                    diachi: 'sadasdas',
                    sdt: '110',
                    trangthai :'Đang Giao'
                },
                {
                    id: '2',
                    name: 'Trần B',
                    datelap: '11/4/2025',
                    ghichu: 'Khách hàng yêu cầu giao vào lúc 5h chiều',
                    diachi: 'sadasdas',
                    sdt: '110',
                    trangthai :'Đang Giao'
                },
                {
                    id: '3',
                    name: 'Trần C',
                    datelap: '11/4/2025',
                    ghichu: 'Khách hàng yêu cầu giao vào lúc 5h chiều',
                    diachi: 'sadasdas',
                    sdt: '110',
                    trangthai :'Đang Giao'
                },
                {
                    id: '4',
                    name: 'Trần D',
                    datelap: '11/4/2025',
                    ghichu: 'Khách hàng yêu cầu giao vào lúc 5h chiều',
                    diachi: 'sadasdas',
                    sdt: '110',
                    trangthai :'Đang Giao'
                },

            ]
            }
        },

        methods:
        {
            xoabaiviet(baiviet, vitri) {
                alert("đâsdsadasasdsa"),
                    this.list_bv.splice(vitri, 1);
            },

              // Chuyển trang
              changePage(offset) {
                    const newPage = this.currentPage + offset;
                    if (newPage > 0 && newPage <= this.totalPages) {
                        this.currentPage = newPage;
                    }
                },
        }
};
</script>
<style>
</style>