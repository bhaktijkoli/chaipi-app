var initialState = {
  user: null,
  uid: null,
}
export default function reducer(state=initialState, action) {

  switch (action.type) {
    case "AUTH_SET_USER": {
      return {...state, user: action.payload}
    }
  }

  return state
}
