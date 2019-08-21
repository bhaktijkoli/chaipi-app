import Request from './../utils/request';
import store from './../store';

module.exports.setUser = (data) => {
  store.dispatch({type: 'AUTH_SET_USER', payload: data})
}
module.exports.setUserUID = (data) => {
  store.dispatch({type: 'AUTH_SET_UID', payload: data})
}
module.exports.setOrder = (data) => {
  store.dispatch({type: 'AUTH_SET_ORDER', payload: data})
}
module.exports.getCart = () => {
  Request.get('/cart/get')
  .then(res => {
    store.dispatch({type: 'AUTH_SET_CART', payload: res.data});
    setTimeout(function () {
      store.dispatch({type: 'AUTH_UPDATE'});
    }, 100);
  })
}
module.exports.getAddress = () => {
  Request.get('/address/get')
  .then(res => {
    store.dispatch({type: 'AUTH_SET_ADDRESS', payload: res.data});
  })
}
module.exports.getCards = () => {
  Request.get('/card/get')
  .then(res => {
    store.dispatch({type: 'AUTH_SET_CARDS', payload: res.data});
  })
}
module.exports.getOrder = () => {
  Request.get('/order/get?active=1')
  .then(res => {
    store.dispatch({type: 'AUTH_SET_ORDER', payload: res.data})
  })
}

module.exports.getFavorites = () => {
  Request.get('/favorite/get')
  .then(res => {
    store.dispatch({type: 'AUTH_SET_FAVORITES', payload: res.data})
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
