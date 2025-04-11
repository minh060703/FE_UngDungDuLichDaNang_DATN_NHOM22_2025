<template>
      <div class="container">
            <div class="header">
                  <h1 style="font-size: 30px;color: #14b8a6;">Thông tin phương thức thanh toán</h1>
                  <div class="search-wrapper">
                        <label for="search" class="text-teal-500 mr-2" style="font-size: 25px;">Search:</label>
                        <input class="search" type="text" id="search" v-model="searchTerm"
                              placeholder="Tìm kiếm tên...">
                  </div>
            </div>
            <div class="card">
                  <div class="card-header text-end">
                        <button type="button" class="btn" data-bs-toggle="modal"
                              data-bs-target="#ModalThem">Thêm</button>
                  </div>
                  <div class="card-body">
                        <table class="table table-bordered bg-white">
                              <thead>
                                    <tr class="text-center">
                                          <th style="width: 10%;">STT</th>
                                          <th style="width: 40%;">Tên phương thức thanh toán</th>
                                          <th style="width: 20%;">Tình trạng</th>
                                          <th style="width: 30%;">Thao tác</th>
                                    </tr>
                              </thead>
                              <tbody v-for="(value, index) in list_thanh_toan" :key="index">
                                    <tr class="text-center align-middle">
                                          <td>{{ index + 1 }}</td>
                                          <td>{{ value.ten_thanh_toan }}</td>
                                          <td>
                                                <div v-if="value.tinh_trang == 1">
                                                      <span class="text-success">Hoạt động</span>
                                                </div>
                                                <div v-else>
                                                      <span class="text-danger">Không hoạt động</span>
                                                </div>
                                          </td>
                                          <td class="text-center d-flex justify-content-center">
                                                <button type="button" class="btn_chinh_sua btn"
                                                      style="background-color: #F9CA24;" data-bs-toggle="modal"
                                                      data-bs-target="#ModalChinhsua" @click="moModal(value)">Chỉnh
                                                      Sửa</button>
                                                <button type="button" class="btn_xoa btn"
                                                      style="background-color: #FF2C2C;"
                                                      v-on:click="xoa_thanh_toan(index)">Xóa</button>
                                          </td>
                                    </tr>
                              </tbody>
                        </table>
                  </div>
            </div>
      </div>
      <!-- Modal Thêm -->
      <div class="modal fade" id="ModalThem" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                  <div class="modal-content">
                        <div class="modal-header">
                              <h1 class="modal-title fs-5" id="exampleModalLabel">Thông tin loại thanh toán</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                              <div class="form-group d-flex justify-content-between mb-2">
                                    <label for="ten_thanh_toan" style="width: 40%;" class="align-middle">ID thanh toán</label>
                                    <input type="text" class="form-control" id="ten_thanh_toan" v-model="thanh_toan.id_thanh_toan">
                              </div>
                              <div class="form-group d-flex justify-content-between mb-2">
                                    <label for="ten_thanh_toan s" style="width: 40%;" class="align-middle">Tên phương thức thanh toán</label>
                                    <input type="text" class="form-control" id="ten_thanh_toan"
                                          v-model="thanh_toan.ten_thanh_toan">
                              </div>
                              <div class="form-group d-flex justify-content-between">
                                    <label for="tinh_trang" style="width: 40%;" class="align-middle">Tình trạng</label>
                                    <select class="input-field" v-model="thanh_toan.tinh_trang" style="width: 100%;height: 45px;border: 1px solid gainsboro;border-radius: 5px;">
                                          <option :value="1">Hoạt động</option>
                                          <option :value="2">Không hoạt động</option>
                                    </select>
                              </div>
                        </div>
                        <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
                              <button type="button" class="btn btn-primary" v-on:click="them_thanh_toan()">Tạo</button>
                        </div>
                  </div>
            </div>
      </div>
      <!-- Modal Chỉnh sửa -->
      <div class="modal fade" id="ModalChinhsua" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                  <div class="modal-content">
                        <div class="modal-header">
                              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                              <div class="form-group d-flex justify-content-between mb-2">
                                    <label for="ten_thanh_toan" style="width: 40%;" class="align-middle">ID thanh toán</label>
                                    <input type="text" class="form-control" id="ten_thanh_toan" v-model="Luu_tam.id_thanh_toan">
                              </div>
                              <div class="form-group d-flex justify-content-between mb-2">
                                    <label for="ten_thanh_toan s" style="width: 40%;" class="align-middle">Tên phương thức thanh toán</label>
                                    <input type="text" class="form-control" id="ten_thanh_toan"
                                          v-model="Luu_tam.ten_thanh_toan">
                              </div>
                              <div class="form-group d-flex justify-content-between">
                                    <label for="tinh_trang" style="width: 40%;" class="align-middle">Tình trạng</label>
                                    <select class="input-field" v-model="Luu_tam.tinh_trang" style="width: 100%;height: 45px;border: 1px solid gainsboro;border-radius: 5px;">
                                          <option :value="1">Hoạt động</option>
                                          <option :value="2">Không hoạt động</option>
                                    </select>
                              </div>                            
                        </div>
                        <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
                              <button type="button" class="btn btn-primary"
                                    v-on:click="cap_nhat_thanh_toan()">Lưu</button>
                        </div>
                  </div>
            </div>
      </div>
