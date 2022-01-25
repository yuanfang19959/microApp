<template>
  <el-container class="layout-container-demo">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-scrollbar>
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
        >
          <el-sub-menu :index="String(idx)" v-for="(submenu, idx) in bigDick" :key="idx">
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
      <el-header style="text-align: right; font-size: 12px"> 
        当前数据{{store.getters.getUser}}
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

const bigDick = [
  {
    title: "子系统-1",
    list: [
      { title: "子系统-首页", path: "/app-vue/" },
      { title: "子系统-其他页面", path: "/app-vue/ass" },
    ],
  },
  {
    title: "子系统-2",
    list: [
      { title: "子系统-2-首页", path: "/app-react/" },
      { title: "子系统-2-其他页面", path: "/app-react/kapa" },
    ],
  },
];
const store = useStore();

const router = useRouter();
const goPage = ({path}) => {
  router.push(path)
}
</script>

<style lang="scss">
.layout-container-demo {
  .el-header {
    position: relative;
    background-color: #b3c0d1;
    color: var(--el-text-color-primary);
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
