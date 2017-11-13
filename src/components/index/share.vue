<template>
   <div v-show="isShow" class="share" @click="hideShare"></div>
</template>

<script>
export default {
  props: ["isShow"],
  methods: {
    hideShare() {
      this.$emit("hide");
    }
  }
};
</script>