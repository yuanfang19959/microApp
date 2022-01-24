<template>
  <div class="home">
    <!-- 菜单列表 -->
    <div class="listDox card">
      <div
        class="listItem"
        v-for="item in listData"
        :key="item.id"
        @click="toPages(item)"
      >
        <img :src="item.url" alt="" class="itemImg" />
        <div class="listText">{{ item.listName }}</div>
      </div>
    </div>
    <!-- 公告信息 -->
    <div class="infoBox card">
      <img :src="info" alt="" class="infoImg" />
      <div class="infoList">
        <div class="infoItem" v-for="item in infoData" :key="item.id">
          <span>
            {{ item.text }}
          </span>
          <img :src="more" alt="" class="more" />
        </div>
      </div>
    </div>
    <!-- 热线  供热  供水 切换 -->
    <div class="nav-box">
      <ul class="nav_content">
        <li
          v-for="(item, index) in tabList"
          :key="index + 'nav'"
          class="content"
          @click="changeTab(index, item.id)"
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
    <!-- 数据详情 -->
    <div class="card tabContentBox">
      <div
        class="row"
        v-for="(item, index) in agencyList"
        :key="index"
        @click="toAgency(item)"
      >
        <div class="left">
          <img :src="item.img" alt="" class="rowImg" />
          <span>{{ item.name }}</span>
        </div>
        <div class="right">
          <span class="numberSize">{{ item.num }}</span>
          <span class="unit">条</span>
          <img :src="more" alt="" class="more" />
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { reactive, ref, toRefs, onMounted } from "vue";
import { BILLGROUP, DELAYEDGTOUP, GETMENU } from "@/utils/api";
import { service } from "@/utils/request";
import { useRoute, useRouter } from "vue-router";
import list from "@/assets/list.png";
import info from "@/assets/info.png";
import more from "@/assets/more.png";
import daiQueRen from "@/assets/contentList/daiQueRen.png";
import daiFanKui from "@/assets/contentList/daiFanKui.png";
import yiFankui from "@/assets/contentList/yiFankui.png";
import daiShenPi from "@/assets/contentList/daiShenPi.png";
import kaiTongDan from "@/assets/contentList/kaiTongDan.png";
import daiBan from "@/assets/contentList/daiBan.png";

import KaiTongDan from "@/assets/homeMenu/KaiTongDan.png";
import GengDuo from "@/assets/homeMenu/GengDuo.png";
import GongReYongHuChaYan from "@/assets/homeMenu/GongReYongHuChaYan.png";
import GongShuiDaiBan from "@/assets/homeMenu/GongShuiDaiBan.png";
import ReXianGongDan from "@/assets/homeMenu/ReXianGongDan.png";
import YanQiShenHe from "@/assets/homeMenu/YanQiShenHe.png";
import YiXianLuRu from "@/assets/homeMenu/YiXianLuRu.png";
import YuanGongTongXinLu from "@/assets/homeMenu/YuanGongTongXinLu.png";

const infoData = ref([]);
const listData = ref([]);
const tabList = ref([]);
const tabIndex = ref(0);
const tabId = ref("");
const router = useRouter();
const agencyList = ref([]); //代办列表
const hotlineTabList = ref([]); //热线代办列表
const heatingTabList = ref([]); //供热代办列表
console.log(this)
onMounted(() => {
  let info = {
    userno: 1000,
    username: "系统管理员",
    deptno: "D7527",
    area: "D0082",
  };
  localStorage.setItem("usreInfo", JSON.stringify(info));
  agencyList.value = [];
  tabList.value = [
    {
      id: 4,
      name: "热线",
    },
    {
      id: 2,
      name: "供热",
    },
    {
      id: 5,
      name: "供水",
    },
  ];
  listData.value = [
    {
      id: 0,
      listName: "开通单",
      url: KaiTongDan,
      furl: "/openOrder",
    },
    {
      id: 0,
      listName: "热线工单",
      url: ReXianGongDan,
      furl: "/",
    },
    {
      id: 0,
      listName: "供水待办",
      url: GongShuiDaiBan,
      furl: "/",
    },
    {
      id: 0,
      listName: "员工通信录",
      url: YuanGongTongXinLu,
      furl: "/userConcat",
    },
    {
      id: 0,
      listName: "一线录入",
      url: YiXianLuRu,
      furl: "/oneInsert",
    },
    {
      id: 0,
      listName: "供热用户查询",
      url: GongReYongHuChaYan,
      furl: "/userSearch",
    },
    {
      id: 0,
      listName: "延期审核",
      url: YanQiShenHe,
      furl: "/delayAgent",
    },
    {
      id: "more",
      listName: "更多",
      url: GengDuo,
      furl: "/moreList",
    },
  ];
  infoData.value = [
    {
      id: 0,
      text: "关于青岛热线",
    },
    {
      id: 1,
      text: "青岛水务青岛水务青岛水务青岛水务",
    },
  ];
  getMenu();
  getHotlineTabList();
  getHeatingTabList();
});

/**
 * 获取首页菜单数据
 */
