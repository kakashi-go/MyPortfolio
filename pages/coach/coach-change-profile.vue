<template>
  <div>
    <!-- ナビゲーションバー -->
    <b-navbar toggleable="lg" class="header-color">
      <b-navbar-brand style="margin-top: -1%"
        ><div class="title-font">YourCoach</div></b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav style="text-align: right; margin-left: 40%">
          <b-nav-item>
            <nuxt-link to="/coach/coach-profile">
              <button class="btn btn-info ml-4 center-block">
                あなたのプロフィール
              </button></nuxt-link
            >
          </b-nav-item>
          <b-nav-item>
            <nuxt-link to="/coach/coach-plan-list">
              <button class="btn btn-info ml-4">
                プラン一覧と作成
              </button></nuxt-link
            >
          </b-nav-item>
          <b-nav-item>
            <nuxt-link to="/coach/coach-profile">
              <button class="btn btn-info ml-4">
                コーチ中のユーザ一覧
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
    <!-- プロフィール変更画面 -->
    <div class="profile-box">
      <div style="text-align: center; font-size: 1.5em">
        プロフィール変更画面
      </div>
      <br />
      氏名
      <div class="profile-box2">{{ getName }}</div>
      変更する氏名
      <input
        v-model="newName"
        class="form-control"
        placeholder="coach name"
        type="text"
      />
      <div style="color: red">{{ errName }}</div>
      <br />
      <button class="btn btn-warning" @click="doChangeName">
        氏名を変更する
      </button>
      <br /><br />
      メールアドレス
      <div class="profile-box2">{{ getMail }}</div>
      変更するメールアドレス<br />
      <input
        v-model="newMail"
        class="form-control"
        placeholder="name@example.com"
        type="mail"
      /><br />
      <div style="color: red">{{ errMail }}</div>
      <button class="btn btn-warning" @click="doChangeMail">
        メールアドレスを変更する
      </button>
      <br /><br />
      自己紹介文
      <div class="profile-box2">{{ getProfile }}</div>
      変更する自己紹介文の内容<br />
      <input
        v-model="newProfile"
        class="form-control"
        placeholder="profile"
        type="text"
      /><br />
      <div style="color: red">{{ errProfile }}</div>
      <button class="btn btn-warning" @click="doChangeProfile">
        自己紹介文を変更する
      </button>
      <br /><br />
      専門スポーツ
      <div class="profile-box2">{{ getSpecialty }}</div>
      変更する専門スポーツの内容<br />
      <input
        v-model="newSpecialty"
        class="form-control"
        placeholder="specialty sport"
        type="text"
      /><br />
      <div style="color: red">{{ errSpecialty }}</div>
      <button class="btn btn-warning" @click="doChangeSpecialty">
        専門スポーツを変更する
      </button>
      <br /><br />
      年齢
      <div class="profile-box2">
        {{ getAge }}
      </div>
      変更する年齢<br />
      <input
        v-model="newAge"
        class="form-control"
        placeholder="age"
        type="text"
      /><br />
      <div style="color: red">{{ errAge }}</div>
      <button class="btn btn-warning" @click="doChangeAge">
        年齢を変更する
      </button>
      <br /><br />
      住所
      <div class="profile-box2">
        {{ getAddress }}
      </div>
      変更する住所<br />
      <input
        v-model="newAddress"
        class="form-control"
        placeholder="address"
        type="text"
      /><br />
      <div style="color: red">{{ errAddress }}</div>
      <button class="btn btn-warning" @click="doChangeAddress">
        住所を変更する</button
      ><br />
      <br />
      変更するパスワード<br />
      <input
        v-model="newPass"
        class="form-control"
        placeholder="password"
        type="password"
      /><br />
      <div style="color: red">{{ errPass }}</div>
      <button class="btn btn-warning" @click="doChangePass">
        パスワードを変更する
      </button>
      <br /><br />
      <button class="btn btn-info">
        <nuxt-link to="/coach/coach-profile">戻る</nuxt-link>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import firebase from '@/plugins/firebase'
