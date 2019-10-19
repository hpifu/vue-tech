<template>
  <v-flex xs11 sm10 md8 lg6>
    <v-layout align-center text-center row wrap ma-0 pa-0>
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="$store.state.tag.busy"
        infinite-scroll-distance="10"
      >
        <v-layout align-center justify-center fill-height text-center row wrap ma-0 pa-0>
          <template v-for="(article, i) in $store.state.tag.articles">
            <v-flex xs12 sm12 md6 :key="i" px-3 py-3 class="article-cards">
              <v-card class="mx-auto pa-2" height="200">
                <v-card height="40" flat :to="'/article/'+article.id">
                  <v-layout align-center justify-center fill-height text-center row wrap pa-0 ma-0>
                    <v-flex>
                      <h2 class="ma-0 pa-0">{{article.title}}</h2>
                    </v-flex>
                  </v-layout>
                </v-card>
                <v-card height="40" flat>
                  <v-layout align-center justify-center fill-height text-center row wrap pa-0 ma-0>
                    <v-flex>
                      <template v-for="(tag, i) in article.tags">
                        <v-chip
                          outlined
                          small
                          color="green"
                          class="mx-2 my-0"
                          :key="i"
                          v-if="i < 3"
                          @click="totag(tag)"
                        >#{{tag}}</v-chip>
                      </template>
                    </v-flex>
                  </v-layout>
                </v-card>
                <v-card height="60" flat :to="'/article/'+article.id">
                  <v-layout align-center justify-center fill-height text-center row wrap pa-3 ma-0>
                    <div class="article-desc">{{article.content}}</div>
                  </v-layout>
                </v-card>
                <v-card height="40" flat>
                  <v-layout align-center justify-center fill-height text-center row wrap pa-0 ma-0>
                    <v-flex>
                      <p class="ma-0 pa-0" @click="toauthor(article.authorID)">
                        <v-btn color="green" class="ma-2" outlined x-small fab>
                          <v-avatar size="30">
                            <v-img
                              v-if="article.avatar && loadSuccess"
                              v-on:error="loadSuccess = false"
                              :src="$config.api.cloud + '/avatar/' + article.authorID + '?name=' + article.avatar"
                            ></v-img>
                            <v-icon v-else>mdi-account-circle</v-icon>
                          </v-avatar>
                        </v-btn>
                        {{article.author}}
                      </p>
                    </v-flex>
                    <v-flex>
                      <p class="ma-0 pa-0">{{new Date(article.ctime).toLocaleString()}}</p>
                    </v-flex>
                  </v-layout>
                </v-card>
              </v-card>
            </v-flex>
          </template>
        </v-layout>
      </div>
    </v-layout>
  </v-flex>
</template>

<style>
.article-desc {
  overflow: hidden;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  display: -webkit-box;
  display: box;
  word-break: break-all;
  text-overflow: ellipsis;
  color: grey;
}

.article-cards {
  font-family: "Roboto Condensed", sans-serif;
  font-size: 14px;
  color: #333333;
}

.article-cards h2 {
  font-size: 16px;
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Provide } from 'vue-property-decorator';
import Avatar from '@/components/Avatar.vue';

@Component({
  components: {
    Avatar,
  },
})
export default class Articles extends Vue {
  @Provide() private loadSuccess: boolean = true;

  public totag(tag: string) {
    if (this.$route.name === 'tag' && this.$route.params.tag === tag) {
      return;
    }
    this.$store.commit('tag/reset');
    if (this.$route.name === 'tag') {
      this.$store.dispatch('tag/loadMore', tag);
    }
    this.$router.push('/tag/' + tag);
  }

  public toauthor(authorID: number) {
    if (
      this.$route.name === 'author' &&
      this.$route.params.authorID === authorID.toString()
    ) {
      return;
    }
    this.$store.commit('author/reset');
    if (this.$route.name === 'author') {
      this.$store.dispatch('author/loadMore', authorID);
    }
    this.$router.push('/author/' + authorID);
  }

  public loadMore() {
    this.$store.dispatch('tag/loadMore', this.$route.params.tag);
  }
}
</script>