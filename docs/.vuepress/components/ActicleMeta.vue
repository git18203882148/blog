<template>
  <div>
    <h1 :id="getName()">
      <a :href="getName('#')" class="header-anchor">#</a>
      {{getName()}}
    </h1>
    <div class="active-meta">
      <div class="post-time" v-if="this.data.date">
        <span class="active-meta-prefix">发布时间:</span>
        <span class="active-meta-post-time">{{this.data.date || ''}}</span>
      </div>
      <div class="read-times" v-if="this.data.times">
        <span class="active-meta-prefix">阅读次数:</span>
        <span class="active-meta-read-times">{{this.data.times || ''}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    data() {
      return this.$page.frontmatter;
    }
  },
  methods: {
    getName(prefix = "") {
      return prefix + this.data.title;
    }
  }
};
</script>

<style lang="stylus">
.active-meta {
  color: #aaa;
  font-size: 0.9em;
  display: flex;
}

.active-meta-prefix {
  font-weight: 500;
  color: #4e6e8e;
}

.post-time, .read-times {
  display: flex;
  align-items: center;
  flex: 1;
}
</style>
