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
  chatID: '' as string,
})
/// /////////////////getters////////////////////
export const getters = {
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
  getAccount(state: stateType, userInformation: variableType) {
    firebase
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
  login(state: stateType, loginInformation: variableType) {
    firebase
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
  getCoachID(state: stateType, coachInformation: variableType) {
    db.collection('coaches')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === coachInformation.email &&
            querySnapshot.docs[index].data().Password === coachInformation.pass
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
  changeSpecialty(state: stateType, spInformation: variableType) {
    db.collection('coaches')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === spInformation.email &&
            querySnapshot.docs[index].data().Password === spInformation.pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
            db.collection('coaches').doc(state.loginUserID).update({
              CoachSpecialty: spInformation.specialty,
            })
            state.coachSpecialty = spInformation.specialty
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
  },
  changeName(state: stateType, nameInformation: variableType) {
    db.collection(nameInformation.storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === nameInformation.email &&
            querySnapshot.docs[index].data().Password === nameInformation.pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
            state.loginUserName = nameInformation.name
            db.collection(nameInformation.storage)
              .doc(state.loginUserID)
              .update({
                Name: nameInformation.name,
              })
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
    db.collection(nameInformation.storage).doc(state.loginUserID).update({
      Name: nameInformation.name,
    })
  },
  changeImage(state: stateType, imageInformation: variableType) {
    db.collection('coaches')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === imageInformation.email &&
            querySnapshot.docs[index].data().Password === imageInformation.pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
            state.coachImage = imageInformation.image
            db.collection('coaches').doc(state.loginUserID).update({
              CoachImage: imageInformation.image,
            })
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
  },
  changeMail(state: stateType, emailInformation: variableType) {
    db.collection(emailInformation.storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === emailInformation.email &&
            querySnapshot.docs[index].data().Password === emailInformation.pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
            state.loginUserMail = emailInformation.newEmail
            db.collection(emailInformation.storage)
              .doc(state.loginUserID)
              .update({
                Email: emailInformation.newEmail,
              })
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
  },
  async changeProfile(state: stateType, profileInformation: variableType) {
    await db
      .collection(profileInformation.storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email ===
              profileInformation.email &&
            querySnapshot.docs[index].data().Password ===
              profileInformation.pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
            db.collection(profileInformation.storage)
              .doc(state.loginUserID)
              .update({
                Profile: profileInformation.profile,
              })
            state.profile = profileInformation.profile
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
  },
  changeAge(state, ageInformation: variableType) {
    db.collection(ageInformation.storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === ageInformation.email &&
            querySnapshot.docs[index].data().Password === ageInformation.pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
            db.collection(ageInformation.storage)
              .doc(state.loginUserID)
              .update({
                Age: ageInformation.age,
              })
            state.age = ageInformation.age
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
  },
  changeAddress(state: stateType, addressInformation: variableType) {
    db.collection(addressInformation.storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email ===
              addressInformation.email &&
            querySnapshot.docs[index].data().Password ===
              addressInformation.pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
            db.collection(addressInformation.storage)
              .doc(state.loginUserID)
              .update({
                Address: addressInformation.address,
              })
            state.address = addressInformation.address
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
  },
  changeRequestPlan(state: stateType, planInformation: variableType) {
    db.collection('users')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === planInformation.email &&
            querySnapshot.docs[index].data().Password === planInformation.pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
            db.collection('users').doc(state.loginUserID).update({
              RequestPlan: planInformation.plan,
            })
            state.requestPlan = planInformation.plan
          }
        })
      })
      .catch((error) => {
        alert(error)
      })
  },
  changePass(state, passInformation: variableType) {
    db.collection(passInformation.storage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email === passInformation.email &&
            querySnapshot.docs[index].data().Password === passInformation.pass
          ) {
            state.loginUserID = querySnapshot.docs[index].id
            db.collection(passInformation.storage)
              .doc(state.loginUserID)
              .update({
                Password: passInformation.newPass,
              })
            state.loginUserPass = passInformation.newPass
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
  },
  makePlan(state: stateType, makePlanInformation: variableType) {
    db.collection('coaches')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().Email ===
              makePlanInformation.email &&
            querySnapshot.docs[index].data().Password ===
              makePlanInformation.pass
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
          .collection('plans')
          .add({
            CoachName: makePlanInformation.name,
            CoachImage: makePlanInformation.image,
            PlanName: makePlanInformation.plan,
            PlanContents: makePlanInformation.contents,
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
  contractCoach(state: stateType, contractInformation: contractType) {
    db.collection('users')
      .doc(state.loginUserID)
      .collection('ContractCoach')
      .add({
        CoachID: state.targetCoachID,
        CoachName: contractInformation.coachName,
        PlanName: contractInformation.planName,
        PlanContents: contractInformation.contents,
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
            UserName: contractInformation.coachName,
            PlanName: contractInformation.planName,
            PlanContents: contractInformation.contents,
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
        state.userNum++
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
  postReview(state: stateType, review: string) {
    db.collection('coaches')
      .doc(state.targetCoachID)
      .collection('plans')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().CoachID === state.targetCoachID
          ) {
            state.chatID = querySnapshot.docs[index].id
          }
        })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
      .then(() => {
        firebase
          .firestore()
          .collection('coaches')
          .doc(state.targetCoachID)
          .collection('plans')
          .doc(state.chatID)
          .update({
            PlanReview: state.loginUserName + 'さんのレビュー:\n' + review,
          })
      })
      .catch((error) => {
        alert(error)
        throw new Error('変更に失敗しました。')
      })
      .then(() => {
        this.$router.push('/user/user-review-posted')
      })
  },
  /////////////////////////////////////
  postMessage(state: stateType, chatContents: Array<string>) {
    //, chatContents: Array<string>) {
    // db.collection('users')
    //   .doc(state.loginUserID)
    //   .collection('ContractCoach')
    //   .doc('U2RQv2aygXrNMMxR1180')
    //   .get((doc) => {
    //     console.log(doc.data())
    //   })

    db.collection('users')
      .doc(state.loginUserID)
      .collection('ContractCoach')
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc, index) => {
          if (
            querySnapshot.docs[index].data().CoachID === state.targetCoachID
          ) {
            state.chatID = querySnapshot.docs[index].id
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
          .doc(state.chatID)
          .update({
            Messages: firebase.firestore.FieldValue.arrayUnion(chatContents),
          })
      })
      .catch((error) => {
        alert(error)
        throw new Error('メッセージ投稿に失敗しました。')
      })
  },
}
////////////////////actions////////////////////
export const actions = {
  getAccount({ commit }, { name, email, pass, storage }: variableType) {
    const userInformation = { name, email, pass, storage }
    commit('getAccount', userInformation)
  },
  getCoachID({ commit }, { email, pass }: variableType) {
    const coachInformation = { email, pass }
    commit('getCoachID', coachInformation)
  },
  login({ commit }, { email, pass, storage }: variableType) {
    const loginInformation = { email, pass, storage }
    commit('login', loginInformation)
  },
  changeName({ commit }, { name, email, pass, storage }: variableType) {
    const nameInformation = { name, email, pass, storage }
    commit('changeName', nameInformation)
  },
  changeImage({ commit }, { image, email, pass }) {
    const imageInformation = { image, email, pass }
    commit('changeImage', imageInformation)
  },
  changeMail({ commit }, { email, pass, newEmail, storage }) {
    const emailInformation = { email, pass, newEmail, storage }
    commit('changeMail', emailInformation)
  },
  changeProfile({ commit }, { profile, email, pass, storage }) {
    const profileInformation = { profile, email, pass, storage }
    commit('changeProfile', profileInformation)
  },
  changeAge({ commit }, { age, email, pass, storage }) {
    const ageInformation = { age, email, pass, storage }
    commit('changeAge', ageInformation)
  },
  changeAddress({ commit }, { address, email, pass, storage }) {
    const addressInformation = { address, email, pass, storage }
    commit('changeAddress', addressInformation)
  },
  changeRequestPlan({ commit }, { plan, email, pass }) {
    const planInformation = { plan, email, pass }
    commit('changeRequestPlan', planInformation)
  },
  changeSpecialty({ commit }, { specialty, email, pass }) {
    const spInformation = { specialty, email, pass }
    commit('changeSpecialty', spInformation)
  },
  changePass({ commit }, { email, pass, newPass, storage }) {
    const passInformation = { email, pass, newPass, storage }
    commit('changePass', passInformation)
  },
  makePlan({ commit }, { email, pass, name, image, plan, contents, fee }) {
    const makePlanInformation = {
      email,
      pass,
      name,
      image,
      plan,
      contents,
      fee,
    }
    commit('makePlan', makePlanInformation)
  },
  searchCoach({ commit }, searchWord: string) {
    commit('searchCoach', searchWord)
  },
  contractCoach({ commit }, { coachName, planName, contents }) {
    const contractInformation = {
      coachName,
      planName,
      contents,
    }
    commit('contractCoach', contractInformation)
  },
  postMessage({ commit }, chatContents: Array<string>) {
    commit('postMessage', chatContents)
    console.log(chatContents)
  },
  postReview({ commit }, review: string) {
    commit('postReview', review)
  },
  deleteAccount({ commit }, { email, pass, storage }) {
    const deleteInformation = {
      email,
      pass,
      storage,
    }
    commit('deleteAccount', deleteInformation)
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
