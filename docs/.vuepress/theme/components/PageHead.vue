<template>
  <div>
    <div class="page-head">
      <div v-if="getName()">
        <h1 :id="getName()">{{getName()}}</h1>
        <div class="active-meta">
          <div class="post-time" v-if="this.data.date">
            <span class="active-meta-prefix">发布时间:</span>
            <span class="active-meta-post-time">{{this.data.date || ''}}</span>
          </div>
          <div class="translator" v-if="this.data.translator">
            <span class="active-meta-prefix">译者:</span>
            <span v-if="this.data.translatorLink" class="active-meta-read-translator">
              <a :href="this.data.translatorLink" target="_blank">{{this.data.translator || ''}}</a>
            </span>
            <span v-else class="active-meta-read-translator">{{this.data.translator || ''}}</span>
          </div>
          <div class="proofreader" v-if="this.data.proofreader">
            <span class="active-meta-prefix">校对者:</span>
            <span v-if="this.data.proofreaderLink" class="active-meta-read-proofreader">
              <a :href="this.data.proofreaderLink" target="_blank">{{this.data.proofreader || ''}}</a>
            </span>
            <span v-else class="active-meta-read-proofreader">{{this.data.proofreader || ''}}</span>
          </div>
          <div :id="getUrl()" class="read-times leancloud-visitors">
            <span class="active-meta-prefix">阅读次数:</span>
            <span class="active-meta-read-times leancloud-visitors-count"></span>
          </div>
        </div>
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
      return prefix + (this.data.title || "");
    },
    getUrl() {
      if (typeof window === "undefined") {
        return "";
      }
      return window.location.origin + window.location.pathname;
    }
  }
};
</script>

<style lang="stylus">
.page-head {
  max-width: 740px;
  margin: 0 auto;
  padding: 4rem 2.5rem 0rem;

  h1 {
    margin-bottom: 10px;
  }
}

@media (max-width: $MQNarrow) {
  .page-head {
    padding: 4rem 2rem 0rem;
  }
}

@media (max-width: $MQMobileNarrow) {
  .page-head {
    padding: 4rem 1.5rem 0rem;
  }
}

.active-meta {
  color: #aaa;
  font-size: 0.9em;
  display: flex;
  flex-wrap: wrap;

  &>div {
    margin-right: 20px;
    display: flex;
    align-items: center;
  }
}

.active-meta-prefix {
  font-weight: 500;
  color: #4e6e8e;
  display: inline-block;
  margin-right: 5px;
}
</style>
