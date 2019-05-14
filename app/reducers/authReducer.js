var initialState = {
  user: null,
  shop: null,
  uid: null,
  cart: [],
  order: [],
  addresses: [],
  phone: '',
  update: 0,
}
export default function reducer(state=initialState, action) {

  switch (action.type) {
    case "AUTH_SET_USER": {
      return {...state, user: action.payload, shop: action.payload.shop}
    }
    case "AUTH_SET_UID": {
      return {...state, uid: action.payload.uid, phone: action.payload.phone}
    }
    case "AUTH_SET_CART": {
      return {...state, cart: action.payload}
    }
    case "AUTH_SET_ADDRESS": {
      return {...state, addresses: action.payload}
    }
    case "AUTH_UPDATE": {
      return {...state, update: state.update}
    }
    case "AUTH_SET_ORDER": {
      return {...state, order: action.payload}
    }
  }

  return state
}
