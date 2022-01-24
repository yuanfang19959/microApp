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
    <div class="nav-box">
      <ul class="nav_content">
        <li
          v-for="(item, index) in tabList"
          :key="index + 'nav'"
          class="content"
          @click="changeTab(index, item.id)"
        >
          <span class="num" :class="{ activeContentNum: index == tabIndex }"
            >{{ item.num }}/<span
              class="dan"
              :class="{ activeContentDan: index == tabIndex }"
              >单</span
            ></span
          >
          <span
            class="nav_text"
            :class="{ activeContent: index == tabIndex }"
            >{{ item.name }}</span
          >
          <span
            class="bt-border"
            :class="{ activeBorder: index == tabIndex }"
          ></span>
        </li>
      </ul>
    </div>
    <div class="background">
      <div class="card" v-for="item in listData" :key="item.id">
        <div class="item" @click="toDetails(item)"> 
          <div class="item-title">
            <img :src="delay" alt="" class="logo" srcset="" />
            {{ item.reflecttype }} / {{ item.reflectcontent }}
          </div>
          <div class="item-row">
            <div class="label">用户<i></i></div>
            :
            <div class="value">{{ item.clientname }}({{ item.billno }})</div>
          </div>
          <div class="item-row">
            <div class="label">用户地址<i></i></div>
            :
            <div class="value">{{ item.address }}</div>
          </div>
          <div class="item-row">
            <div class="label">原始时间<i></i></div>
            :
            <div class="value">{{ item.oldtime }}</div>
          </div>
          <div class="item-row">
            <div class="label">延期时间<i></i></div>
            :
            <div class="value">{{ item.newtime }}</div>
          </div>
          <div class="item-row">
            <div class="label">时间<i></i></div>
            :
            <div class="value">{{ item.applytime }}</div>
          </div>
          <div class="status">
            <span v-if="item.publicbill == 1">公共</span>
            <span v-if="item.checkbill == 1">督办</span>
            <span v-if="item.repeatsign == 1">重复</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { DropdownMenu, DropdownItem, Field, CellGroup } from "vant";
import { DELAYEDGTOUP, DELAYEDLIST } from "@/utils/api";
import { reactive, ref, toRefs, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import logo1 from "@/assets/logo1.png";
import delay from "@/assets/delay.png";
import { service } from "@/utils/request";
const tabList = ref([]);
const listData = ref([]);
const tabIndex = ref(0);
const router = useRouter();
const tabId = ref("");
const inputInfo = ref("");
const value = ref("clientname");
const options = [
  { text: "户名", value: "clientname" },
  { text: "用户地址", value: "address" },
  { text: "手机号", value: "phone" },
];
onMounted(() => {
  getTabList();
  getDataList();
});

/**
 * 获取tab数据标签
 */
const getTabList = () => {
  service({
    url: DELAYEDGTOUP,
    method: "get",
    params: {
      userno: JSON.parse(localStorage.getItem("usreInfo")).userno, //"1000",
      deptno: JSON.parse(localStorage.getItem("usreInfo")).deptno,
    },
  }).then((res) => {
    tabList.value = res.data.data;
  });
};

/**
 * 获取数据列表
 */
const getDataList = () => {
  let params = {
    userno: JSON.parse(localStorage.getItem("usreInfo")).userno, //"1000",
    deptno: JSON.parse(localStorage.getItem("usreInfo")).deptno,
    approvestatus: Number(tabIndex.value) + 1,
  };
  params[value._value] = inputInfo._value;
  service({
    url: DELAYEDLIST,
    method: "get",
    params,
  }).then((res) => {
    listData.value = res.data.data;
  });
};

/**
 * 跳转详情
 */
const toDetails = (item)=>{
  router.push({
    path: `/delayPending`,
    query: {
      billno: item.billno,
      delayedid:item.delayedid
    },
  });
}
/**
 * 查询
 */
const search = () => {
  console.log(inputInfo._value);
  console.log(value._value);
};
/*
 * 切换tab(热线   供热  供水)
 */
const changeTab = (index, id) => {
  tabIndex.value = index;
  tabId.value = id;
  getDataList();
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

  .nav-box {
    padding: 39px 28px;
    background: #f5f5f5;
    .nav_content {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .content {
        position: relative;
        padding: 0 44px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .num {
          font-size: 36px;
          margin-bottom: 10px;
          color: #999999;
        }
        .dan {
          font-size: 14px;
          color: #999999;
        }
        .nav_text {
          font-size: 24px;
          font-weight: 500;
          color: #999999;
        }
        .activeContent {
          font-size: 24px;
          font-weight: bold;
          color: #333333;
        }
        .activeContentNum {
          color: #ff6e6e;
        }
        .activeContentDan {
          color: #333333;
        }
        .bt-border {
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 66px;
          height: 10px;
          background: #6fb2ff;
          opacity: 0.8;
          border-radius: 5px;
          display: none;
        }
        .activeBorder {
          display: block;
        }
      }
    }
  }
  .background {
    background: #f5f5f5;
    min-height: calc(100vh - 260px);

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
        .status{
          span{
            margin-right: 10px;
            padding: 5px 10px;
            border-radius: 5px;
            background: #409EFF;
          }
          span:first-child{
            background: #67C23A;
          }
          span:last-child{
            background:#E6A23C;
          }
        }
        .item-title {
          padding-bottom: 28px;
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #363a44;
          border-bottom: 1px solid #e5e5e5;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          .logo {
            width: 38px;
            height: 38px;
            margin-right: 10px;
          }
        }
        .item-row {
          display: flex;
          height: 55px;
          line-height: 55px;
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
            font-size: 28px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #363a44;
            margin-left: 10px;
            width: 100%; /*定义块元素的宽度*/
            white-space: nowrap; /*内容超宽后禁止换行显示*/
            overflow: hidden; /*超出部分隐藏*/
            text-overflow: ellipsis; /*文字超出部分以省略号显示*/
          }
        }
      }
    }
  }
}
</style>
