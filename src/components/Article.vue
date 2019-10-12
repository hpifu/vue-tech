<template>
  <v-container>
    <div class="markdown-body">
      <h2>{{this.title}}</h2>
      <h3 class="my-5">{{this.author}}</h3>
      <div v-html="content" class="text-left"></div>
    </div>
  </v-container>
</template>

<style>
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



<script>
import api from "../api";

// import from cdn in /public/index.html
// import hljs from "highlight.js";
// import marked from "marked";

export default {
  beforeMount() {
    hljs.initHighlightingOnLoad();
    marked.setOptions({
      highlight: function(code, lang) {
        if (lang && lang !== "") {
          return hljs.highlight(lang, code).value;
        } else {
          return hljs.highlightAuto(code).value;
        }
      }
    });

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


