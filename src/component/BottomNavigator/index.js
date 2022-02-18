import React from 'react'
import { StyleSheet,View, TouchableOpacity,Text,Image } from 'react-native'
import Images from '../../assets'

const BottomNavigator = ({state, descriptors, navigation}) =>{
    return (
        <View style={styles.container}>
            {state.routes.map((route,index) => {
                const {options} = descriptors[route.key]
                const label =
                    options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : route.name;

                    const isFocused = state.index === index;
                    const onPress = () => {
                        const event = navigation.emit({
                            type :'tabpress',
                            target : route.key,
                            canPreventDefault : true,
                        })
                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name)
                        }
                    }
                    const onLongPress = () => {
                        navigation.emit({
                            type:'tabLongPress',
                            target: route.key,
                        })
                    }
                    const Icon = () =>{
                        if (label === 'Home') {
                            return isFocused ? (
                                <Image
                                    source={Images.IHome}
                                    style={[styles.active, styles.image]}
                                />
                            ):(
                                <Image source={Images.IHome} style={styles.image} />
                            )
                        }
                        if (label === 'Setting') {
                            return isFocused ? (
                                <Image
                                    source={Images.ISetting}
                                    style = {[styles.active, styles.image]}
                                />
                            ) : (
                                <Image source={Images.ISetting} style={styles.image} />
                            )
                        }
                        return <Image source={Images.IHome} style={styles.image} />
                    }
                    return (
                        <TouchableOpacity
                            key={index}
                            style={styles.btn}
                            onPress={onPress}
                            onLongPress={onLongPress}
                        >
                            <Icon/>
                            <Text style={isFocused ? styles.btnTextActive : styles.btnText}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    )
            })}
        </View>
    )
}
export default BottomNavigator;
const styles = StyleSheet.create({
    container :{
        flexDirection:'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor:'#1F8597',
        height: 63,
    },
    active:{
        tintColor:'#F4A896',
    },
    image:{
        height:24,
        width:24,
    },
    btn:{
        justifyContent:'center',
        alignItems : 'center',
    },
    btnText:{
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
    },
    btnTextActive:{
        fontSize:12,
        fontWeight:'bold',
        color:'#F4A896',
    }
})