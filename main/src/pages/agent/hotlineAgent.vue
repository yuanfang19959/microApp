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
          @click="changeTab(index, item.type)"
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
            <img :src="hotLine" alt="" class="logo" srcset="" />
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
            <div class="value">
              {{ item.address }}
            </div>
          </div>
          <div class="item-row">
            <div class="label">时间<i></i></div>
            :
            <div class="value">{{ item.notetime }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { DropdownMenu, DropdownItem, Field, CellGroup, Form } from "vant";
import { reactive, ref, toRefs, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import logo1 from "@/assets/logo1.png";
import hotLine from "@/assets/hotLine.png";
import { service } from "@/utils/request";
import { BILLGROUP, BILLLIST } from "@/utils/api";
const router = useRouter();
const tabList = ref([]);
const listData = ref([]);
const tabIndex = ref(0);
const tabId = ref("");
const item = JSON.parse(useRoute().query.item);
const inputInfo = ref("");
const value = ref("clientname");
const options = [
  { text: "户名", value: "clientname" },
  { text: "用户地址", value: "address" },
  { text: "手机号", value: "phone" },
];

onMounted(async () => {
  tabIndex.value = item.id;
  tabId.value = item.id;
  getTabList();
  getDataList();
});

const onConfirm = () => {
  item.value.toggle();
};
/**
 * 跳转详情
 */
const toDetails = (item) => {
  router.push({
    path: `/pending`,
    query: {
      billno: item.billno,
      type: tabIndex.value,
    },
  });
};
/**
 * 获取tab数据标签
 */
const getTabList = () => {
  service({
    url: BILLGROUP,
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
  console.log(value._value);
  console.log(inputInfo._value);
  let params = {
    userno: JSON.parse(localStorage.getItem("usreInfo")).userno, //"1000",
    deptno: JSON.parse(localStorage.getItem("usreInfo")).deptno,
    billstatus: Number(tabIndex.value) + 1,
  };
  params[value._value] = inputInfo._value;
  service({
    url: BILLLIST,
    method: "get",
    params,
  }).then((res) => {
    listData.value = res.data.data;
  });
};

/*
 * 切换tab
 */
const changeTab = (index, type) => {
  console.log(tabIndex);
  console.log(type);
  tabIndex.value = index;
  tabId.value = type;

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
    height: 168px;
    background: #f5f5f5;
    padding-top: 36px;
    box-sizing: border-box;
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
            text-align: justify;
            font-size: 28px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #686b73;
            min-width: 120px;
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
