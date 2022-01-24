<template>
  <div class="hotlineAgent">
    <div class="search">
      <div class="bg">
        <DropdownMenu>
          <DropdownItem v-model="value" :options="options" />
        </DropdownMenu>
        <Form @submit="getDataList">
          <CellGroup inset>
            <Field
              submit-on-enter
              type="search"
              v-model="inputInfo"
              placeholder="请输入查询信息"
            />
          </CellGroup>
        </Form>
      </div>
      <img :src="logo1" alt="" class="rowImg" @click="getDataList" />
    </div>

    <div class="background">
      <div class="card" v-for="item in listData" :key="item.id">
        <div class="item">
          <div class="item-title">员工信息</div>
          <div class="item-row">
            <img :src="icon1" alt="icon" />
            <div class="label">姓名<i></i></div>
            :
            <div class="value">{{ item.username }}</div>
          </div>
          <div class="item-row">
            <img :src="icon2" alt="icon" />
            <div class="label">手机号<i></i></div>
            :
            <div class="value">{{ item.phone }}</div>
          </div>
          <div class="item-row">
            <img :src="icon5" alt="icon" />
            <div class="label">分公司<i></i></div>
            :
            <div class="value">{{ item.deptno }}</div>
          </div>
          <div class="item-row">
            <img :src="icon6" alt="icon" />
            <div class="label">备注<i></i></div>
            :
            <div class="value">{{ item.remark }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { DropdownMenu, DropdownItem, Field, CellGroup } from "vant";
import { reactive, ref, toRefs, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { service } from "@/utils/request";
import { GETUSERLIST } from "@/utils/api";
import logo1 from "@/assets/logo1.png";
import icon1 from "@/assets/openOrder/icon1.png";
import icon2 from "@/assets/openOrder/icon2.png";
import icon5 from "@/assets/openOrder/icon5.png";
import icon6 from "@/assets/openOrder/icon6.png";

const listData = ref([]);
onMounted(() => {
  getDataList();
  // listData.value = [
  //   {
  //     id: "1",
  //     title: "2021大陆换表",
  //     userName: "张三11",
  //     address: "地址地址吧地址",
  //     time: "2022-01-01",
  //   },
  //   {
  //     id: "2",
  //     title: "2021大陆换表1",
  //     userName: "阿黄",
  //     address: "地址地址吧地址11",
  //     time: "2022-01-02",
  //   },
  // ];
});
const inputInfo = ref("");
const value = ref("clientname");
const options = [
  { text: "员工名", value: "clientname" },
  { text: "分公司", value: "deptname" },
  { text: "手机号", value: "phone" },
  { text: "工号", value: "userno" },
];

const getDataList = () => {
  let params = {};
  params[value._value] = inputInfo._value;
  service({
    url: GETUSERLIST,
    method: "get",
    params,
  }).then((res) => {
    listData.value = res.data.data;
  });
};

const onConfirm = () => {
  item.value.toggle();
};
/**
 * 查询
 */
const search = () => {
  console.log(inputInfo._value);
  console.log(value._value);
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
      :deep(.van-dropdown-menu) {
        width: 28%;
        .van-dropdown-menu__bar {
          height: -webkit-fill-available;
          .van-cell {
            padding: 10px 10px;
          }
        }
      }
      .van-cell-group {
        width: 78%;
        height: -webkit-fill-available;
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
          padding-bottom: 28px;
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #6fb2ff;
          border-bottom: 1px solid #e5e5e5;
          margin-bottom: 20px;
          &::before {
            content: "";
            display: inline-block;
            width: 5px;
            height: 25px;
            background: #6fb2ff;
            margin-right: 10px;
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
}
</style>
