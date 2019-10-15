<template>
  <v-flex xs10 sm10 md10 lg10>
    <v-card :loading="loading" flat pa-0 ma-0 class="fafafa-card">
      <v-alert
        v-model="alert"
        outlined
        dense
        dismissible
        icon="mdi-alert"
        type="error"
      >{{alertMessage}}</v-alert>
      <v-layout text-center row wrap pa-0 ma-0>
        <v-flex md12 text-center>
          <v-layout align-center justify-center text-center row wrap pa-0 ma-0>
            <v-flex md3></v-flex>
            <v-flex md6>
              <v-text-field v-model="title" v-if="titleEdit" @blur="titleEdit = false" autofocus></v-text-field>
              <h2 v-else @click="titleEdit = true">{{title}}</h2>
            </v-flex>
            <v-flex md3>
              <v-btn
                class="ma-2"
                outlined
                x-small
                fab
                color="indigo"
                :to="'/article/' + this.$route.params.id"
              >
                <v-icon>mdi-eye</v-icon>
              </v-btn>
              <UploadBtn />
              <v-btn class="ma-2" outlined x-small fab color="indigo" @click="save">
                <v-icon>mdi-content-save</v-icon>
              </v-btn>
              <v-btn class="ma-2" outlined x-small fab color="error" @click="del">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex md12 mb-5>
          <v-layout align-center justify-center text-center row wrap pa-0 ma-0>
            <v-flex md6>
              <v-text-field v-model="tagstr" v-if="tagEdit" @blur="tagEdit = false" autofocus></v-text-field>
              <v-container v-else @click="tagEdit = true">
                <template v-for="(tag, i) in tags">
                  <v-chip outlined color="green" class="mx-2 my-0" :key="i">#{{tag}}</v-chip>
                </template>
              </v-container>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex md6 class="markdown-body pr-3">
          <codemirror class="text-left" v-model="content" :options="cmOption"></codemirror>
        </v-flex>

        <v-flex md6 class="markdown-body pl-3">
          <!-- <v-card class="pa-3 ma-0 fafafa-card" outlined> -->
          <div
            class="text-left pa-0 ma-0"
            v-html="markedContent"
            background-color="grey lighten-2"
            color="cyan"
          ></div>
          <!-- </v-card> -->
        </v-flex>
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
import axios from 'axios';
import { Component, Prop, Vue, Provide, Watch } from 'vue-property-decorator';
import hljs from '../assets/ts/hljs';
import { codemirror } from 'vue-codemirror';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/lib/codemirror.css';
import UploadBtn from './UploadBtn.vue';
import config from '../configs';
import hrenderer from '../assets/ts/hrenderer';

@Component({
  components: {
    codemirror,
    UploadBtn,
  },
})
export default class Article extends Vue {
  @Provide() private authorID: number = 0;
  @Provide() private title: string = '';
  @Provide() private author: string = '';
  @Provide() private content: string = '';
  @Provide() private markedContent: string = '';
  @Provide() private utime: string = '';
  @Provide() private ctime: string = '';
  @Provide() private tags: string[] = [];
  @Provide() private tagstr: string = '';
  @Provide() private cmOption: any = {
    tabSize: 4,
    styleActiveLine: true,
    lineNumbers: true,
    lineWrapping: true,
    line: true,
    mode: 'text/x-markdown',
    theme: 'default',
  };
  @Provide() private titleEdit: boolean = false;
  @Provide() private tagEdit: boolean = false;
  @Provide() private loading: boolean = false;
  @Provide() private alert: boolean = false;
  @Provide() private alertMessage: string = '';

  @Watch('tagstr')
  public onTagstrChange(val: string) {
    if (val) {
      this.tags = val.split(',').map((x) => x.trim());
    }
  }

  @Watch('content')
  public onContentChange(val: string) {
    if (val) {
      this.markedContent = marked(val, { renderer: hrenderer(this.authorID) });
    }
  }

  public del() {
    this.loading = true;
    api.tech.delArticle(
      { id: this.$route.params.id, token: this.$cookies.get('token') },
      (res: any) => {
        this.loading = false;
        this.$router.push('/');
      },
      (err: any) => {
        this.loading = false;
        this.alert = true;
        if (err.response.status === 400) {
          this.alertMessage = err.response.data;
        } else {
          this.alertMessage = err;
        }
      },
    );
  }

  public save() {
    this.loading = true;
    api.tech.putArticle(
      {
        token: this.$cookies.get('token'),
        tags: this.tags,
        title: this.title,
        content: this.content,
        id: this.$route.params.id,
      },
      (res: any) => {
        if (res.status === 202) {
          // console.log('success');
        }
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
        if (err.response.status === 400 || err.response.status === 403) {
          this.alert = true;
          this.alertMessage = err.response.data;
        } else if (err.response.status === 500) {
          this.alert = true;
          this.alertMessage = '服务器内部错误';
        } else {
          this.alert = true;
          this.alertMessage = err;
        }
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

    api.tech.getArticle(
      this.$route.params.id,
      (res: any) => {
        if (res.status === 204) {
          this.content = '204 NO CONTENT 没有该页面';
        }
        if (res.status === 200) {
          this.authorID = res.data.authorID;
          this.title = res.data.title;
          this.author = res.data.author;
          this.utime = res.data.utime;
          this.ctime = res.data.ctime;
          if (res.data.content) {
            this.content = res.data.content;
            this.markedContent = marked(this.content, {
              renderer: hrenderer(this.authorID),
            });
          }
          if (res.data.tags) {
            this.tags = res.data.tags;
            this.tagstr = this.tags.join(', ');
          }
        }
      },
      (err: any) => {
        this.alert = true;
        this.alertMessage = err;
      },
    );
  }
}
</script>
