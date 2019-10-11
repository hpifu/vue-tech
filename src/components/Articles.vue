<template>
  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <v-layout align-center justify-center fill-height text-center row wrap>
      <template v-for="(article, i) in articles">
        <v-flex md4 :key="i" px-3 my-3 class="article-cards">
          <v-card class="mx-auto pa-2" height="150" :to="'/article/'+article.id">
            <h2 class="mt-5">{{article.title}}</h2>
            <h3 class="my-5 cards-subtitle">{{article.author}}</h3>
          </v-card>
        </v-flex>
      </template>
    </v-layout>
  </div>
</template>

<style>
.article-cards {
  font-family: "Josefin Sans", sans-serif;
  font-size: 14px;
  color: #333333;
}

.article-cards h2 {
  font-size: 16px;
}

.article-cards h3 {
  font-size: 14px;
}

.cards-subtitle {
  color: #aaaaaa;
}
</style>

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