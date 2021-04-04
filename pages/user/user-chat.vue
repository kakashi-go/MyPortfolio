<template>
  <div>
    <!-- ナビゲーションバー -->
    <b-navbar toggleable="lg" class="header-color">
      <b-navbar-brand style="margin-top: -1%"
        ><span class="title-font"
          ><nuxt-link to="/user/user-profile">YourCoach</nuxt-link></span
        >
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
    <!-- チャット投稿画面 -->
    <form style="margin: 2em auto; max-width: 40%">
      <div class="form-group">
        <label>チャット投稿内容</label>
        <textarea v-model="message" rows="3" class="form-control" />
      </div>
      <button
        type="button"
        class="btn btn-outline-success"
        style="margin-top: 1em"
        @click="doChat"
      >
        投稿
      </button>
      <div style="color: green; margin-top: 1em">{{ resultMessage }}</div>
    </form>
    <!-- チャット内容 -->
    <!-- <div v-for="chatContent in chatContents" :key="chatContent.index">
      <div class="profile-box2">{{ chatContent }}<br /></div>
    </div> -->
  </div>
</template>

<script lang="ts">
export default {
  data: () => ({
    talkerName: '' as string,
    resultMessage: '' as string,
    message: '' as string,
    chatContents: [] as Array<string>,
    searchWord: '' as string,
  }),
  computed: {
    getSearchText: {
      get() {
        return this.$store.getters.getSearchText
      },
    },
  },
  created() {
    // dbChat.get().then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     const chatData = doc.data()
    //     const pushChat = {
    //       content: chatData.Message ? chatData.Message : '',
    //     }
    //     this.chatContents.unshift(pushChat)
    //   })
    // })
  },
  methods: {
    doChat() {
      if (this.message === '') {
        this.resultMessage = '何も入力されていません。'
      } else {
        this.chatContents.unshift(this.message)

        console.log(this.chatContents)

        this.$store.commit('Chat', this.chatContents)
        this.message = ''
      }
    },
    doSearchCoach() {
      this.$store.commit('searchCoach', this.searchWord)
    },
    doLogout() {
      this.$store.dispatch('logout')
    },
  },
}
</script>
