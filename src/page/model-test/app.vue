<template>
  <div>

    <div @click="flagShare = !flagShare" style="width:100%; line-heihgt: 10rem; background:#f00">按钮</div>

    <share :foo.sync="flagShare"></share>
    
  </div>
</template>

<script>
import Vue from "vue";


export default {
  data() {
    return {
        flagShare: false
    };
  },
  computed: {
  },
  methods: {
  },
  components: {
    share
  },
  created() {
  },
  mounted() {
  }
};
</script>