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
    <div class="nav-box">
      <ul class="nav_content">
        <li
          v-for="(item, index) in tabList"
          :key="index + 'nav'"
          class="content"
          @click="changeTab(index, item.id)"
        >
          <span class="num" :class="{ activeContentNum: index == tabIndex }"
            >99/<span
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
        <div class="item">
          <div class="item-title">
            <img :src="heating" alt="" class="logo" srcset="" />
            {{ item.title }}
          </div>
          <div class="item-row">
            <div class="label">状态<i></i></div>
            :
            <div class="value">{{ item.userName }}</div>
          </div>
          <div class="item-row">
            <div class="label">楼号<i></i></div>
            :
            <div class="value">{{ item.address }}</div>
          </div>
          <div class="item-row">
            <div class="label">用户地址<i></i></div>
            :
            <div class="value">{{ item.time }}</div>
          </div>
          <div class="item-row">
            <div class="label">用户<i></i></div>
            :
            <div class="value">{{ item.time }}</div>
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
import logo1 from "@/assets/logo1.png";
import heating from "@/assets/heating.png";
import { service } from "@/utils/request";
const tabList = ref([]);
const listData = ref([]);
const tabIndex = ref(0);
const tabId = ref("");
onMounted(() => {
  tabList.value = [
    {
      id: 1,
      name: "待处理",
    },
    {
      id: 2,
      name: "已完成",
    },
  ];
  listData.value = [
    {
      id: "1",
      title: "2021大陆换表",
      userName: "张三11",
      address: "地址地址吧地址",
      time: "2022-01-01",
    },
    {
      id: "2",
      title: "2021大陆换表1",
      userName: "阿黄",
      address: "地址地址吧地址11",
      time: "2022-01-02",
    },
  ];
  // 请求示例
  //   service({
  //     url: QUERY,
  //     method: "get",
  //     params: {
  //       type: "1",
  //     },
  //   }).then((res) => {});
});
const inputInfo = ref("");
const value = ref(0);
const options = [
  { text: "户名", value: 0 },
  { text: "用户地址", value: 1 },
  { text: "手机号", value: 2 },
];
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
/*
 * 切换tab(热线   供热  供水)
 */
const changeTab = (index, id) => {
  tabIndex.value = index;
  tabId.value = id;
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
        width: 25%;
        .van-dropdown-menu__bar {
          height: 38px !important;
        }
      }
      .van-cell-group {
        width: 80%;
        // background: #ffffff;
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
    height: calc(100vh - 250px);

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
            width: 120px;
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
          }
        }
      }
    }
  }
}
</style>
