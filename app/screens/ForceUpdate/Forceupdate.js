import React, { Component } from 'react';
import DeviceInfo from 'react-native-device-info'
import { Alert } from 'react-native';

const version = DeviceInfo.getVersion();
console.log('appVersion:', version)  
export class ForceUpdate extends Component {
    /*constructor(){
        super()
    }
    componentDidMount = () => {
        this.checkUpdate()
    }
    checkUpdate = () => {
        DeviceInfo.getSystemVersion()
        // Request last version number from your server
        // And compare with current version.
        // You can save this number in device storage with AsyncStorage
        // At last:
        this.setState({
            checked: true,
            updated: true // Or false
        })
     }*/
     render() {
         /*let {checked, updated} = this.state
         if(checked){
             if(updated) return <App />
             else return <PleaseUpdate />
         }
         else return <Loading />*/
         //DeviceInfo.getSystemVersion()
        //console.log('appVersion:', version.appVersion)   

         Alert.alert(
            'Update ChaiPi?',
            'ChaiPi recommends that you update to the latest version.',
            [
                {text: 'No thanks', style: 'cancel'},
                {text: 'Update!'},
            ],
            {cancelable: false},
         )
        
     }
}


export default ForceUpdate;