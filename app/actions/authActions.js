module.exports.setUser = (component, data) => {
  component.props.dispatch({type: 'AUTH_SET_USER', payload: data})
}
module.exports.setUserUID = (component, data) => {
  component.props.dispatch({type: 'AUTH_SET_UID', payload: data})
}
