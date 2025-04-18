<template>
      <div class="card bg-white">
            <div class="card-header" style="padding: 20px;">
                  <div>
                        <h2>Quản lý loại thanh toán</h2>
                  </div>
            </div>

            <div class="card-body" style="padding: 20px;">
                  <div class="d-lg-flex align-items-center mb-4 gap-3">
                        <div class="position-relative">
                              <input type="text" class="form-control ps-5 radius-30 search" placeholder="Tìm kiếm"
                                    id="search" v-model="searchTerm">
                              <span class="position-absolute top-50 product-show translate-middle-y">
                                    <i class="bx bx-search"></i>
                              </span>
                        </div>
                        <div class="ms-auto"><a href="javascript:;" class="btn btn-primary radius-30 mt-2 mt-lg-0"
                                    data-bs-toggle="modal" data-bs-target="#ModalThem"><i
                                          class="bx bxs-plus-square"></i>Thêm
                                    mới</a></div>
                  </div>
                  <table class="table mb-0 table-hover" style="font-size: 16px;">
                        <thead class="table-light">
                              <tr class="text-center">
                                    <th class="text-center">STT</th>
                                    <th class="text-center">ID thanh toán</th>
                                    <th class="text-center">Tên phương thức thanh toán</th>
                                    <th class="text-center">Tình trạng</th>
                                    <th class="text-center">Thao tác</th>
                              </tr>
                        </thead>
                        <tbody v-for="(value, index) in list_thanh_toan" :key="index">
                              <tr class="text-center align-middle">
                                    <td>{{ index + 1 }}</td>
                                    <td># {{ value.id_thanh_toan }}</td>
                                    <td>{{ value.ten_thanh_toan }}</td>
                                    <td style="text-align: center;font-size: 18px;">
                                          <a v-if="value.tinh_trang == 0"
                                                class="badge rounded-pill text-danger bg-light-danger p-2 text-uppercase px-3"><i
                                                      class='bx bxs-circle me-1'></i> ĐANG TẠM DỪNG</a>
                                          <a v-else
                                                class="badge rounded-pill text-success bg-light-success p-2 text-uppercase px-3"><i
                                                      class='bx bxs-circle me-1'></i> ĐANG HOẠT ĐỘNG</a>
                                    </td>
                                    <td class="text-center d-flex justify-content-center">
                                          <div class="d-flex order-actions justify-content-center">
                                                <a href="javascript:;" class="ms-3" data-bs-toggle="modal"
                                                      data-bs-target="#ModalChinhsua" @click="moModal(value)"><i
                                                            class='bx bxs-edit'></i></a>
                                                <a href="javascript:;" class="ms-3" data-bs-toggle="modal"
                                                      data-bs-target="#ModalXoa" @click="xoaThanhToan(value)"><i
                                                            class='bx bxs-trash'></i></a>
                                          </div>
                                    </td>
                              </tr>
                        </tbody>
                  </table>
            </div>
      </div>
      <!-- Modal Thêm -->
      <div class="modal fade" id="ModalThem" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                        <div class="modal-header" style="padding: 20px;">
                              <h1 class="modal-title fs-5" id="exampleModalLabel">Thông tin loại thanh toán</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div class="modal-body" style="font-size: 16px;">
                              <div class="p-4 rounded">
                                    <div class="mb-3">
                                          <label for="ten_thanh_toan" style="width: 40%;" class="align-middle">ID thanh
                                                toán</label>
                                          <input type="text" class="form-control" id="ten_thanh_toan"
                                                v-model="thanh_toan.id_thanh_toan">
                                    </div>
                                    <div class="mb-3">
                                          <label for="ten_thanh_toan">Tên phương
                                                thức thanh toán</label>
                                          <input type="text" class="form-control" id="ten_thanh_toan"
                                                v-model="thanh_toan.ten_thanh_toan">
                                    </div>
                                    <div class="mb-3">
                                          <label for="tinh_trang">Tình trạng</label>
                                          <select class="input-field" v-model="thanh_toan.tinh_trang"
                                                style="width: 100%;height: 45px;border: 1px solid gainsboro;border-radius: 5px;">
                                                <option :value="1">Hoạt động</option>
                                                <option :value="0">Không hoạt động</option>
                                          </select>
                                    </div>
                              </div>
                        </div>
                        <div class="modal-footer">
                              <button type="button" class="btn btn-secondary radius-10 mt-2 mt-lg-0"
                                    data-bs-dismiss="modal">Huỷ</button>
                              <button type="button" class="btn btn-primary radius-10 mt-2 mt-lg-0"
                                    v-on:click="them_thanh_toan()">Tạo</button>
                        </div>
                  </div>
            </div>
      </div>
      <!-- Modal Chỉnh sửa -->
      <div class="modal fade" id="ModalChinhsua" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                        <div class="modal-header">
                              <h1 class="modal-title fs-5" id="exampleModalLabel">Chỉnh sửa phương thức thanh toán</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div class="modal-body" style="font-size: 16px;">
                              <div class="p-4 rounded">
                                    <div class="mb-3">
                                          <label for="ten_thanh_toan" style="width: 40%;" class="align-middle">ID thanh
                                                toán</label>
                                          <input type="text" class="form-control" id="ten_thanh_toan"
                                                v-model="Luu_tam.id_thanh_toan">
                                    </div>
                                    <div class="mb-3">
                                          <label for="ten_thanh_toan">Tên phương
                                                thức thanh toán</label>
                                          <input type="text" class="form-control" id="ten_thanh_toan"
                                                v-model="Luu_tam.ten_thanh_toan">
                                    </div>
                                    <div class="mb-3">
                                          <label for="tinh_trang">Tình trạng</label>
                                          <select class="input-field" v-model="Luu_tam.tinh_trang"
                                                style="width: 100%;height: 45px;border: 1px solid gainsboro;border-radius: 5px;">
                                                <option :value="1">Hoạt động</option>
                                                <option :value="0">Không hoạt động</option>
                                          </select>
                                    </div>
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
      <!-- Modal xoá -->
      <div class="modal fade" id="ModalXoa" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                        <div class="modal-body">
                              <div class="content p-5 px-3 text-center">
                                    <span class="fa-stack fa-2x mb-3">
                                          <i class="fa-solid fa-2xl fa-circle" style="color: #ffc8c2;"></i>
                                          <i class="fa-solid fa-trash-can text-danger fa-stack-1x"></i>
                                    </span>
                                    <h3 class="fs-20 text-gray-9 fw-bold mb-2 mt-1">Xoá phương thức thanh toán</h3>
                                    <p class="text-gray-6 mb-0 fs-16">Bạn có chắc chắn muốn xoá phương thức thanh toán
                                          này không?</p>
                                    <h5 class="mt-3">{{ Luu_tam.ten_thanh_toan }} </h5>
                                    <div class="modal-footer-btn mt-3 d-flex justify-content-center mt-5">
                                          <button type="button"
                                                class="btn me-2 btn-secondary fs-13 fw-medium p-2 px-3 shadow-none"
                                                data-bs-dismiss="modal"
                                                style="background-color: #FF2C2C;width: 30%;">Huỷ</button>
                                          <button type="submit" class="btn btn-primary fs-13 fw-medium p-2 px-3"
                                                style="background-color: #FE9F43;width: 30%;" @click="xoa_thanh_toan">
                                                Đồng ý xoá</button>
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
                  thanh_toan: {
                        id_thanh_toan: '',
                        ten_thanh_toan: '',
                        tinh_trang: 1
                  },
                  list_thanh_toan: [
                        { id_thanh_toan: '1', ten_thanh_toan: 'Thanh toán tiền mặt', tinh_trang: 1 },
                        { id_thanh_toan: '2', ten_thanh_toan: 'Thanh toán chuyển khoản', tinh_trang: 0 },
                        { id_thanh_toan: '3', ten_thanh_toan: 'Thanh toán điểm tích luỹ', tinh_trang: 0 },
                        { id_thanh_toan: '4', ten_thanh_toan: 'Thanh toán credit card', tinh_trang: 1 },
                        { id_thanh_toan: '5', ten_thanh_toan: 'Thanh toán thẻ Visa', tinh_trang: 0 },
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
            xoa_thanh_toan() {
                  const index = this.list_thanh_toan.findIndex(
                        item => item.id_thanh_toan === this.Luu_tam.id_thanh_toan
                  );
                  if (index !== -1) {
                        this.list_thanh_toan.splice(index, 1);
                  }
                  const modal = bootstrap.Modal.getInstance(document.getElementById('ID_MODAL'));
                  modal.hide();
            },
            moModal(items) {
                  this.Luu_tam = { ...items }; // clone data để tránh cập nhật trực tiếp lên dữ liệu
                  this.showModal = true;
            },
            xoaThanhToan(items) {
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
                  const modal = bootstrap.Modal.getInstance(document.getElementById('ID_MODAL'));
                  modal.hide();
            }
      }

}
</script>
<style></style>