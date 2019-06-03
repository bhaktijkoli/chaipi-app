import Request from './../utils/request';

module.exports.setUser = (component, data) => {
  component.props.dispatch({type: 'AUTH_SET_USER', payload: data})
}
module.exports.setUserUID = (component, data) => {
  component.props.dispatch({type: 'AUTH_SET_UID', payload: data})
}
module.exports.setOrder = (component, data) => {
  component.props.dispatch({type: 'AUTH_SET_ORDER', payload: data})
}
module.exports.getCart = (component) => {
  Request.get('/cart/get')
  .then(res => {
    component.props.dispatch({type: 'AUTH_SET_CART', payload: res.data});
    setTimeout(function () {
      component.props.dispatch({type: 'AUTH_UPDATE'});
    }, 100);
  })
}
module.exports.getAddress = (component) => {
  Request.get('/address/get')
  .then(res => {
    component.props.dispatch({type: 'AUTH_SET_ADDRESS', payload: res.data});
  })
}
module.exports.getOrder = (component) => {
  Request.get('/order/get')
  .then(res => {
    component.props.dispatch({type: 'AUTH_SET_ORDER', payload: res.data})
  })
}
