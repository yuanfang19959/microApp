<template>
  <div class="hotlineAgent">
    <div class="search">
      <div class="bg">
        <DropdownMenu>
          <DropdownItem v-model="value" :options="options" />
        </DropdownMenu>
        <CellGroup inset>
          <Field v-model="inputInfo" placeholder="请输入查询信息" />
        </CellGroup>
      </div>
      <img :src="logo1" alt="" class="rowImg" @click="search" />
    </div>

    <div class="background">
      <div
        class="card"
        v-for="item in listData"
        :key="item.id"
        @click="toDetail(item)"
      >
        <div class="item">
          <div class="item-title">
            <img :src="insert" alt="" />
            <span>基础信息</span>
          </div>
          <div class="item-row">
            <div class="label">姓名<i></i></div>
            :
            <div class="value">
              {{ item.clientname }}({{ item.incomingtel }})
            </div>
          </div>
          <div class="item-row">
            <div class="label">工单类型<i></i></div>
            :
            <div class="value">{{ item.problemtypeval }}</div>
          </div>
          <div class="item-row">
            <div class="label">用户地址<i></i></div>
            :
            <div class="value">{{ item.address }}</div>
          </div>
          <div class="item-row">
            <div class="label">时间<i></i></div>
            :
            <div class="value">{{ item.notetime }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="circle-btn" @click="addNew">新建录入</div>
  </div>
</template>
<script setup>
import { DropdownMenu, DropdownItem, Field, CellGroup } from "vant";
import { reactive, ref, toRefs, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { service } from "@/utils/request";
import logo1 from "@/assets/logo1.png";
import icon1 from "@/assets/openOrder/icon1.png";
import icon2 from "@/assets/openOrder/icon2.png";
import icon3 from "@/assets/openOrder/icon3.png";
import insert from "@/assets/insert.png";
import { BASEURL, GET_SITE_LIST } from "@/utils/api";

const router = useRouter();

const listData = ref([]);
const inputInfo = ref("");
const value = ref("clientname");
const options = [
  { text: "户名", value: "clientname" },
  { text: "用户地址", value: "address" },
  { text: "手机号", value: "phone" },
];

onMounted(() => {
  getOrderList();
});

const onConfirm = () => {
  item.value.toggle();
};

const toDetail = (item) => {
  router.push({
    path: "/insertDetail",
    query: {
      billno: item.billno,
    },
  });
};

const getOrderList = () => {
  let data = {
    userno: JSON.parse(localStorage.getItem("usreInfo")).userno,
    pagenum: 1,
  };
  data[value.value] = inputInfo.value;
  service({
    url: GET_SITE_LIST,
    method: "get",
    params: data,
  }).then((res) => {
    console.log(res, "列表数据");
    if (res.data.code == 200) {
      listData.value = res.data.data;
    }
  });
};
/**
 * 查询
 */
const search = () => {
  console.log(inputInfo._value);

  console.log(value._value);
  getOrderList();
};

const addNew = () => {
  router.push("/form");
};
</script>
<style lang="scss" scoped>
.hotlineAgent {
  .search {
    width: 750px;
    height: 98px;
    background: #ededed;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    .rowImg {
      width: 36px;
      height: 34px;
      position: absolute;
      top: 28px;
      right: 35px;
      z-index: 9999;
    }
    .bg {
      width: 718px;
      height: 72px;
      background: #ffffff;
      border-radius: 6px;
      margin: auto;
      display: flex;
      align-items: center;
      :deep(.van-dropdown-menu) {
        width: 25%;
        .van-dropdown-menu__bar {
          height: 100% !important;
        }
      }
      .van-cell-group {
        width: 80%;
        // background: #ffffff;
      }
      .van-cell {
        padding: 0 !important;
      }
    }
  }

  .background {
    background: #f5f5f5;
    height: calc(100vh - 100px);

    .card {
      .item {
        width: 710px;
        background: #ffffff;
        border: 1px solid #e5e5e5;
        border-radius: 12px;
        margin: auto;
        padding: 30px;
        box-sizing: border-box;
        margin-bottom: 20px;
        .item-title {
          display: flex;

          padding-bottom: 28px;
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #6fb2ff;
          border-bottom: 1px solid #e5e5e5;
          margin-bottom: 20px;
          img {
            width: 38px;
            height: 38px;
            margin-right: 16px;
          }
        }
        .item-row {
          display: flex;
          height: 55px;
          line-height: 55px;
          img {
            width: 30px;
            height: 30px;
            line-height: 28px;
            margin-right: 14px;
            margin-top: 10px;
          }
          .label {
            min-width: 120px;
            text-align: justify;
            font-size: 28px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #686b73;
            i {
              display: inline-block;
              width: 100%;
            }
          }
          .value {
            margin-left: 40px;
            font-size: 28px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #363a44;
          }
        }
      }
    }
  }
  .circle-btn {
    position: fixed;
    font-size: 28px;
    bottom: 150px;
    right: 20px;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    background: linear-gradient(0deg, #428ee5, #71b3ff);
    color: #fff;
    text-align: center;
    line-height: 38px;
    box-shadow: 1px 2px 5px #888888;
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
