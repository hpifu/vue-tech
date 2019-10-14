<template>
  <v-flex xs10 sm10 md10 lg10>
    <v-card :loading="loading" flat pa-0 ma-0 class="editcard">
      <v-alert
        v-model="alert"
        outlined
        dense
        dismissible
        icon="mdi-alert"
        type="error"
      >{{alertMessage}}</v-alert>
      <v-layout text-center row wrap>
        <v-flex md12 text-center>
          <v-layout align-center justify-center text-center row wrap pa-0 ma-0>
            <v-flex md3></v-flex>
            <v-flex md6>
              <v-text-field v-model="title" v-if="titleEdit" @blur="titleEdit = false" autofocus></v-text-field>
              <h2 v-else @click="titleEdit = true">{{title}}</h2>
            </v-flex>
            <v-flex md3>
              <v-btn class="ma-2" outlined x-small fab color="indigo" @click="save">
                <v-icon>mdi-content-save</v-icon>
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
                  <v-chip outlined small color="green" class="mx-2 my-0" :key="i">#{{tag}}</v-chip>
                </template>
              </v-container>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex md6 class="markdown-body pr-3">
          <codemirror class="text-left" v-model="content" :options="cmOption"></codemirror>
        </v-flex>

        <v-flex md6 class="markdown-body pl-3">
          <div
            v-html="markedContent"
            class="text-left"
            background-color="grey lighten-2"
            color="cyan"
          ></div>
        </v-flex>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<style>
.editcard.theme--light.v-card {
  background-color: #fafafa;
}

.markdown-body p {
  margin: 0.5rem;
}

.markdown-body .CodeMirror {
  border: 1px solid #eee;
  height: auto;
}

.markdown-body .CodeMirror {
  font-family: Inconsolata, monospace;
  font-size: 12px;
  background-color: #fafafa;
}

.markdown-body .CodeMirror .cm-comment {
  font-family: Inconsolata, monospace;
  font-size: 12px;
}

.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5 {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.markdown-body pre {
  margin: 0.5rem;
}

.markdown-body .author {
  color: grey;
}

.markdown-body {
  font-family: "Josefin Sans", sans-serif;
  font-size: 14px;
}

.markdown-body pre code::before,
.markdown-body pre code::after {
  content: none;
  letter-spacing: 0em;
}

.markdown-body pre {
  display: block;
  padding: 9.5px;
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.42857143;
  word-break: break-all;
  word-wrap: break-word;
  color: #333333;
  background-color: #f5f5f5;
  border: 1px solid #cccccc;
  border-radius: 4px;
}

.markdown-body code,
.markdown-body kbd,
.markdown-body pre,
.markdown-body samp {
  font-family: Inconsolata, Menlo, Monaco, Consolas, "Courier New", monospace;
}

.markdown-body pre {
  overflow: auto;
}

.markdown-body code {
  box-shadow: none;
  font-size: 85%;
  font-weight: 100%;
}

.markdown-body pre code {
  color: #333;
}

@import url("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/github-gist.min.css");
</style>

<script lang="ts">
import api from '../api';
import marked from 'marked';
import { Component, Prop, Vue, Provide, Watch } from 'vue-property-decorator';
import hljs from '../assets/ts/hljs';
import { codemirror } from 'vue-codemirror';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/lib/codemirror.css';

@Component({
  components: {
    codemirror,
  },
})
export default class Article extends Vue {
  @Provide() private title: string = '标题';
  @Provide() private author: string = '';
  @Provide() private content: string = '';
  @Provide() private markedContent: string = '';
  @Provide() private utime: string = '';
  @Provide() private ctime: string = '';
  @Provide() private tags: string[] = ['tag'];
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
    this.tags = val.split(',').map((x) => x.trim());
  }

  @Watch('content')
  public onContentChange(val: string) {
    this.markedContent = marked(val);
  }

  public save() {
    this.loading = true;
    api.tech.postArticle(
      {
        token: this.$cookies.get('token'),
        tags: this.tags,
        title: this.title,
        content: this.content,
      },
      (res: any) => {
        this.loading = false;
        if (res.status === 201) {
          this.$router.push('/edit/' + res.data.id);
        }
      },
      (err: any) => {
        this.loading = false;
        if (err.response.status === 400) {
          this.alert = true;
          this.alertMessage = err.response.data;
        }
        if (err.response.status === 500) {
          this.alert = true;
          this.alertMessage = '服务器内部错误';
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
  }
}
</script>
