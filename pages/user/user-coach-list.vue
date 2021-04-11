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
    <!-- 検索ボックス -->
    <br />
    <div class="coach-search-box">
      <label class="form-label"
        ><span style="font-size: 1.5em">コーチ検索ワード</span></label
      >
      <div class="input-form">
        <input
          v-model="keyword"
          type="text"
          class="form-control"
          placeholder="検索ワード"
        />
      </div>
    </div>
    <br />
    <!-- コーチ一覧 -->
    <div v-for="coach in filteredCoaches" :key="coach.index">
      <div
        class="card"
        style="
          max-width: 50%;
          margin: 3em auto;
          box-shadow: 0 0 0.2em 0 grey;
          border-radius: 0.4em;
        "
      >
        <div class="row no-gutters">
          <div class="col-md-4 my-auto">
            <img :src="coach.image" class="img-box" />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">コーチの氏名</h5>
              <div class="profile-box2">
                {{ coach.name }}
              </div>
              コーチの年齢 <br />
              <div class="profile-box2">
                {{ coach.age }}
              </div>
              コーチの住所 <br />
              <div class="profile-box2">
                {{ coach.address }}
              </div>
              コーチのプロフィール <br />
              <div class="profile-box2">
                {{ coach.profile }}
              </div>
              <button
                class="btn btn-success mt-3"
                @click="doGetCoachID(coach.email, coach.pass)"
              >
                コーチのプランを見る
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import firebase from '@/plugins/firebase'
import { coachType } from '@/store/types'
export default {
  data: () => ({
    keyword: '' as any,
    addKeyword: '' as any,
    coaches: [] as Array<coachType>,
    searchWord: '' as any,
  }),
  computed: {
    getSearchText: {
      get() {
        return this.$store.getters.getSearchText
      },
    },
    filteredCoaches() {
      const cutoutCoaches = [] as Array<coachType>
      if (this.getSearchText !== '') {
        this.keyword = this.getSearchText
      }
      this.coaches.forEach((value) => {
        if (
          value.name.includes(this.keyword) &&
          (value.name.includes(this.addKeyword) ||
            value.address.includes(this.addKeyword) ||
            value.age.includes(this.addKeyword) ||
            value.profile.includes(this.addkeyword))
        ) {
          cutoutCoaches.push(value)
        }
      })
      return cutoutCoaches
    },
  },
  created() {
    const db = firebase.firestore()
    const dbCoach = db.collection('coaches')
    dbCoach.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const coachData = doc.data()
        const pushCoach: coachType = {
          name: coachData.Name ? coachData.Name : '未登録',
          image: coachData.CoachImage ? coachData.CoachImage : '未登録',
          age: coachData.Age ? coachData.Age : 0,
          address: coachData.Address ? coachData.Address : '未登録',
          profile: coachData.Profile ? coachData.Profile : '未登録',
          email: coachData.Email ? coachData.Email : '',
          pass: coachData.Password ? coachData.Password : '',
        }
        this.coaches.push(pushCoach)
      })
    })
  },
  methods: {
    doGetCoachID(coachEmail: string, coachPass: string) {
      this.$store.commit('getCoachID', { email: coachEmail, pass: coachPass })
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
