<template>
  <v-flex xs11 sm10 md8 lg6>
    <v-card :loading="loading" flat pa-0 ma-0 class="fafafa-card">
      <v-layout justify-center fill-height text-center row wrap ma-0 pa-0>
        <v-flex md12 mt-5>
          <h2>{{title}}</h2>
        </v-flex>

        <v-flex md12 mt-5>
          <v-btn @click="toauthor(authorID)" color="green" class="ma-2" outlined x-small fab>
            <v-avatar size="30">
              <v-img
                v-if="avatar && loadSuccess"
                v-on:error="loadSuccess = false"
                :src="$config.api.cloud + '/avatar/' + authorID + '?name=' + avatar"
              ></v-img>
              <v-icon v-else>mdi-account-circle</v-icon>
            </v-avatar>
          </v-btn>
          <span
            class="grey--text"
          >{{author}}&nbsp;&nbsp;{{ctime ? new Date(ctime).toLocaleString() : ''}}</span>
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
          <v-btn
            v-else
            ref="hello"
            class="ma-2"
            text
            icon
            :color="heartColor"
            :class="{'heartBeat': heartClicked}"
            @click="like"
          >
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </v-flex>
        <v-flex md12>
          <template v-for="(tag, i) in tags">
            <v-chip outlined color="green" class="mx-2 my-2" :key="i" @click="totag(tag)">#{{tag}}</v-chip>
          </template>
        </v-flex>
        <div class="markdown-body">
          <div v-html="content" class="text-left mt-3"></div>
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
import api from '@/api';
import marked from 'marked';
import hljs from '@/assets/ts/hljs';
import { Component, Prop, Vue, Provide } from 'vue-property-decorator';
import Avatar from '@/components/Avatar.vue';
import hrenderer from '@/assets/ts/hrenderer';
import axios from 'axios';
import config from '@/configs';

@Component({
  components: {
    Avatar,
  },
})
export default class Article extends Vue {
  @Provide() private loadSuccess: boolean = true;
  @Provide() private title: string = '';
  @Provide() private author: string = '';
  @Provide() private authorID: number = 0;
  @Provide() private content: string = '';
  @Provide() private utime: string = '';
  @Provide() private ctime: string = '';
  @Provide() private tags: string = '';
  @Provide() private avatar: string = '';
  @Provide() private loading: boolean = false;
  @Provide() private heartClicked: boolean = false;
  @Provide() private heartColor: string = 'grey';

  public totag(tag: string) {
    this.$store.commit('tag/reset');
    this.$router.push('/tag/' + tag);
  }

  public toauthor(authorID: number) {
    this.$store.commit('author/reset');
    this.$router.push('/author/' + authorID);
  }

  public like() {
    if (this.heartClicked) {
      return;
    }
    this.heartColor = 'pink';
    this.heartClicked = true;

    axios.post(
      config.api.tech + '/like/' + this.$route.params.id,
      {},
      {
        withCredentials: true,
      },
    );
  }

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
          this.avatar = res.data.avatar;
          this.content = marked(res.data.content, {
            renderer: hrenderer(this.authorID),
          });
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
