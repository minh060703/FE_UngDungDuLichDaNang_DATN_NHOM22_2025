<template>
    <div>
        <div>
            <div class="col-lg-12">
                <div class="card text-light bg-light" >
                    <div class="card-body text-light p-3">
                        <div class="row">
                            <div class="col-lg-12 bg-light text-success">
                                <div class="container mt-5">
                                    <div class="d-flex justify-content-between mb-5">
                                        <h4>Quản lý bài viết</h4>
                                        <form class="d-flex align-items-center" role="search">
                                            <label for="searchBox" class="me-2">Search:</label>
                                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                                        </form>
                                    </div>
                                    <div>
                                        <table class="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>STT</th>
                                                    <th>Tên người </th>
                                                    <th>Ảnh đại diện</th>
                                                    <th>Ảnh Checkin</th>
                                                    <th>Nội dung</th>
                                                    <th>Lượt thả tim</th>
                                                    <th>Thao tác</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <template v-for="(value,index) in list_bv" :key="index">
                                                    <tr class="align-middle text-center">
                                                        <td>{{index + 1}}</td>
                                                        <td>{{value.name}}</td>
                                                        <td><img v-bind:src="value.image" alt="" style="height: 150px;"></td>
                                                        <td><img v-bind:src="value.imageci" alt="" style="height: 150px;"></td>
                                                        <td>{{value.content}}</td>
                                                        <td><span>
                                                                {{value.heart}}
                                                            </span> <i class="fa-solid fa-heart" style="color: #e51010;"></i></td>
                                                        <td><i class="fa-solid fa-trash" style="color: #f20202;" v-on:click="xoabaiviet"></i>
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
    data(){
        return {
            bv: {
                id: '',
                name: '',
                image: '',
                imageci: '',
                content: '',
                heart: '',
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
                    image: 'https://baogiaothong.mediacdn.vn/upload/3-2022/images/2022-07-25/2-1658733315-112-width740height515.jpg',
                    imageci: 'https://baogiaothong.mediacdn.vn/upload/3-2022/images/2022-07-25/4-1658733315-132-width740height515.jpg',
                    content: 'sadasdas',
                    heart: '110',
                },

                {
                    id: '2',
                    name: 'Trần A',
                    image: 'https://baogiaothong.mediacdn.vn/upload/3-2022/images/2022-07-25/2-1658733315-112-width740height515.jpg',
                    imageci: 'https://baogiaothong.mediacdn.vn/upload/3-2022/images/2022-07-25/4-1658733315-132-width740height515.jpg',
                    content: 'sadasdas',
                    heart: '110',
                },
                {
                    id: '3',
                    name: 'Trần A',
                    image: 'https://baogiaothong.mediacdn.vn/upload/3-2022/images/2022-07-25/2-1658733315-112-width740height515.jpg',
                    imageci: 'https://baogiaothong.mediacdn.vn/upload/3-2022/images/2022-07-25/4-1658733315-132-width740height515.jpg',
                    content: 'sadasdas',
                    heart: '110',
                },

                {
                    id: '4',
                    name: 'Trần A',
                    image: 'https://baogiaothong.mediacdn.vn/upload/3-2022/images/2022-07-25/2-1658733315-112-width740height515.jpg',
                    imageci: 'https://baogiaothong.mediacdn.vn/upload/3-2022/images/2022-07-25/4-1658733315-132-width740height515.jpg',
                    content: 'sadasdas',
                    heart: '110',
                }
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
<style></style>