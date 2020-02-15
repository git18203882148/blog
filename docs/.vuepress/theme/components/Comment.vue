<template>
  <section class="comment-container" v-show="!commentDisabled">
    <h3>评 论：</h3>
    <div id="vcomments"></div>
  </section>
</template>


<script>
const headPageList = require("../../config/nav")
  .filter(i => i.link)
  .map(j => j.link);
export default {
  name: "Valine",
  data() {
    return {
      commentDisabled: this.isCommentDisabled()
    };
  },
  mounted: function() {
    const Valine = require("valine");
    if (typeof window !== "undefined") {
      this.window = window;
      window.AV = require("leancloud-storage");
    }
    this.valine = new Valine();
    this.initValine();
  },
  watch: {
    $route(to, from) {
      if (from.path != to.path) {
        this.commentDisabled = this.isCommentDisabled();
        this.initValine();
      }
    }
  },
  methods: {
    isCommentDisabled() {
      try {
        return headPageList.some(item => location.pathname.endsWith(item));
      } catch (e) {
        return false;
      }
    },
    initValine() {
      let path = "";
      try {
        path = location.origin + location.pathname;
      } catch (e) {}

      this.valine.init({
        el: "#vcomments",
        appId: "PzJwckatlgGYxh6kPutyuQCa-gzGzoHsz", // your appId
        appKey: "RDEKm8HVVbQBN8Wp9wpxidpC", // your appKey
        notify: false,
        verify: true,
        path: path,
        visitor: true,
        avatar: "",
        placeholder: "write here"
      });
    }
  }
};
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.comment-container {
  padding-top: 0;
  @extend $wrapper;
}
</style>