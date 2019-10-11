<template>
  <span class="teal--text hlogo-title">{{value}}</span>
</template>

<style>
span.hlogo-title {
  font-family: "Monoton";
  font-size: 1.5rem;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Logo extends Vue {
  @Prop({ default: "title" }) private value!: string;
}
</script>
