<template>
  <v-flex xs10 sm10 md8 lg6>
    <v-card :loading="loading" flat pa-0 ma-0 class="fafafa-card">
      <v-layout justify-center fill-height text-center row wrap>
        <div class="markdown-body">
          <h2>{{title}}</h2>

          <h4 class="mt-5 author">
            <avatar disable />
            {{author}}&nbsp;&nbsp;{{ctime ? new Date().toLocaleString() : ''}}
          </h4>
          <template v-for="(tag, i) in tags">
            <v-chip outlined color="green" class="mx-2 my-0" :key="i">#{{tag}}</v-chip>
          </template>
          <v-btn
            v-if="this.$store.state.account.isSignedIn && this.authorID === this.$store.state.account.id"
            class="ma-2"
            outlined
            x-small
            fab
            color="indigo"
            :to="'/edit/' + this.$route.params.id"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <div v-html="content" class="text-left"></div>
        </div>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<style>
.fafafa-card.theme--light.v-card {
  background-color: #fafafa;
}
@import url("../assets/css/md.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/github-gist.min.css");
</style>

<script lang="ts">
import api from '../api';
import marked from 'marked';
import hljs from '../assets/ts/hljs';
import { Component, Prop, Vue, Provide } from 'vue-property-decorator';
import Avatar from './Avatar.vue';

@Component({
  components: {
    Avatar,
  },
})
export default class Article extends Vue {
  @Provide() private title: string = '';
  @Provide() private author: string = '';
  @Provide() private authorID: number = 0;
  @Provide() private content: string = '';
  @Provide() private utime: string = '';
  @Provide() private ctime: string = '';
  @Provide() private tags: string = '';
  @Provide() private loading: boolean = false;

  public beforeMount() {
    marked.setOptions({
      highlight(code: any, lang: any) {
        try {
          return hljs.highlight(lang, code).value;
        } catch (err) {
          return hljs.highlightAuto(code).value;
        }
      },
    });

    this.loading = true;
    api.tech.getArticle(
      this.$route.params.id,
      (res: any) => {
        this.loading = false;
        if (res.status === 204) {
          this.content = '204 NO CONTENT 没有该页面';
        }
        if (res.status === 200) {
          this.title = res.data.title;
          this.authorID = res.data.authorID;
          this.author = res.data.author;
          this.utime = res.data.utime;
          this.ctime = res.data.ctime;
          this.tags = res.data.tags;
          this.content = marked(res.data.content);
        }
      },
      (err: any) => {
        this.loading = false;
        // console.log(err);
      },
    );
  }
}
</script>


