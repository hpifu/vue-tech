<template>
  <span class="cyan--text hlogo-text">{{value}}</span>
</template>

<style>
span.hlogo-text {
  font-family: "Monoton";
  font-size: 1.2rem;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SubLogo extends Vue {
  @Prop({ default: "text" }) private value!: string;
}
</script>