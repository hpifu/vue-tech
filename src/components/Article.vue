<template>
  <v-container>
    <h2>{{this.title}}</h2>
    <h3 class="my-5">{{this.author}}</h3>
    <v-layout text-left>
      <div v-html="content" class="helloworld"></div>
    </v-layout>
  </v-container>
</template>



<style scoped lang="scss">
@import url("https://cdn.bootcss.com/bootswatch/3.3.7/united/bootstrap.min.css");
@import url("https://cdn.bootcss.com/highlight.js/9.11.0/styles/github-gist.min.css");
</style>

<script>
import api from "../api";
const marked = require("marked");
import hljs from "highlight.js";

export default {
  beforeMount() {
    hljs.initHighlightingOnLoad();
    // marked.setOptions({
    //   renderer: new marked.Renderer(),
    //   gfm: true,
    //   tables: true,
    //   breaks: true,
    //   pedantic: true,
    //   sanitize: true,
    //   smartLists: true,
    //   smartypants: true
    // });
    marked.setOptions({
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      }
    });

    console.log(this.$route.params.id);
    api.getArticle(
      this.$route.params.id,
      res => {
        console.log(res);
        if (res.status === 204) {
          this.content = "204 NO CONTENT 没有该页面";
        }
        if (res.status === 200) {
          this.title = res.data.title;
          this.author = res.data.author;
          this.content = marked(res.data.content);
          console.log(marked(res.data.content));
          console.log(res.data.content);
        }
      },
      err => {
        console.log(err);
      }
    );
  },
  data() {
    return {
      title: "",
      author: "",
      content: ""
    };
  }
};
</script>


