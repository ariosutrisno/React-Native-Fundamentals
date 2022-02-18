import { StyleSheet, Text, View,Image,SafeAreaView,ScrollView,TextInput,TouchableOpacity, Alert } from 'react-native'
import React,{useState} from 'react'
import * as ImagePicker from 'react-native-image-picker'
import Images from '../../assets'
import {Header} from '../../component'
import queryString  from 'query-string'
import axios from 'axios'
import {useSelector} from 'react-redux'

const EditProduct = ({navigation,route}) => {
    const [productName,setProductName] = useState(route?.params?.title)
    const [desc,setDesc] = useState(route?.params?.desc)
    const [price,setPrice] = useState(route?.params?.price)
    const [img,setImg] = useState(route?.params?.image)
    const [image,setImage] = useState();
    const stateGlobal = useSelector(state=>state)
    const upload = () =>{
        //Open Image Libarary
        ImagePicker.launchImageLibrary(
            {mediaType:'photo',quality:0.5, includeBase64:true},
            response =>{
                if (response.didCancel || response.error) {
                    Alert.alert('ops,batal pilih foto yaaaa')
                } else {
                  if (response?.assets[0]?.fileSize < 1000000) {
                    setImage(response)
                  } else {
                    Alert.alert('Ukuran Gambar yang tidak boleh lebih dari 500kb')
                  }
                }
            }
        )
    }
    const update = async() =>{
      if (
        (productName === '' || productName === route?.params?.title) &&
        (desc === '' || desc === route?.params?.desc) &&
        (productName === '' || productName === route?.params?.price) &&
        image === undefined
      ) {
        Alert.alert('peringatan', 'data tidak boleh kosong')
        return false
      }
      const url = `http://api-test.q.camp404.com/public/api/material/${route?.params?.id}`
      const data = queryString.stringify({
        nama_barang:productName,
        deskripsi:desc,
        harga:price,
        gambar:image? `data:image/jgp;base64,${image?.assets[0]?.base64}` :img,
      })
      await axios({
        method:'patch',
        url:url,
        headers:{
          Authorization:`Bearer ${stateGlobal.access_token}`,
          'Content-Type' : 'application/x-www-form-urlencoded',
        },
        data:data,
      })
      .then(response =>{
        console.log('keluarin isi dari response', response)
        Alert.alert('Berhasil Diubah')
        navigation.goback()
      })
      .catch(error=>{
        console.log(error.response.data)
        Alert.alert('gagal diubah')
      })
    }
  return (
    <SafeAreaView style={styles.page}>
      <Header title={'Edit Product'} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <Text style={styles.label}>Product Name</Text>
          <TextInput style={styles.textInput}
            value={productName}
            onChangeText={setProductName}
          />
          <Text style={styles.label}>Descriptions</Text>
          <TextInput
            style={styles.textarea}
            numberOfLines={3}
            multiline
            textAlignVertical='top'
            value={desc}
            onChangeText={setDesc}
          />
          <Text style={styles.label}>Price</Text>
          <TextInput style={styles.textInput}
          value={price.toString()}
          onChangeText={setPrice}
          />
          <Text style={styles.label}>Photo</Text>
          <TouchableOpacity
            style={styles.uploadImage} onPress={()=>upload()}
          >
            {img? (
              <Image
                source={{uri:image?.assets[0]?.uri || img}}
                resizeMode={'cover'}
                style={styles.previewImage}
              />
            ):(
              <Image source={Images.IPlus} style={styles.plushIcon}/>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSave}
            onPress={()=>update()}
          >
              <Text style={styles.btnSaveText}>update</Text>
          </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditProduct;

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
        marginBottom:8,
      },
      textInput:{
        height:40,
        borderWidth:1,
        borderColor:'#c4c4c4',
        borderRadius:6,
        marginBottom:16,
        paddingHorizontal:8,
      },
      textarea:{
        height: 80,
        borderWidth:1,
        borderColor:'#c4c4c4',
        borderRadius:6,
        marginBottom:16,
        paddingHorizontal:8,
      },
      uploadImage:{
        width:100,
        height:100,
        borderWidth:1,
        borderColor:'#c4c4c4',
        borderRadius: 6,
        justifyContent:'center',
        alignItems:'center',
      },
      plushIcon:{
        width:40,
        height:40,
      },
      previewImage:{
        width:100,
        height:100,
        borderRadius:6,
      },
      btnSave:{
        height:45,
        width: '100%',
        backgroundColor:'#1F8597',
        alignItems: 'center',
        justifyContent:'center',
        borderRadius:8,
        marginTop:32,
      },
      btnSaveText:{
        fontSize:16,
        fontWeight: 'bold',
        color:'#fff',
      }
})