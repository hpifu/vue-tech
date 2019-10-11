<template>
  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <v-card flat outlined width="100%" class="py-10 px-12">
      <template v-for="(article, i) in articles">
        <v-list-item three-line :key="i" :to="'/article/'+article.id">
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">{{article.title}}</v-list-item-title>
            <v-list-item-subtitle>
              {{article.author}}
              {{article.id}}
            </v-list-item-subtitle>
            <v-list-item-subtitle>{{article.title}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-card>
  </div>
</template>

<script>
export default {
  methods: {
    loadMore() {
      this.busy = true;
      if (this.$store.state.article.done) {
        this.busy = false;
        return;
      }
      this.$store.dispatch("article/loadMore", () => {
        this.busy = false;
      });
    }
  },
  computed: {
    articles: {
      get() {
        return this.$store.state.article.articles;
      },
      set(articles) {
        this.$store.commit("article/setAncients", articles);
      }
    }
  },
  data() {
    return {
      busy: false
    };
  }
};
</script>