</template>
<script>
export default {
      data() {
            return {
                  thanh_toan: {
                        id_thanh_toan: '',
                        ten_thanh_toan: '',
                        tinh_trang: 1
                  },
                  list_thanh_toan: [
                        { id_thanh_toan: '1', ten_thanh_toan: 'Thanh toán tiền mặt', tinh_trang: 1 },
                        { id_thanh_toan: '2', ten_thanh_toan: 'Thanh toán chuyển khoản', tinh_trang: 2 },
                        { id_thanh_toan: '3', ten_thanh_toan: 'Thanh toán điểm tích luỹ', tinh_trang: 2 },
                        { id_thanh_toan: '4', ten_thanh_toan: 'Thanh toán credit card', tinh_trang: 1 },
                        { id_thanh_toan: '5', ten_thanh_toan: 'Thanh toán thẻ Visa', tinh_trang: 2 },
                  ],
                  Luu_tam: {},
                  chinh_sua: null,
            }
      },
      methods: {
            them_thanh_toan() {
                  this.list_thanh_toan.push(this.thanh_toan);
                  this.thanh_toan = {};
            },
            xoa_thanh_toan(index) {
                  this.list_thanh_toan.splice(index, 1);
            },
            moModal(items) {
                  this.Luu_tam = { ...items }; // clone data để tránh cập nhật trực tiếp lên dữ liệu
                  this.showModal = true;
            },
            cap_nhat_thanh_toan() {
                  const index = this.list_thanh_toan.findIndex(
                        item => item.id_thanh_toan === this.Luu_tam.id_thanh_toan
                  );
                  if (index !== -1) {
                        this.list_thanh_toan.splice(index, 1, { ...this.Luu_tam });
                  }
                  this.showModal = false; // đóng modal sau khi cập nhật
            }
      }

}
</script>
<style>
.header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
}

.header .search-wrapper {
      display: flex;
      align-items: center;
}

.header .search-wrapper label {
      color: #14b8a6;
      /* Màu chữ cho label */
      margin-right: 8px;
      font-size: 25px;
}

.header .search-wrapper input {
      border: 2px solid aquamarine;
      border-radius: 10px;
      height: 45px;
}

.card {
      display: flex;
      height: 100%;
      background-color: #F8F8F8;
}

.card .card-header {
      border-radius: 10px;
      padding: 20px;

}

.card .card-header button {
      background-color: #FFDF6F;
      color: white;
      border: none;
      border-radius: 10px;
      height: 45px;
      width: 130px;
}

.card .card-body .btn_chinh_sua {
      color: white;
      width: 130px;
      margin-right: 20px;
      border-radius: 10px;
}

.card .card-body .btn_xoa {
      color: white;
      width: 130px;
      border-radius: 10px;
}
</style>