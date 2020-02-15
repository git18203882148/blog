<template>
  <main class="page">
    <div class="page-main">
      <PageHead />
      <Content class="theme-default-content" />
      <div class="list-item-content">
        <div class="list-item" v-for="item in list">
          <div class="list-item-title">{{item.title}}</div>
          <div class="list-item-description">{{item.description}}</div>
        </div>
      </div>
    </div>
    <!-- <div class="page-right"></div> -->
  </main>
</template>

<script>
import PageEdit from "@theme/components/PageEdit.vue";
import PageNav from "@theme/components/PageNav.vue";
import PageHead from "@theme/components/PageHead.vue";

export default {
  components: { PageEdit, PageNav, PageHead },
  data() {
    return {
      list: [
        {
          title: "15 万字面试资料",
          description:
            "这是我出版的「前端面试之道」小册的前身，目前小册已经累计卖出了 8000 册了。该面试资料是我耗时半年的心血，内容包含了 JS、浏览器、性能相关、安全知识、框架及计算机基础知识。希望能对你的面试有所帮助。",
          link: ""
        },
        {
          title: "15 万字面试资料",
          description:
            "这是我出版的「前端面试之道」小册的前身，目前小册已经累计卖出了 8000 册了。该面试资料是我耗时半年的心血，内容包含了 JS、浏览器、性能相关、安全知识、框架及计算机基础知识。希望能对你的面试有所帮助。",
          link: ""
        },
        {
          title: "15 万字面试资料",
          description:
            "这是我出版的「前端面试之道」小册的前身，目前小册已经累计卖出了 8000 册了。该面试资料是我耗时半年的心血，内容包含了 JS、浏览器、性能相关、安全知识、框架及计算机基础知识。希望能对你的面试有所帮助。",
          link: ""
        },
        {
          title: "15 万字面试资料",
          description:
            "这是我出版的「前端面试之道」小册的前身，目前小册已经累计卖出了 8000 册了。该面试资料是我耗时半年的心血，内容包含了 JS、浏览器、性能相关、安全知识、框架及计算机基础知识。希望能对你的面试有所帮助。",
          link: ""
        }
      ]
    };
  },
  props: ["sidebarItems"]
};
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.list-item-content {
  padding-top: 0;
  @extend $wrapper;
}

.list-item {
  transition: 0.3s;
  border-radius: 5px;
  padding: 1rem 0;

  .list-item-title {
    font-size: 1.1em;
    color: #3eaf7c;
  }

  .list-item-description {
  }
}

.list-item:hover {
  transition: 0.3s;
  background-color: #e1ecfd;
}

@media (max-width: $MQMobileNarrow) {
  .list-item {
    transition: 0.3s;
    border-radius: 5px;
    padding: 0 0 1rem 0;
  }
}
</style>
