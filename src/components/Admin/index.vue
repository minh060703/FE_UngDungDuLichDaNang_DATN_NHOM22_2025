<template>
  <div class="container">
    <div class="card">
      <div class="card-header d-flex justify-content-between">
        <h3>DANH SÁCH BÀI HÁT</h3>
        <button
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#them"
        >
          Thêm Mới
        </button>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Bài Hát</th>
              <th>Thời Lượng</th>
              <th>Hình Ảnh</th>
              <th>Album</th>
              <th>Nghệ sĩ</th>
              <th>Thể Loại</th>
              <th>Lượt Nghe</th>
              <th>Tình Trạng</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center align-middle">01</td>
              <td class="text-center align-middle">Die with a smile</td>
              <td class="text-center align-middle">3:28</td>
              <td class="text-center align-middle">
                <img
                  style="height: 30px"
                  src="data:image/jpeg;base64,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"
                />
              </td>
              <td class="text-center align-middle">123</td>
              <td class="text-center align-middle">4,2M</td>
              <td class="text-center align-middle">3:31</td>
              <td class="text-center align-middle">3:31</td>
              <td class="text-center align-middle">
                <button class="btn btn-success">Hiển Thị</button>
              </td>
              <td class="text-center align-middle">
                <button
                  class="btn btn-primary me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#capnhat"
                >
                  Cập Nhật</button
                ><button
                  class="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#xoa"
                >
                  Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- them -->
    <div
      class="modal fade"
      id="them"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Thêm Mới Bài Hát
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-lg-4">
                <label for="">Tên Bài Hát</label>
                <input type="text" class="form-control" />
              </div>
              <div class="col-lg-4">
                <label for="">Thời Lượng</label>
                <input type="text" class="form-control" />
              </div>
              <div class="col-lg-4">
                <label for="">Hình Ảnh</label>
                <input type="text" class="form-control" />
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-lg-4">
                <label for="">Album</label>
                <select name="" id="" class="form-select">
                  <option value="1">Thriller</option>
                  <option value="1">Thriller2</option>
                  <option value="1">Thriller3</option>
                </select>
              </div>
              <div class="col-lg-4">
                <label for="">Nghệ Sĩ</label>
                <select name="" id="" class="form-select">
                  <option value="1">Michel Jackson</option>
                  <option value="1">Thriller2</option>
                  <option value="1">Thriller3</option>
                </select>
              </div>
              <div class="col-lg-4">
                <label for="">Tình Trạng</label>
                <select name="" id="" class="form-select">
                  <option value="1">Hiển Thị</option>
                  <option value="1">Thriller2</option>
                  <option value="1">Thriller3</option>
                </select>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-lg-6">
                <label for="">Thể Loại</label>
                <input type="text" class="form-control" />
              </div>
              <div class="col-lg-6">
                <label for="">Lượt nghe</label>
                <input type="text" class="form-control" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Đóng
            </button>
            <button type="button" class="btn btn-primary">Thêm Mới</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- cap nhat-->
  <div
    class="modal fade"
    id="capnhat"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Cập Nhật Bài Hát
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-lg-4">
              <label for="">Tên Bài Hát</label>
              <input type="text" class="form-control" />
            </div>
            <div class="col-lg-4">
              <label for="">Thời Lượng</label>
              <input type="text" class="form-control" />
            </div>
            <div class="col-lg-4">
              <label for="">Hình Ảnh</label>
              <input type="text" class="form-control" />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-lg-4">
              <label for="">Album</label>
              <select name="" id="" class="form-select">
                <option value="1">Thriller</option>
                <option value="1">Thriller2</option>
                <option value="1">Thriller3</option>
              </select>
            </div>
            <div class="col-lg-4">
              <label for="">Nghệ Sĩ</label>
              <select name="" id="" class="form-select">
                <option value="1">Michel Jackson</option>
                <option value="1">Thriller2</option>
                <option value="1">Thriller3</option>
              </select>
            </div>
            <div class="col-lg-4">
              <label for="">Tình Trạng</label>
              <select name="" id="" class="form-select">
                <option value="1">Hiển Thị</option>
                <option value="1">Thriller2</option>
                <option value="1">Thriller3</option>
              </select>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-lg-6">
              <label for="">Thể Loại</label>
              <input type="text" class="form-control" />
            </div>
            <div class="col-lg-6">
              <label for="">Lượt nghe</label>
              <input type="text" class="form-control" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Đóng
          </button>
          <button type="button" class="btn btn-primary">Cập Nhật</button>
        </div>
      </div>
    </div>
  </div>
  <!-- xoa -->
  <div
    class="modal fade"
    id="xoa"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Bài Hát</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body bg-danger text-light">
          <div class="row">
            <div class="col-lg-3">
              <div class="align-middle">
                <i class="fa-solid fa-music fa-4x"></i>
              </div>
            </div>
            <div class="col-lg-9">
              <p>Bạn có chắc chắn muốn xóa bài hát này không?</p>
              <p><b class="me-2">Lưu ý:</b>Điều này ko thể hoàn tác!</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Đóng
          </button>
          <button type="button" class="btn btn-danger">Xóa</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
</style>