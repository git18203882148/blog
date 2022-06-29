<template>
  <main>
    <div>
      <PageHead />
      <Content class="theme-default-content" />
      <div class="list-item-content">
        <div class="list-item" v-for="item in list">
          <router-link :to="item.link">
            <div class="list-item-title">{{item.title}}</div>
            <div class="list-item-description">{{item.description}}</div>
          </router-link>
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
          title: "代码",
          description:
            "我在这里记录平时开发中遇到的有意思的知识点。",
          link: "/code/preface.html"
        },
        {
          title: "工具",
          description:
            "这里记录着我平时使用的可以提高效率的工具。",
          link: "/tools/preface.html"
        },
        {
          title: "文章",
          description:
            "有兴趣可以点开看看。",
          link: "/write/preface.html"
        },
       /* {
          title: "阅读",
          description:
              "“读万卷书，行万里路”，阅读是是扩展知识面最廉价的途径之一。我平时也会阅读一些书籍，这里记录这我的一些读后感。",
          link: "/read/"
        }*/
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
  padding: 1rem;
  cursor: pointer;

  .list-item-title {
    font-size: 1.1em;
    color: #3eaf7c;
    margin-bottom: 5px;
    font-weight: 500;
  }

  .list-item-description {
    color: #606354;
    font-weight: 400;
  }
}

.list-item:nth-child(2n+1) {
  background-color: #f9f9f8;
}

.list-item:hover {
  transition: 0.3s;
  background-color: #e1ecfd;
}

@media (max-width: $MQMobileNarrow) {
  .list-item {
    transition: 0.3s;
    border-radius: 5px;
    padding: 0.5 0.2rem;
  }
}
</style>
