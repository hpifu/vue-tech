<template>
  <codemirror class="text-left" v-model="content" :options="cmOption"></codemirror>
</template>

<script lang="ts">
import { codemirror } from 'vue-codemirror';
import 'codemirror/mode/markdown/markdown.js';
import 'codemirror/lib/codemirror.css';
import {
  Component,
  Prop,
  Vue,
  Provide,
  Watch,
  Model,
  Emit,
} from 'vue-property-decorator';

@Component({
  components: {
    codemirror,
  },
})
export default class CodeMirror extends Vue {
  @Model('change', { type: String }) public readonly content: string = '';
  @Provide() private cmOption: any = {
    tabSize: 4,
    styleActiveLine: true,
    lineNumbers: true,
    lineWrapping: true,
    line: true,
    mode: 'text/x-markdown',
    theme: 'default',
  };

  @Watch('content')
  public change(e: Event) {
    this.$emit('change', this.content);
  }
}
</script>