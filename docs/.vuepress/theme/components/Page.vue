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
    padding-right: 2.5rem;
  }
}
</style>
