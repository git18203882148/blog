<template>
  <main class="page">
    <div class="page-main">
      <slot name="top" />

      <Content class="theme-default-content" />
      <PageEdit />
      <PageNav v-bind="{ sidebarItems }" />

      <slot name="bottom" />
    </div>
    <div class="page-right"></div>
  </main>
</template>

<script>
import PageEdit from "@theme/components/PageEdit.vue";
import PageNav from "@theme/components/PageNav.vue";

export default {
  components: { PageEdit, PageNav },
  props: ["sidebarItems"]
};
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.page {
  padding-bottom: 2rem;
  display: flex;
}

.page-right {
  width: 230px;
  padding-top: 60px;
}

@media (max-width: $MQNarrow) {
  .page-right {
    display: none;
  }
}
</style>
