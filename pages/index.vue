<template>
  <div>
    <title>Your Coach</title>
    <!-- ナビゲーションバー -->
    <b-navbar toggleable="lg" class="header-color">
      <b-navbar-brand style="margin-top: -1%"
        ><div class="title-font">YourCoach</div></b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse "></b-navbar-toggle>
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
          <b-nav-item>
            <nuxt-link to="/login/coach-registration">
              <b-button variant="success">コーチ新規登録</b-button>
            </nuxt-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <!-- カルーセル -->
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="3000"
      controls
      indicators
    >
      <b-carousel-slide
        caption="自分に最適なコーチを"
        img-src="~@/assets/image/coach.jpg"
      ></b-carousel-slide>
      <b-carousel-slide
        caption="あなたもコーチになれる"
        img-src="~@/assets/image/softball.jpg"
      >
      </b-carousel-slide>
      <div style="color: black">
        <b-carousel-slide
          caption="チャット機能搭載"
          img-src="~@/assets/image/chat.png"
        ></b-carousel-slide>
      </div>
      >
    </b-carousel>
    <div class="main-text2">
      <br />
      <br />
      <!-- メインテキスト -->
      <div id="div01" class="contents">
        <div id="photo01" class="left"></div>
        <div class="right text">
          <h4>多種多様</h4>
          <p>全国からあなたの練習したいスポーツのコーチを探せます。</p>
        </div>
      </div>
      <div id="div02" class="contents">
        <div class="left text">
          <h4>コーチになれる</h4>
          <p>
            コーチを依頼するのみでなく、あなたもコーチになれます。<br />
            チャット機能でコミュニケーションが可能です。
          </p>
        </div>
        <div id="photo02" class="right"></div>
      </div>
      <div id="div03" class="contents">
        <div id="photo03" class="left"></div>
        <div class="right text">
          <h4>スカウトにも</h4>
          <p>
            優秀な人材をあなたのチームにスカウトする、もしくは育ててチームの主力とすることも可能です。
          </p>
        </div>
      </div>
      <!-- コーチのランキング -->
      <div class="row justify-content-center">
        <div class="w-50 mt-5 bg-light">
          <b-card
            title="先週のコーチ依頼数ランキング"
            img-src="~@/assets/image/ranking.png"
            img-alt="ranking"
          >
            <b-card-text style="font-size: 1.5em">
              <br />
              1位:仮<br />
              2位:仮<br />
              3位:仮<br />
              4位:仮<br />
              5位:仮<br />
            </b-card-text>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import firebase from '@/plugins/firebase'
export default {
  data: () => ({
    userNumRank: [0, 0, 0, 0, 0] as Array<number>,
    coachesName: [
      '登録なし',
      '登録なし',
      '登録なし',
      '登録なし',
      '登録なし',
    ] as Array<string>,
  }),
  created() {
    const db = firebase.firestore()
    const dbCoach = db.collection('coaches')
    dbCoach.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const coachData = doc.data()
        this.coachRank.forEach((element) => {})
        // const pushCoach: coachType = {
        //   name: coachData.Name ? coachData.Name : '未登録',
        //   image: coachData.CoachImage ? coachData.CoachImage : '未登録',
        //   age: coachData.Age ? coachData.Age : 0,
        //   address: coachData.Address ? coachData.Address : '未登録',
        //   profile: coachData.Profile ? coachData.Profile : '未登録',
        //   email: coachData.Email ? coachData.Email : '',
        //   pass: coachData.Password ? coachData.Password : '',
        // }
      })
    })
  },
}
</script>
