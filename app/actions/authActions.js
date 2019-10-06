import Request from './../utils/request';
import store from './../store';
import {AsyncStorage} from 'react-native';

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
    let state = store.getState();
    if(!state.auth.current_address && res.data.length>0) {
      let address = res.data[0];
      let current_address = {
        address: address.address,
        landmark: address.landmark,
        house: address.house,
        type: address.type,
        lat: address.lat,
        lon: address.lon,
      };
      store.dispatch({type: 'AUTH_SET_CURRENT_ADDRESS', payload: current_address});
      module.exports.getShops();
    }
  })
}

module.exports.setCurrentAddress = async (current_address) => {
  store.dispatch({type: 'AUTH_SET_CURRENT_ADDRESS', payload: current_address});
  await AsyncStorage.setItem('CURRENT_ADDRESS', JSON.stringify(current_address));
  module.exports.getShops();
}

module.exports.loadCurrentAddress = async () => {
  const value = await AsyncStorage.getItem('CURRENT_ADDRESS');
  try {
    var current_address = JSON.parse(value);
    module.exports.setCurrentAddress(current_address);
  } catch (e) {

  }
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

module.exports.getShops = (type=null) => {
  let state = store.getState();
  let query = "";
  if(type == "ALL") type = null;
  if(state.auth.current_address) {
    let {lat, lon} = state.auth.current_address;
    query = `?lat=${lat}&lon=${lon}`;
    if(type) query += `&type=${type}`;
    store.dispatch({type: 'AUTH_SET_SHOPS_LOADING'})
    Request.get('/shop/get'+query)
    .then(res => {
      store.dispatch({type: 'AUTH_SET_SHOPS', payload: res.data})
    })
    .catch(err => console.error(err))
  }

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