import 'firebase/storage'
export default {
  data() {
    return {
      newName: '' as string,
      newImage: '' as string,
      newMail: '' as string,
      newProfile: '' as string,
      newSpecialty: '' as string,
      newAge: 0 as number,
      newAddress: '' as string,
      newPass: '' as string,
      errName: '' as string,
      errMail: '' as string,
      errProfile: '' as string,
      errAge: '' as string,
      errAddress: '' as string,
      errSpecialty: '' as string,
      errPass: '' as string,
    }
  },
  computed: {
    getName: {
      get() {
        return this.$store.getters.getName
      },
    },
    getImage: {
      get() {
        return this.$store.getters.getImage
      },
    },
    getMail: {
      get() {
        return this.$store.getters.getMail
      },
    },
    getProfile: {
      get() {
        return this.$store.getters.getProfile
      },
    },
    getSpecialty: {
      get() {
        return this.$store.getters.getSpecialty
      },
    },
    getAge: {
      get() {
        return this.$store.getters.getAge
      },
    },
    getAddress: {
      get() {
        return this.$store.getters.getAddress
      },
    },
  },
  methods: {
    doChangeName() {
      if (this.newName !== '') {
        this.$store.dispatch('changeName', {
          name: this.newName,
          email: this.$store.state.loginUserMail,
          pass: this.$store.state.loginUserPass,
          storage: 'coaches',
        })
      } else if (this.newName === '') {
        this.errName = '何も入力されていません。'
      } else {
        this.errName = '適切な氏名を入力してください。'
      }
    },
    doChangeImage(e) {
      const file = e.target.files[0]
      const storageRef = firebase.storage().ref(file.name)
      storageRef.put(file).then(() => {
        firebase
          .storage()
          .ref(file.name)
          .getDownloadURL()
          .then((url) => {
            this.newImage = url
          })
          .catch((error) => {
            alert(error)
          })
          .then(() => {
            this.$store.dispatch('changeImage', {
              image: this.newImage,
              email: this.$store.state.loginUserMail,
              pass: this.$store.state.loginUserPass,
            })
          })
      })
    },
    doChangeMail() {
      const tester = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!tester.test(this.newMail)) {
        this.errMail = '適切なメールアドレスを入力してください。'
      } else {
        this.$store.dispatch('changeMail', {
          email: this.$store.state.loginUserMail,
          pass: this.$store.state.loginUserPass,
          newEmail: this.newMail,
          storage: 'coaches',
        })
      }
    },
    doChangeProfile() {
      if (this.newProfile !== '') {
        this.$store.dispatch('changeProfile', {
          profile: this.newProfile,
          email: this.$store.state.loginUserMail,
          pass: this.$store.state.loginUserPass,
          storage: 'coaches',
        })
      } else if (this.newProfile === '') {
        this.errProfile = '何も入力されていません。'
      } else {
        this.errProfile = '適切な氏名を入力してください。'
      }
    },
    doChangeSpecialty() {
      if (this.newSpecialty !== '') {
        this.$store.dispatch('changeSpecialty', {
          specialty: this.newSpecialty,
          email: this.$store.state.loginUserMail,
          pass: this.$store.state.loginUserPass,
        })
      } else if (this.newSpecialty === '') {
        this.errSpecialty = '何も入力されていません。'
      } else {
        this.errSpecialty = '適切な氏名を入力してください。'
      }
    },
    doChangeAge() {
      if (this.newAge !== '') {
        this.$store.dispatch('changeAge', {
          age: this.newAge,
          email: this.$store.state.loginUserMail,
          pass: this.$store.state.loginUserPass,
          storage: 'coaches',
        })
      } else if (this.newAge === '') {
        this.errAge = '何も入力されていません。'
      } else {
        this.errAge = '適切な氏名を入力してください。'
      }
    },
    doChangeAddress() {
      if (this.newAddress !== '') {
        this.$store.dispatch('changeAddress', {
          address: this.newAddress,
          email: this.$store.state.loginUserMail,
          pass: this.$store.state.loginUserPass,
          storage: 'coaches',
        })
      } else if (this.newAddress === '') {
        this.errAddress = '何も入力されていません。'
      } else {
        this.errAddress = '適切な氏名を入力してください。'
      }
    },
    doChangePass() {
      const tester = /^[a-z\d]{6,}$/i
      if (!tester.test(this.newPass)) {
        this.errPass = '6文字以上の適切なパスワードを入力してください。'
      } else {
        this.$store
          .dispatch('changePass', {
            email: this.$store.state.loginUserMail,
            pass: this.$store.state.loginUserPass,
            newPass: this.newPass,
            storage: 'coaches',
          })
          .then(() => {
            this.errPass = 'パスワードを変更しました。'
          })
      }
    },
    doLogout() {
      this.$store.dispatch('logout')
    },
  },
}
</script>
