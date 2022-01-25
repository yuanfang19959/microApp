<template>
  <el-container class="layout-container-demo">
    <el-aside width="200px" style="background-color: #545c64 !important">
      <el-scrollbar>
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
        >
          <el-sub-menu
            :index="String(idx)"
            v-for="(submenu, idx) in bigDick"
            :key="idx"
          >
            <template #title>
              {{ submenu.title }}
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="`${idx}-${index}`"
                @click="goPage(menuItem)"
                v-for="(menuItem, index) in submenu.list"
                :key="index"
                >{{ menuItem.title }}</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header class="el-header">
        <div>微前端</div>
        <div>当前数据:<span style="color:red">{{ store.getters.getMsg || '-'}}</span><el-button @click="sendMsg">发送消息</el-button></div>
        
      </el-header>
      <el-main>
        <el-scrollbar>
          <div id="reactContainer"></div>
          <div id="vueContainer"></div>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
// import { Menu as IconMenu } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import acitons from "../qiankunState";

const bigDick = [
  {
    title: "微应用-1",
    list: [
      { title: "微应用-首页", path: "/app-vue/" },
      { title: "微应用-其他页面", path: "/app-vue/ass" },
    ],
  },
  {
    title: "微应用-2",
    list: [
      { title: "微应用-2-首页", path: "/app-react/" },
      { title: "微应用-2-其他页面", path: "/app-react/kapa" },
    ],
  },
];
const store = useStore();

const router = useRouter();
const goPage = ({ path }) => {
  router.push(path);
};

const sendMsg = () => {
  acitons.setGlobalState({msg: "来自主框架的新消息"});
}
</script>

<style lang="scss">
.layout-container-demo {
  .el-header {
    position: relative;
    background-color: #b3c0d1;
    color: var(--el-text-color-primary);
    display: flex;
    justify-content: space-between;
    div {
      font-size: 16px;
      color: #fff;
      align-items: center;
      vertical-align: middle;
      line-height: 60px;
    }
  }
  .el-aside {
    width: 240px;
    background: #545c64;
    height: 100vh;
    color: var(--el-text-color-primary);
    background: #fff !important;
    border-right: solid 1px #e6e6e6;
    box-sizing: border-box;
  }
  .el-menu {
    border-right: none;
  }
  .el-main {
    padding: 0;
  }
  .toolbar {
    position: absolute;
    display: inline-flex;
    align-items: center;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
  }
}
</style>
