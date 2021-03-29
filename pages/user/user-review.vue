<template>
  <div>
    <!-- ナビゲーションバー -->
    <b-navbar toggleable="lg" class="header-color">
      <b-navbar-brand style="margin-top: -1%"
        ><span class="title-font">YourCoach</span>
        <input
          v-model.trim="searchWord"
          type="text"
          placeholder="コーチ名検索"
          style="margin-left: 10%"
        />
        <button class="btn btn-primary" @click="doSearchCoach">検索</button>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav style="text-align: right; margin-left: 25%">
          <b-nav-item>
            <nuxt-link to="/user/user-profile">
              <button class="btn btn-info">
                あなたのプロフィール
              </button></nuxt-link
            >
          </b-nav-item>
          <b-nav-item>
            <nuxt-link to="/user/user-coach-list">
              <button class="btn btn-info ml-4">
                コーチ一覧とプラン
              </button></nuxt-link
            >
          </b-nav-item>
          <b-nav-item>
            <nuxt-link to="/user/user-contract-list">
              <button class="btn btn-info ml-4">
                コーチ依頼履歴
              </button></nuxt-link
            >
          </b-nav-item>
          <b-nav-item>
            <button class="btn btn-secondary" @click="doLogout">
              ログアウト
            </button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- レビュー投稿画面 -->
    <form style="margin: 2em auto; max-width: 40%">
      <div class="form-group">
        <label>レビュー投稿内容</label>
        <textarea v-model="message" rows="3" class="form-control" />
      </div>
      <button
        class="btn btn-outline-success"
        style="margin-top: 0.3em"
        @click="doPostReview(review)"
      >
        投稿
      </button>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  data: () => ({
    review: '' as string,
  }),
  computed: {
    getSearchText: {
      get() {
        return this.$store.getters.getSearchText
      },
    },
  },
  methods: {
    doPostReview() {
      this.$store.dispatch('postReview', this.review)
    },
    doSearchCoach() {
      this.$store.dispatch('searchCoach', this.searchWord)
    },
    doLogout() {
      this.$store.dispatch('logout')
    },
  },
}
</script>
