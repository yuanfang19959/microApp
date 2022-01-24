<template>
  <div class="moreBox">
    <div class="business card" v-for="item in listData" :key="item.id">
      <div class="title">{{ item.title }}</div>
      <div class="listDox">
        <div
          class="listItem"
          v-for="val in item.child"
          :key="item.id"
          @click="toPages(item)"
        >
          <img :src="val.url" alt="" class="itemImg" />
          <div class="listText">{{ val.listName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { reactive, ref, toRefs, onMounted } from "vue";
import list from "@/assets/list.png";

const router = useRouter();
const listData = ref([]);
onMounted(() => {
  listData.value = [
    {
      id: 0,
      title: "业务办理",
      child: [
        {
          id: 0,
          listName: "开通单",
          url: list,
        },
        {
          id: 0,
          listName: "供热用户查验",
          url: list,
        },
        {
          id: 0,
          listName: "员工通信录",
          url: list,
        },
      ],
    },
    {
      id: 1,
      title: "热线",
       child: [
        {
          id: 0,
          listName: "热线工单",
          url: list,
        },
        {
          id: 0,
          listName: "一线录入",
          url: list,
        },
        {
          id: 0,
          listName: "延期审核",
          url: list,
        },
      ],
    },
    {
      id: 2,
      title: "供水",
       child: [
        {
          id: 0,
          listName: "供水待办",
          url: list,
        },
        {
          id: 0,
          listName: "供水已办",
          url: list,
        },
        {
          id: 0,
          listName: "工单发起",
          url: list,
        },
        {
          id: 0,
          listName: "流程查询",
          url: list,
        },
      ],
    },
  ];
});
</script>

<style lang="scss" scoped>
.moreBox {
  height:100vh;
  padding: 20px;
  box-sizing: border-box;
  background: #f5f5f5;
  .business {
    width: 100%;
    padding: 30px 0;
    box-sizing: border-box;
    .title {
      padding-left: 20px;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #363a44;
    }
    .listDox {
      width: 100%;
      padding: 20px 20px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      .listItem {
        width: 160px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
  }
}
.card {
  margin-bottom: 20px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
}
</style>
