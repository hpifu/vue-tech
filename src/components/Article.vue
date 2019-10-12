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

<script>
import api from "../api";
import marked from "marked";
import hljs from "highlight.js/lib/highlight";
hljs.registerLanguage("go", require("highlight.js/lib/languages/go"));
hljs.registerLanguage("golang", require("highlight.js/lib/languages/go"));
hljs.registerLanguage("swift", require("highlight.js/lib/languages/swift"));
hljs.registerLanguage("dart", require("highlight.js/lib/languages/dart"));
hljs.registerLanguage("python", require("highlight.js/lib/languages/python"));
hljs.registerLanguage("py", require("highlight.js/lib/languages/python"));
hljs.registerLanguage("js", require("highlight.js/lib/languages/javascript"));
hljs.registerLanguage(
  "javascript",
  require("highlight.js/lib/languages/javascript")
);
hljs.registerLanguage("c", require("highlight.js/lib/languages/cpp"));
hljs.registerLanguage("c++", require("highlight.js/lib/languages/cpp"));
hljs.registerLanguage("cpp", require("highlight.js/lib/languages/cpp"));
hljs.registerLanguage("sh", require("highlight.js/lib/languages/bash"));
hljs.registerLanguage("bash", require("highlight.js/lib/languages/bash"));
hljs.registerLanguage("shell", require("highlight.js/lib/languages/bash"));
hljs.registerLanguage(
  "Makefile",
  require("highlight.js/lib/languages/makefile")
);
hljs.registerLanguage(
  "makefile",
  require("highlight.js/lib/languages/makefile")
);
hljs.registerLanguage("json", require("highlight.js/lib/languages/json"));
hljs.registerLanguage("sql", require("highlight.js/lib/languages/sql"));
hljs.registerLanguage(
  "markdown",
  require("highlight.js/lib/languages/markdown")
);
hljs.registerLanguage("md", require("highlight.js/lib/languages/markdown"));
hljs.registerLanguage("groovy", require("highlight.js/lib/languages/groovy"));
hljs.registerLanguage("ruby", require("highlight.js/lib/languages/ruby"));

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
          this.utime = res.data.utime;
          this.ctime = res.data.ctime;
          // this.tags = res.data.tags;
          this.tags = res.data.tags.map(i => "#" + i).join("  ");
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
      content: "",
      utime: "",
      ctime: "",
      tags: ""
    };
  }
};
</script>