const getMenu = () => {
  service({
    url: GETMENU,
    method: "get",
    params: {
      userno: JSON.parse(localStorage.getItem("usreInfo")).userno, //"1000",
    },
  }).then((res) => {
    console.log(res.data);
  });
};
/**
 * 获取tab 热线数据列表
 */
const getHotlineTabList = () => {
  service({
    url: BILLGROUP,
    method: "get",
    params: {
      userno: JSON.parse(localStorage.getItem("usreInfo")).userno, //"1000",
      deptno: JSON.parse(localStorage.getItem("usreInfo")).deptno,
    },
  }).then((res) => {
    hotlineTabList.value = res.data.data;
    hotlineTabList.value.forEach((item) => {
      if (item.type == 1) {
        (item.url = "hotlineAgent"), (item.img = daiQueRen), (item.id = "0");
      } else if (item.type == 2) {
        (item.url = "hotlineAgent"), (item.img = daiFanKui), (item.id = "1");
      } else if (item.type == 3) {
        (item.url = "hotlineAgent"), (item.img = yiFankui), (item.id = "2");
      } else if (item.type == 4) {
        (item.url = "hotlineAgent"), (item.img = daiShenPi), (item.id = "3");
      }
    });
    agencyList.value = hotlineTabList.value;
  });
};

/**
 * 获取tab 供热数据列表
 */
const getHeatingTabList = () => {
  service({
    url: DELAYEDGTOUP,
    method: "get",
    params: {
      userno: JSON.parse(localStorage.getItem("usreInfo")).userno, //"1000",
      deptno: JSON.parse(localStorage.getItem("usreInfo")).deptno,
    },
  }).then((res) => {
    heatingTabList.value = res.data.data;
    heatingTabList.value.forEach((item) => {
      if (item.type == 1) {
        (item.url = "hotlineAgent"), (item.img = daiQueRen), (item.id = "0");
      } else if (item.type == 2) {
        (item.url = "hotlineAgent"), (item.img = daiFanKui), (item.id = "1");
      } else if (item.type == 3) {
        (item.url = "hotlineAgent"), (item.img = yiFankui), (item.id = "2");
      } else if (item.type == 4) {
        (item.url = "hotlineAgent"), (item.img = daiShenPi), (item.id = "3");
      }
    });
  });
};
/*
 * 切换tab(热线   供热  供水)
 */
const changeTab = (index, id) => {
  tabIndex.value = index;
  tabId.value = id;
};
/**
 * 跳代办
 */
const toAgency = (item) => {
  // router.push(`/${item.url}`);
  router.push({
    path: `/${item.url}`,
    query: {
      item: JSON.stringify(item),
    },
  });
};
/*
 * 跳转页面
 */
const toPages = (item) => {
  router.push(item.furl);
};
</script>
<style scoped lang="scss">
.home {
  padding: 20px;
  box-sizing: border-box;
  background: #f5f5f5;
  height: 100vh;
  .listDox {
    width: 100%;
    padding: 40px 20px 0;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .listItem {
      width: 160px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 40px;
      box-sizing: border-box;

      .itemImg {
        width: 88px;
        height: 88px;
      }
      .listText {
        width: 100%;
        text-align: center;
        font-size: 26px;
        font-weight: bold;
        color: #666666;
        margin-top: 13px;
      }
    }
  }
  .infoBox {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .infoImg {
      width: 70px;
      height: 70px;
    }
    .infoList {
      flex: 1;
      .infoItem {
        display: flex;
        justify-content: space-between;
        padding: 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #e5e5e5;
        &:last-child {
          border: none;
        }

        span {
          font-size: 28px;
          font-weight: 500;
          color: #333333;
        }
      }
    }
  }
  .nav-box {
    padding: 20px 0;
    .nav_content {
      display: flex;
      justify-content: center;
      align-items: center;
      .content {
        position: relative;
        padding: 0 44px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .nav_text {
          font-size: 32px;
          font-weight: 500;
          color: #999999;
        }
        .activeContent {
          font-size: 36px;
          font-weight: bold;
          color: #333333;
        }
        .bt-border {
          position: absolute;
          bottom: 1px;
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
  .tabContentBox {
    width: 100%;
    padding: 0 40px 20px 20px;
    box-sizing: border-box;
    .row {
      display: flex;
      justify-content: space-between;
      padding: 20px 0;
      border-bottom: 1px solid #e5e5e5;
      .left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .rowImg {
          width: 64px;
          height: 64px;
          margin-right: 30px;
        }
        span {
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #333333;
        }
      }
      .right {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .numberSize {
          font-size: 44px;
          font-family: PingFang SC;
          font-weight: 800;
          color: #ff6e6e;
        }
        .unit {
          align-self: flex-end;
          font-size: 20px;
          color: #666666;
          padding-bottom: 10px;
          margin-right: 30px;
        }
        .numberGreen {
          color: #74db3b;
        }
        .numberBlue {
          color: #71b3ff;
        }
      }
    }
  }
}
.card {
  margin-bottom: 20px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
}
.more {
  width: 14px;
  height: 28px;
}
</style>
