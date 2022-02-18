import { StyleSheet, Text, View, SafeAreaView,Image,TouchableOpacity,Linking,Alert } from 'react-native'
import React, {useCallback} from 'react'
import {Header} from '../../component'
import Images from '../../assets'
import {useDispatch} from 'react-redux'
import {removeValue} from '../../localStorage'
const mapLink = 'https://goo.gl/maps/GbfDgYeVpMapYKAh9'

const Setting = ({navigation}) => {
    const dispatch = useDispatch();
    const logout = () =>{
        dispatch({
            type: 'SET_LOGOUT',
        })
        removeValue('user')
        navigation.replace('Login')
    }
    const mapRedirect = useCallback(async() =>{
        // Checking if the link is supported for this with custom URL scheme.
        const supported = await Linking.canOpenURL(mapLink)
        if (supported) {
            //Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by one browser in the mobile
            await Linking.openURL(mapLink)
        } else{
            Alert.alert(`Don't know how to open this URL : ${mapLink}`)
        }
    },[])
    return (
        <SafeAreaView style={styles.page}>
            <Header title={'Setting'} />
            <View style={styles.container}>
                <Text style={styles.label}>List Setting</Text>
                <TouchableOpacity
                    style={styles.itemSeting}
                    onPress={()=> navigation.navigate('AddProduct')}
                >
                    <Text style={styles.itemSettingText}>Add Products</Text>
                    <Image source={Images.IRight} style={styles.rightIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.itemSeting}
                    onPress={mapRedirect}
                >
                    <Text style={styles.itemSettingText}>Store Location</Text>
                    <Image source={Images.IRight} style={styles.rightIcon} />
                </TouchableOpacity>
            </View>
            <View style={styles.btnWrapper}>
                <TouchableOpacity style={styles.btnLogout}
                    onPress={()=>logout()}>
                    <Text style={styles.btnLogoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Setting

const styles = StyleSheet.create({
    page:{
        flex:1,
        backgroundColor:'#fff',
    },
    container:{
        flex:1,
        backgroundColor:'#fff',
        padding:16,
    },
    label:{
        fontSize:16,
        fontWeight:'bold',
        color:'#2F2E41',
        marginBottom:32,
    },
    itemSeting:{
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingBottom:8,
        paddingTop:16,
        borderBottomWidth:1,
        borderBottomColor:'#F2F2F2',
    },
    rightIcon:{
        height:16,
        width:16,
    },
    itemSettingText:{
        fontSize:13,
        fontWeight:'bold',
        color:'#2F2E41',
    },
    btnWrapper:{
        padding:16,
    },
    btnLogout:{
        height:45,
        width: '100%',
        backgroundColor:'#D46852',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,
    },
    btnLogoutText:{
        fontSize:16,
        fontWeight: 'bold',
        color: '#fff',
    }
})