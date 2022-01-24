<template>
  <div class="form">
    <div class="formBox">
      <!-- 用户信息 -->
      <div class="card">
        <div class="title">
          <span>|</span>
          <span class="titleText">用户信息</span>
        </div>

        <div class="base-info" v-for="(i, index) in infoList" :key="index">
          <div class="base-left">
            <span>{{ i.name }}</span>
          </div>

          <div class="base-right">{{baseInfo[i.value] || '-'}}</div>
        </div>
      </div>

      <!-- 用户信息 -->
      <div class="card">
        <div class="title">
          <span>|</span>
          <span class="titleText">维修信息</span>
        </div>

        <div class="base-info" v-for="(i, index) in wList" :key="index">
          <div class="base-left">
            <span>{{ i.name }}</span>
          </div>

          <div class="base-right">{{baseInfo[i.value] || '-'}}</div>
        </div>
      </div>

      <!-- 用户信息 -->
      <div class="card">
        <div class="title">
          <span>|</span>
          <span class="titleText">维修人员信息</span>
        </div>

        <div class="base-info" v-for="(i, index) in wtList" :key="index">
          <div class="base-left">
            <span>{{ i.name }}</span>
          </div>

          <div class="base-right">{{baseInfo[i.value] || '-'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Dialog } from "vant";
import { reactive, ref, toRefs, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { service } from "@/utils/request";
import { BILLGROUP, HEADINGINFO } from "@/utils/api";

const VanDialog = Dialog.Component;
const router = useRouter();
const state = reactive({
  infoList: [
    {
      name: "用户热号：",
      value: "userid",
    },
    {
      name: "用户姓名：",
      value: "username",
    },
    {
      name: "用户类别：",
      value: "usertype",
    },
    {
      name: "地址：",
      value: "address",
    },
    {
      name: "建筑面积：",
      value: "acreage",
    },
  ],
  wList: [
    {
      name: "换热站：",
      value: "changestation",
    },
    {
      name: "供暖状态：",
      value: "state",
    },
    {
      name: "控制方式：",
      value: "controlway",
    },
    {
      name: "供热站：",
      value: "heatingdepartment",
    },
  ],
  wtList: [
    {
      name: "维修班组：",
      value: "teamname",
    },
    {
      name: "维修人员：",
      value: "repairname",
    },
    {
      name: "分公司：",
      value: "area",
    },
  ],
  baseInfo:{},
  userid: "",
});

let { infoList, wList, wtList, userid, baseInfo } = toRefs(state);

onMounted(() => {
  state.userid = useRoute().query.userid;
  getDetail(state.userid);
});

const getDetail = (userid) => {
  service({
    url: HEADINGINFO,
    method: "get",
    params:{
      userid
    },
  }).then((res) => {
    state.baseInfo = res.data.data[0];
    // listData.value = res.data.data;
  });
};
</script>

<style lang="scss" scoped>
.form {
  padding: 20px 0 0;
  box-sizing: border-box;
  background: #f5f5f5;
  height: 100vh;
  :deep(.van-field) {
    padding-left: 10px;
  }
  .formBox {
    padding: 0 20px 158px;
  }
}
.card {
  margin-bottom: 20px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 0 20px 20px;
  box-sizing: border-box;
  .title {
    padding: 20px;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #6fb2ff;
    .titleText {
      margin-left: 20px;
    }
  }

  @mixin flex {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .base-info {
    @include flex;
    margin-bottom: 25px;
    margin-top: 5px;
    padding-left: 30px;
    .base-left {
      min-width: 200px;
      @include flex;
      color: #666666;
      span {
        font-size: 28px;
        padding-right: 35px;
      }
    }
    .base-right {
      font-size: 28px;
    }
  }
}
</style>
