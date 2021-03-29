export interface variableType {
  name: string
  newEmail: string
  profile: string
  image: string
  specialty: string
  address: string
  newPass: string
  age: number
  plan: string
  contents: string
  email: string
  pass: string
  storage: string
  coachName: string
  planName: string
  planContents: string
  coachID: string
  userID: string
}

export interface stateType {
  age: number
  address: string
  coachSpecialty: string
  coachImage: string
  loginUserName: string
  loginUserMail: string
  loginUserPass: string
  loginUserID: string
  loginCoachID: string
  profile: string
  requestPlan: string
  targetUserID: string
  targetCoachID: string
  searchText: string
  userNum: number
  messages: Array<string>
  chatID: string
}

export interface coachType {
  image: string
  name: string
  age: number
  address: string
  profile: string
  email: string
  pass: string
}

export interface planType {
  coachName: string
  image: any
  name: string
  contents: string
  review: string
}

export interface makePlanType {
  name: string
  contents: string
  review: string
}

export interface contractType {
  coachName: string
  planName: string
  contents: string
}
