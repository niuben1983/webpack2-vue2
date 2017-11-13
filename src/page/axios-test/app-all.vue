<template>
  <div>
    <ul class="axios_tab">
        <li :class="{active:ACTIVE == 0}" @click="tab(0)">测评</li>
        <li :class="{active:ACTIVE == 1}" @click="tab(1)">新闻</li>
    </ul>  
    <ul class="axios_content">
        <li v-for="item in contentDate">
            {{ item.shortTitle }}
        </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import "../../css/base.css";
import "../../css/index.css";
const api = "/api/list.json";
const apiNews = "/api/news.json";

export default {
  data() {
    return {
      list: [],
      news: [],
      contentDate: [],
      ACTIVE: 0
    };
  },
  computed: {},
  methods: {
    fetchData() {
      return axios.get(api);
    },
    fetchNews() {
      return axios.get(apiNews);
    },
    fetchAll() {
      axios.all([this.fetchData(), this.fetchNews()]).then(
        axios.spread((acct, perms) => {
          acct.data.code == 10000 && (this.contentDate = this.list = acct.data.data.newsList);
          perms.data.code == 10000 && (this.news = perms.data.data.newsList);
        })
      );
    },
    tab(index) {
      this.ACTIVE = index;
      this.contentDate = index == 0 ? this.list : this.news;
    }
  },
  components: {},
  created() {
    this.fetchAll();
  },
  mounted() {}
};
</script>