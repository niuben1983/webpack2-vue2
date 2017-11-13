<template>
   <div v-show="foo" class="share" @click="hideShare"></div>
</template>

<script>
export default {
  props: ["foo"],
  methods: {
    hideShare() {
      this.$emit("update:foo", false);
    }
  }
};
</script>