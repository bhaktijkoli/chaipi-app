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

module.exports.getStatusTitle = (order) => {
  if(!order) return "";
  switch (order.status) {
    case 0:
    return "Waiting"
    case 1:
    return "Order is being prepared"
    case 2:
    return "Order is ready"
    case 3:
    return "Order pickedup"
  }
};

module.exports.getStatusNote = (order) => {
  if(!order) return "";
  switch (order.status) {
    case 0:
    return "Waiting for confirmation"
    case 1:
    return "Your order is being prepared"
    case 2:
    return "Your order is ready"
    case 3:
    return "Your order has been pickedup"
  }
};
