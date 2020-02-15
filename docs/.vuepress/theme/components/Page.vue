<template>
  <main class="page">
    <div class="page-main">
      <slot name="top" />
      <PageHead />
      <Content class="theme-default-content" />
      <PageEdit />
      <PageNav v-bind="{ sidebarItems }" />

      <slot name="bottom" />
      <Comment />
    </div>
    <div class="page-right"></div>
  </main>
</template>

<script>
import PageEdit from "@theme/components/PageEdit.vue";
import PageNav from "@theme/components/PageNav.vue";
import PageHead from "@theme/components/PageHead.vue";
import Comment from "@theme/components/Comment.vue";

export default {
  components: { PageEdit, PageNav, PageHead, Comment },
  props: ["sidebarItems"]
};
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.page {
  padding-bottom: 2rem;
  display: block;
  position: relative;
  padding-right: 10rem;
}

.page-right {
  position: absolute;
  right: 0;
  top: 4rem;
  width: 10rem;
}

@media (max-width: $MQNarrow) {
  .page-right {
    display: none;
  }

  .page {
    padding-bottom: 2rem;
    display: block;
    position: relative;
    padding-right: 0rem;
  }
}
</style>
