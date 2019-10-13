<template>
  <v-container>
    <div class="markdown-body">
      <h2>{{title}}</h2>
      <h3 class="mt-5 author">{{author}}&nbsp;&nbsp;{{new Date(ctime).toLocaleString()}}</h3>
      <h4 class="my-5">{{tags}}</h4>
      <div v-html="content" class="text-left"></div>
    </div>
  </v-container>
</template>

<style>
.markdown-body p {
  margin: 0.5rem;
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
import hljs from 'highlight.js/lib/highlight';
import { Component, Prop, Vue, Provide } from 'vue-property-decorator';

import cpp from 'highlight.js/lib/languages/cpp';
hljs.registerLanguage('cpp', cpp);
hljs.registerLanguage('c', cpp);
hljs.registerLanguage('c++', cpp);

import golang from 'highlight.js/lib/languages/go';
hljs.registerLanguage('go', golang);
hljs.registerLanguage('golang', golang);

import swift from 'highlight.js/lib/languages/swift';
hljs.registerLanguage('swift', swift);

import dart from 'highlight.js/lib/languages/dart';
hljs.registerLanguage('dart', dart);

import python from 'highlight.js/lib/languages/python';
hljs.registerLanguage('python', python);
hljs.registerLanguage('py', python);

import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('javascript', javascript);

import bash from 'highlight.js/lib/languages/bash';
hljs.registerLanguage('sh', bash);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('shell', bash);

import makefile from 'highlight.js/lib/languages/makefile';
hljs.registerLanguage('makefile', makefile);
hljs.registerLanguage('Makefile', makefile);

import json from 'highlight.js/lib/languages/json';
hljs.registerLanguage('json', json);

import sql from 'highlight.js/lib/languages/sql';
hljs.registerLanguage('sql', sql);

import markdown from 'highlight.js/lib/languages/markdown';
hljs.registerLanguage('md', markdown);
hljs.registerLanguage('markdown', markdown);

import groovy from 'highlight.js/lib/languages/groovy';
hljs.registerLanguage('groovy', groovy);

import ruby from 'highlight.js/lib/languages/ruby';
hljs.registerLanguage('ruby', ruby);

@Component({})
export default class Article extends Vue {
  @Provide() private title: string = '';
  @Provide() private author: string = '';
  @Provide() private content: string = '';
  @Provide() private utime: string = '';
  @Provide() private ctime: string = '';
  @Provide() private tags: string = '';

  public beforeMount() {
    hljs.initHighlightingOnLoad();
    marked.setOptions({
      highlight(code: any, lang: any) {
        if (lang && lang !== '') {
          return hljs.highlight(lang, code).value;
        } else {
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
          this.title = res.data.title;
          this.author = res.data.author;
          this.utime = res.data.utime;
          this.ctime = res.data.ctime;
          this.tags = res.data.tags.map((i: string) => '#' + i).join('  ');
          this.content = marked(res.data.content);
        }
      },
      (err: any) => {
        // console.log(err);
      },
    );
  }
}
</script>


