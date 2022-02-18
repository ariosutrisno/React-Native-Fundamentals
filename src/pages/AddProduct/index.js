import { StyleSheet, Text, View,SafeAreaView,Image,TextInput,ScrollView,Alert, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import * as ImagePicker from 'react-native-image-picker'
import {Header} from '../../component'
import Images from '../../assets'
import axios from 'axios'
import { useSelector } from 'react-redux'
import queryString from 'query-string'


const AddProduct = ({navigation}) => {
  const [image,setImage] = useState()
  const stateGlobal = useSelector(state => state)
  const [productName,setProductName] = useState('')
  const [descriptions,setDescriptions] = useState('')
  const [price,setPrice] = useState('')

  const upload = () => {
    // Open Image Library
    ImagePicker.launchImageLibrary(
      {mediaType:'photo', quality:0.5, includeBase64:true},
      response =>{
        if (response.didCancel || response.error) {
          Alert.alert('oppps,batal memilih foto.')
        }else{
          if (response?.assets[0]?.fileSize < 1000000) {
            setImage(response)
          } else{
            Alert.alert('Ukuran gambar tidak boleh lebih dari 500 kb')
          }
        }
      }
    )
  }

  const save = async ({navigation})=>{
    if (productName === '' || descriptions === '' || price === '') {
      Alert.alert('Peringatan','Data tidak boleh kosong')
      return false
    }
    const url = 'http://api-test.q.camp404.com/public/api/material'
    const data = queryString.stringify({
      nama_barang:productName,
      deskripsi:descriptions,
      harga:price,
      gambar: `data:image/jpg;base64,${image.assets[0].base64}`,
    })
    await axios({
      method:'post',
      url: url,
      headers:{
        Authorization: `Bearer ${stateGlobal.access_token}`,
        'Content-Type' : 'application/x-www-form-urlencoded',
      },
      data:data
    })
    .then(response=>{
      Alert.alert('Berhasil Ditambahkan')
      navigation.goback()
    })
    .catch(error =>{
      Alert.alert('Gagal Ditambahkan',error)
    })
  }
  return (
    <SafeAreaView style={styles.page}>
      <Header title={'Add Product'} />
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
            value={descriptions}
            onChangeText={setDescriptions}
          />
          <Text style={styles.label}>Price</Text>
          <TextInput 
            style={styles.textInput}
            keyboardType={'decimal-pad'}
            value={price}
            onChangeText={setPrice}
            />
          <Text style={styles.label}>Photo</Text>
          <TouchableOpacity
            style={styles.uploadImage} onPress={()=>upload()}
          >
            {image?.assets ?(
              <Image
                source={{uri:image?.assets[0].uri}}
                resizeMode={'cover'}
                style={styles.previewImage}
              />
            ):(
              <Image source={Images.IPlus} style={styles.plushIcon}/>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSave} onPress={()=>save()}>
              <Text style={styles.btnSaveText}>Save</Text>
          </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddProduct

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