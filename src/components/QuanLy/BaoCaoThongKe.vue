<!-- 
            +--------------------------------------------------------+
            |      Trước khi chạy hãy chạy lệnh này trước trong terminal   |
            |     npm install --save apexcharts vue3-apexcharts                 |
            |     Để cài đặt vue3-apexcharts nếu chưa có                              |
            +--------------------------------------------------------+
-->
<template>
      <div class="container">
            <div class="card">
                  <!-- Nút chuyển đổi biểu đồ -->
                  <div class="d-flex text-start">
                        <div class="d-flex justify-content-between p-3">
                        <a class="" href="#" @click.prevent="chonBieuDo('nguoiDung')"
                              :class="{ active: bieuDoDangChon === 'nguoiDung' }">
                              Người dùng
                        </a>
                        <a class="ms-5" href="#" @click.prevent="chonBieuDo('doanhSo')"
                              :class="{ active: bieuDoDangChon === 'doanhSo' }">
                              Doanh số
                        </a>
                  </div>
                  </div>

                  <div class="card-body">
                        <!-- Biểu đồ Người dùng -->
                        <apexchart v-if="bieuDoDangChon === 'nguoiDung'" width="100%" height="360" type="line"
                              :options="tuyChonNguoiDung" :series="duLieuNguoiDung"></apexchart>

                        <!-- Biểu đồ Doanh số -->
                        <apexchart v-if="bieuDoDangChon === 'doanhSo'" width="100%" height="360" type="line"
                              :options="tuyChonDoanhSo" :series="duLieuDoanhSo"></apexchart>
                  </div>
            </div>
      </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
      components: {
            apexchart: VueApexCharts,
      },
      data() {
            return {
                  bieuDoDangChon: "nguoiDung", // ✅ trạng thái biểu đồ đang hiển thị

                  // ✅ Dữ liệu biểu đồ người dùng
                  duLieuNguoiDung: [
                        {
                              name: "Truy cập",
                              data: [5, 10, 7, 15, 12, 20],
                        },
                        {
                              name: "Tương tác",
                              data: [20, 18, 22, 19, 25, 30],
                        },
                  ],

                  // ✅ Dữ liệu biểu đồ doanh số
                  duLieuDoanhSo: [
                        {
                              name: "Đổi điểm",
                              data: [100, 120, 150, 130, 170, 200],
                        },
                        {
                              name: "Lợi nhuận",
                              data: [40, 50, 60, 55, 65, 80],
                        },
                  ],

                  // ✅ Tuỳ chọn biểu đồ người dùng
                  tuyChonNguoiDung: {
                        chart: { type: "line", toolbar: { show: false } },
                        stroke: { width: 3, curve: "smooth" },
                        xaxis: {
                              categories: ["T2", "T3", "T4", "T5", "T6", "T7"],
                        },
                        colors: ["#0d6efd", "#6c757d"],
                        legend: { position: "top" },
                  },

                  // ✅ Tuỳ chọn biểu đồ doanh số
                  tuyChonDoanhSo: {
                        chart: { type: "line", toolbar: { show: false } },
                        stroke: { width: 3, curve: "smooth" },
                        xaxis: {
                              categories: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
                        },
                        colors: ["#198754", "#ffc107"],
                        legend: { position: "top" },
                  },
            };
      },
      methods: {
            chonBieuDo(loai) {
                  this.bieuDoDangChon = loai;
            },
      },
};
</script>

<style scoped>
.card {
      border: 1px solid #ccc;
      border-radius: 10px;
      margin-top: 20px;
      overflow: hidden;
}

a {
      cursor: pointer;
      padding: 5px 10px;
      text-decoration: none;
      color: #0d6efd;
      font-weight: 500;
}

a.active {
      font-weight: bold;
      text-decoration: underline;
}
</style>