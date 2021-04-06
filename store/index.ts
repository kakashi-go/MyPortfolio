import firebase from '@/plugins/firebase'
import 'firebase/storage'
import { variableType, stateType, contractType } from '@/store/types'

const db = firebase.firestore()
export const state = () => ({
  age: 0 as number,
  address: '' as string,
  coachSpecialty: '' as string,
  coachImage: '' as string,
  loginUserName: '' as string,
  loginUserMail: '' as string,
  loginUserPass: '' as string,
  loginUserID: '' as string,
  loginCoachID: '' as string,
  profile: '' as string,
  requestPlan: '' as string,
  targetCoachID: '' as string,
  searchText: '' as string,
  userNum: 0 as number,
  messages: [] as Array<string>,
  contractID: '' as string,
  provider: '' as any,
})
/// /////////////////getters////////////////////
export const getters = {
  getID: (state: stateType) => {
    return state.targetCoachID
  },

  getName: (state: stateType) => {
    return state.loginUserName
  },
  getImage: (state: stateType) => {
    return state.coachImage
  },
  getMail: (state: stateType) => {
    return state.loginUserMail
  },
  getProfile: (state: stateType) => {
    return state.profile
  },
  getSpecialty: (state: stateType) => {
    return state.coachSpecialty
  },
  getAge: (state: stateType) => {
    return state.age
  },
  getAddress: (state: stateType) => {
    return state.address
  },
  getRequestPlan: (state: stateType) => {
    return state.requestPlan
  },
  getTargetCoachID: (state: stateType) => {
    return state.targetCoachID
  },
  getLoginUserID: (state: stateType) => {
    return state.loginUserID
  },
  getSearchText: (state: stateType) => {
    return state.searchText
  },
}
/// /////////////////mutations////////////////////
export const mutations = {
  getCoachID(state: stateType, { email, pass }: variableType) {
    db.collection('coaches')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === email &&
            querySnapshot.docs[index].data().Password === pass
          ) {
            state.targetCoachID = querySnapshot.docs[index].id
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('対象となるコーチが存在しません。')
      })
      .then(() => {
        this.$router.push('/user/user-coach-plan-list')
      })
  },
  changeSpecialty(state: stateType, { specialty, email, pass }: variableType) {
    db.collection('coaches')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === email &&
            querySnapshot.docs[index].data().Password === pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
            db.collection('coaches').doc(state.loginUserID).update({
              CoachSpecialty: specialty,
            })
            state.coachSpecialty = specialty
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
  },
  changeName(state: stateType, { name, email, pass, storage }: variableType) {
    db.collection(storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === email &&
            querySnapshot.docs[index].data().Password === pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
            state.loginUserName = name
            db.collection(storage).doc(state.loginUserID).update({
              Name: name,
            })
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
    db.collection(storage).doc(state.loginUserID).update({
      Name: name,
    })
  },
  changeImage(state: stateType, { image, email, pass }: variableType) {
    db.collection('coaches')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === email &&
            querySnapshot.docs[index].data().Password === pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
            state.coachImage = image
            db.collection('coaches').doc(state.loginUserID).update({
              CoachImage: image,
            })
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
  },
  changeMail(
    state: stateType,
    { email, pass, newEmail, storage }: variableType
  ) {
    db.collection(storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === email &&
            querySnapshot.docs[index].data().Password === pass
          ) {
            firebase.auth().currentUser.updateEmail(newEmail)
            state.loginUserID = querySnapshot.docs[index].id
            state.loginUserMail = newEmail
            db.collection(storage).doc(state.loginUserID).update({
              Email: newEmail,
            })
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
  },
  changeProfile(
    state: stateType,
    { profile, email, pass, storage }: variableType
  ) {
    db.collection(storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === email &&
            querySnapshot.docs[index].data().Password === pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
            db.collection(storage).doc(state.loginUserID).update({
              Profile: profile,
            })
            state.profile = profile
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
  },
  changeAge(state: stateType, { age, email, pass, storage }: variableType) {
    db.collection(storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === email &&
            querySnapshot.docs[index].data().Password === pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
            db.collection(storage).doc(state.loginUserID).update({
              Age: age,
            })
            state.age = age
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
  },
  changeAddress(
    state: stateType,
    { address, email, pass, storage }: variableType
  ) {
    db.collection(storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === email &&
            querySnapshot.docs[index].data().Password === pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
            db.collection(storage).doc(state.loginUserID).update({
              Address: address,
            })
            state.address = address
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
  },
  changeRequestPlan(state: stateType, { plan, email, pass }: variableType) {
    db.collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === email &&
            querySnapshot.docs[index].data().Password === pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
            db.collection('users').doc(state.loginUserID).update({
              RequestPlan: plan,
            })
            state.requestPlan = plan
          }
        })
      })
      .catch((error) => {
        alert(error)
      })
  },
  changePass(
    state: stateType,
    { email, pass, newPass, storage }: variableType
  ) {
    db.collection(storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === email &&
            querySnapshot.docs[index].data().Password === pass
          ) {
            firebase.auth().currentUser.updatePassword(newPass)
            state.loginUserID = querySnapshot.docs[index].id
            db.collection(storage).doc(state.loginUserID).update({
              Password: newPass,
            })
            state.loginUserPass = newPass
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
  },
  makePlan(
    state: stateType,
    { email, pass, name, plan, contents }: variableType
  ) {
    db.collection('coaches')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === email &&
            querySnapshot.docs[index].data().Password === pass
          ) {
            state.loginCoachID = querySnapshot.docs[index].id
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('プラン作成に失敗しました。')
      })
      .then(() => {
        db.collection('coaches')
          .doc(state.loginCoachID)
          .collection('Plans')
          .add({
            CoachName: name,
            PlanName: plan,
            PlanContents: contents,
            PlanReview: 'レビューはまだありません。' as string,
            CoachID: state.loginCoachID,
          })
      })
      .catch((error) => {
        alert(error)
        throw new Error('プラン作成に失敗しました。')
      })
      .then(() => {
        this.$router.push('/coach/coach-make-finished')
      })
  },
  searchCoach(state: stateType, searchWord: string) {
    state.searchText = searchWord
    this.$router.push('/user/user-coach-list')
  },

  contractCoach(
    state: stateType,
    { coachName, planName, contents }: contractType
  ) {
    db.collection('users')
      .doc(state.loginUserID)
      .collection('ContractCoach')
      .add({
        CoachID: state.targetCoachID,
        CoachName: coachName,
        PlanName: planName,
        PlanContents: contents,
        Messages: [] as Array<string>,
      })
      .catch((error) => {
        alert(error)
        throw new Error('コーチ依頼に失敗しました。')
      })
      .then(() => {
        db.collection('coaches')
          .doc(state.targetCoachID)
          .collection('ContractUser')
          .add({
            UserID: state.loginUserID,
            CoachID: state.targetCoachID,
            UserName: coachName,
            PlanName: planName,
            PlanContents: contents,
          })
      })
      .then(() => {
        db.collection('coaches')
          .get()
          .then((querySnapshot) => {
            querySnapshot.docs.forEach((doc, index) => {
              if (querySnapshot.docs[index].id === state.targetCoachID) {
                state.userNum = querySnapshot.docs[index].data().GetUserNum
              }
            })
          })
        state.userNum += 1
        db.collection('coaches')
          .doc(state.targetCoachID)
          .update({ GetUserNum: state.userNum })
      })
      .catch((error) => {
        alert(error)
        throw new Error('コーチ依頼に失敗しました。')
      })
      .then(() => {
        this.$router.push('/user/user-plan-contracted')
      })
  },
  getPostReview(state: stateType, coachID: string) {
    state.targetCoachID = coachID
    this.$router.push('/user/user-review')
  },
  postReview(state: stateType, review: string) {
    db.collection('coaches')
      .doc(state.targetCoachID)
      .collection('Plans')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().CoachID === state.targetCoachID
          ) {
            state.contractID = querySnapshot.docs[index].id
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
      .then(() => {
        db.collection('coaches')
          .doc(state.targetCoachID)
          .collection('Plans')
          .doc(state.contractID)
          .update({
            PlanReview: state.loginUserName + 'さんのレビュー : ' + review,
          })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
  },
  getChat(state: stateType, coachID: string) {
    state.targetCoachID = coachID
    this.$router.push('/user/user-chat')
  },
  Chat(state: stateType, chatContents: Array<string>) {
    db.collection('users')
      .doc(state.loginUserID)
      .collection('ContractCoach')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().CoachID === state.targetCoachID
          ) {
            state.contractID = querySnapshot.docs[index].id
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('対象となるコーチが存在しません。')
      })
      .then(() => {
        db.collection('users')
          .doc(state.loginUserID)
          .collection('ContractCoach')
          .doc(state.contractID)
          .update({
            Messages: firebase.firestore.FieldValue.arrayUnion(chatContents),
          })
      })
      .catch((error) => {
        alert(error)
        throw new Error('メッセージ投稿に失敗しました。')
      })
  },
  async getAccount(state: stateType, userInformation: variableType) {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(
        userInformation.email,
        userInformation.pass
      )
      .catch((error) => {
        alert(error)
        throw new Error('アカウント登録失敗')
      })
      .then(() => {
        if (userInformation.storage === 'users') {
          db.collection('users').add({
            Name: userInformation.name,
            Email: userInformation.email,
            Password: userInformation.pass,
            Profile: '未登録' as string,
            Age: 0 as number,
            Address: '未登録' as string,
            RequestPlan: '未登録' as string,
          })
          state.requestPlan = '未登録' as string
        } else {
          db.collection('coaches').add({
            Name: userInformation.name,
            Email: userInformation.email,
            Password: userInformation.pass,
            Profile: '未登録' as string,
            Age: 0 as number,
            Address: '未登録' as string,
            CoachImage: 'https://firebasestorage.googleapis.com/v0/b/yourcoach-21414.appspot.com/o/no_image.png?alt=media&token=ed66a82f-7412-44aa-9466-900e741da90e' as string,
            CoachSpecialty: '未登録' as string,
            GetUserNum: 0 as number,
          })
          state.coachImage =
            'https://firebasestorage.googleapis.com/v0/b/yourcoach-21414.appspot.com/o/no_image.png?alt=media&token=ed66a82f-7412-44aa-9466-900e741da90e'
          state.coachSpecialty = '未登録' as string
        }
        db.collection(userInformation.storage)
          .get()
          .then((querySnapshot) => {
            querySnapshot.docs.forEach((doc, index) => {
              if (
                querySnapshot.docs[index].data().Email ===
                  userInformation.email &&
                querySnapshot.docs[index].data().Password ===
                  userInformation.pass
              ) {
                state.loginUserID = querySnapshot.docs[index].id
                state.loginUserName = userInformation.name
                state.loginUserMail = userInformation.email
                state.loginUserPass = userInformation.pass
                state.age = 0
                state.address = '未登録'
                state.profile = '未登録'
              }
            })
          })
          .catch((error) => {
            alert(error)
          })
          .then(() => {
            if (userInformation.storage === 'users') {
              this.$router.push('/user/user-profile')
            } else {
              this.$router.push('/coach/coach-profile')
            }
          })
          .catch((error) => {
            alert(error)
          })
      })
  },
  loginTwitter(state: stateType) {
    state.provider = new firebase.auth.TwitterAuthProvider()
    firebase
      .auth()
      .signInWithPopup(state.provider)
      .catch((error) => {
        alert(error)
        throw new Error('ログインに失敗しました。')
      })
      .then(() => {
        this.$router.push('/user/user-profile')
      })
  },
  async login(state: stateType, loginInformation: variableType) {
    await firebase
      .auth()
      .signInWithEmailAndPassword(loginInformation.email, loginInformation.pass)
      .catch((error) => {
        alert(error)
        throw new Error('ログインに失敗しました。')
      })
      .then(() => {
        db.collection(loginInformation.storage)
          .get()
          .then((querySnapshot) => {
            querySnapshot.docs.forEach((doc, index) => {
              if (
                querySnapshot.docs[index].data().Email ===
                  loginInformation.email &&
                querySnapshot.docs[index].data().Password ===
                  loginInformation.pass
              ) {
                state.loginUserMail = loginInformation.email
                state.loginUserPass = loginInformation.pass
                state.loginUserID = querySnapshot.docs[index].id
                state.loginUserName = querySnapshot.docs[index].data().Name
                state.profile = querySnapshot.docs[index].data().Profile
                state.age = querySnapshot.docs[index].data().Age
                state.address = querySnapshot.docs[index].data().Address
                if (loginInformation.storage === 'users') {
                  state.requestPlan = querySnapshot.docs[
                    index
                  ].data().RequestPlan
                } else {
                  state.coachImage = querySnapshot.docs[index].data().CoachImage
                  state.coachSpecialty = querySnapshot.docs[
                    index
                  ].data().CoachSpecialty
                }
              }
            })
          })
          .catch((error) => {
            alert(error)
            throw new Error('ログインに失敗しました。')
          })
      })
      .then(() => {
        if (loginInformation.storage === 'users') {
          this.$router.push('/user/user-profile')
        } else {
          this.$router.push('/coach/coach-profile')
        }
      })
  },
  async deleteAccount(state: stateType, deleteInformation: variableType) {
    await db
      .collection(deleteInformation.storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email ===
              deleteInformation.email &&
            querySnapshot.docs[index].data().Password === deleteInformation.pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
          }
        })
      })
      .then(() => {
        db.collection(deleteInformation.storage).doc(state.loginUserID).delete()
      })
      .then(() => {
        firebase.auth().currentUser.delete()
      })
      .catch((error) => {
        alert(error)
        throw new Error('アカウント削除に失敗しました。')
      })
      .then(() => {
        this.$router.push('/user/user-deleted')
      })
  },
  async logout() {
    await firebase
      .auth()
      .signOut()
      .catch((error) => {
        alert(error)
      })
      .then(() => {
        this.$router.push('/')
      })
  },
}
////////////////////actions////////////////////
export const actions = {
  getAccount({ commit }, { name, email, pass, storage }: variableType) {
    const userInformation = { name, email, pass, storage }
    commit('getAccount', userInformation)
  },
  login({ commit }, { email, pass, storage }: variableType) {
    const loginInformation = { email, pass, storage }
    commit('login', loginInformation)
  },
  logout({ commit }) {
    commit('logout')
  },
  deleteAccount({ commit }, { email, pass, storage }) {
    const deleteInformation = {
      email,
      pass,
      storage,
    }
    commit('deleteAccount', deleteInformation)
  },
}
