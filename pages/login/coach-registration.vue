<template>
  <div>
    <!-- ナビゲーションバー -->
    <b-navbar toggleable="lg" class="header-color">
      <b-navbar-brand style="margin-top: -1%"
        ><div class="title-font">
          <nuxt-link to="/">YourCoach</nuxt-link>
        </div></b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav style="text-align: right; margin-left: 55%">
          <b-nav-item>
            <nuxt-link to="/login/user-login">
              <b-button variant="primary">ログイン</b-button>
            </nuxt-link>
          </b-nav-item>
          <b-nav-item>
            <nuxt-link to="/login/user-registration">
              <b-button variant="primary">新規登録</b-button>
            </nuxt-link>
          </b-nav-item>
          <b-nav-item>
            <nuxt-link to="/login/coach-login">
              <b-button variant="success">コーチログイン</b-button>
            </nuxt-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- 登録フォーム -->
    <div class="main-text">
      <br />
      <br />
      <div class="coach-login-box">
        <h2 style="text-align: center">コーチ新規登録画面</h2>
        <br />
        <div class="mb-3">
          <label class="form-label">メールアドレス</label>
          <input
            v-model="mailAddress"
            type="email"
            class="form-control"
            placeholder="name@example.com"
          />
        </div>
        <div class="mb-3">
          <label class="form-label">コーチ名</label>
          <div class="input-form">
            <input
              v-model="coachName"
              type="text"
              class="form-control"
              placeholder="coach name"
            />
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">パスワード</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            placeholder="password"
          />
        </div>
        <div style="text-align: center">
          <button class="login-button" @click="coachRegistration">
            コーチ新規登録
          </button>
        </div>
      </div>
      <!-- ログイン、登録ページのリンク -->
      <div class="links" style="text-align: center">
        <br />
        ユーザとしてログインする場合は
        <button class="login-button">
          <nuxt-link to="/login/user-login">こちら</nuxt-link></button
        ><br /><br />
        コーチとしてログインする場合は
        <button class="login-button">
          <nuxt-link to="/login/coach-login">こちら</nuxt-link></button
        ><br /><br />
        ユーザの新規登録は
        <button class="login-button">
          <nuxt-link to="/login/user-registration">こちら</nuxt-link></button
        ><br /><br />
        <button class="btn btn-info">
          <nuxt-link to="/">ホームへ戻る</nuxt-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      coachName: '' as string,
      mailAddress: '' as string,
      password: '' as string,
    }
  },
  methods: {
    coachRegistration() {
      this.$store.dispatch('getAccount', {
        name: this.coachName,
        email: this.mailAddress,
        pass: this.password,
        storage: 'coaches' as string,
      })
    },
  },
}
</script>
