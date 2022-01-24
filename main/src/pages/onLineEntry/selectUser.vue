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
      <div
        class="card"
        v-for="item in listData"
        :key="item.userid"
        @click="goDetail(item)"
      >
        <div class="item">
          <div class="state">{{ item.state }}</div>
          <div class="item-title">用户信息</div>
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
            <img :src="icon3" alt="icon" />
            <div class="label">用户地址<i></i></div>
            :
            <div class="value">{{ item.address }}</div>
          </div>
        </div>
      </div>
    </div>
    <FilterUser :getSelectFromSon="getList"/>
  </div>
</template>
<script setup>
import { DropdownMenu, DropdownItem, Field, CellGroup } from "vant";
import { reactive, ref, toRefs, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { service } from "@/utils/request";
import { BILLGROUP, HEADINGLIST } from "@/utils/api";
import logo1 from "@/assets/logo1.png";
import icon1 from "@/assets/openOrder/icon1.png";
import icon2 from "@/assets/openOrder/icon2.png";
import icon3 from "@/assets/openOrder/icon3.png";
import FilterUser from '@/components/FilterUser.vue'
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
  getDataList();
});

const getList = (val) => {
  let infoList = val.split('/');
console.log(infoList)
  let params = {
    areaname:infoList[1], //小区名
    floornumber:infoList[2], // 楼号
    unitnumber:infoList[3], // 单元号
    roomnumber:infoList[4] // 户号
  }
  getDataList(params)
}


const getDataList = (item) => {
  console.log(value._value);
  console.log(inputInfo._value);
  let params = {};
  params[value._value] = inputInfo._value;
  if(item) {
    params = {...item}
  }
  service({
    url: HEADINGLIST,
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

const goDetail = (item) => {
  console.log(item)
  router.push({
    path: `/form`,
    query: {
      info: JSON.stringify(item),
    },
  });
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
        position: relative;
        .state {
          padding: 0 10px 0 35px;
          // width: 160px;
          height: 40px;
          background: #6FB2FF;
          background: linear-gradient(75deg, transparent 30px, #6FB2FF 0);

          position: absolute;
          font-size: 24px;
          color: #ffffff;
          line-height: 40px;
          text-align: center;
          top: 30px;
          right: 30px;
        }
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
