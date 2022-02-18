import { StyleSheet, Text, View, SafeAreaView, FlatList, RefreshControl, Alert } from 'react-native';
import React, {useState,useEffect} from 'react';
import {Header,ProductCard} from '../../component'
import {useSelector} from 'react-redux'
import axios from 'axios';
const dummy =[
  {
      id:1,
      title:'Product Name',
      desc:'Lorem ipsum is simply dummy text of the printing and typesetting',
      price: '500000',
      image: 'https://www.adidas.co.id/media/catalog/product/cache/3bec5fdb79d91223b1a151be2b21ce8d/f/y/fy4976_sl_ecom.jpg',
  },
  {
      id:2,
      title:'Product Name',
      desc:'Lorem ipsum is simply dummy text of the printing and typesetting',
      price: '500000',
      image: 'https://images.tokopedia.net/img/cache/500-square/VqbcmM/2020/9/24/798331d7-8378-427e-951b-1fd84c0ff663.jpg',
  },
  {
      id:3,
      title:'Product Name',
      desc:'Lorem ipsum is simply dummy text of the printing and typesetting',
      price: '500000',
      image: 'https://cf.shopee.co.id/file/6b314c54c914f55ed283553acb0ba2dc',
  },
  {
      id:4,
      title:'Product Name',
      desc:'Lorem ipsum is simply dummy text of the printing and typesetting',
      price: '500000',
      image: 'https://id-live-05.slatic.net/p/8ec26954360b7c1e57d3d10421f33d38.jpg_720x720q80.jpg_.webp',
  },
  {
      id:5,
      title:'Product Name',
      desc:'Lorem ipsum is simply dummy text of the printing and typesetting',
      price: '500000',
      image: 'https://s2.bukalapak.com/img/77208690752/large/data.jpeg',
  },
]

const Home = () => {
  const stateGlobal = useSelector(state => state)
  const [data,setData] = useState()
  const [refreshing, setRefreshing] = useState(false)

  useEffect(()=>{
    onRefresh();
    return onRefresh();
  },[])
  
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = React.useCallback(()=>{
    setRefreshing(true)
    setData()
    axios.get('http://api-test.q.camp404.com/public/api/material',{
      headers:{Authorization:`Bearer ${stateGlobal.access_token}`},
    })
    .then(response =>{
      let res = response.data
      setData(res.materials)
      wait(2000).then(()=>setRefreshing(false))
    })
    .catch(error =>{
      setRefreshing(false)
      Alert.alert("Gagal Mendapatkan data")
    })
  })
  const deleteProduct = async id => {
    try {
      const DeleteProduct = await axios({
        method:'delete',
        url: `http://api-test.q.camp404.com/public/api/material/${id}`,
        headers:{
          Authorization:`Bearer ${stateGlobal.access_token}`,
          'Content-Type' : 'application/x-www-form-urlencoded',
        },
      })
      if (DeleteProduct.status === 200) {
        onRefresh();
      }
    } catch (error) {
      console.log('liat dh kok eror ga bisa dihpus', error.response.data.message)
      Alert.alert('Gagal menghapus data')
    }
  }
  const renderItem = ({item}) =>(
    <ProductCard
    id={item.id}
    title={item.nama_barang}
    desc={item.deskripsi}
    price={item.harga}
    image={item.gambar}
    deletePress={() => deleteProduct(item.id)}
    />
  );
  return (
    <SafeAreaView style={styles.page}>
        <Header title={'Home'}/>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
          keyExtractor={item=>item.id.toString()}
          ListHeaderComponent={<Text style={styles.label}>List Product</Text>}
          ListFooterComponent={<Text style={styles.footer}/>}
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  page:{
    flex:1,
    backgroundColor:'#FFFFFF',
  },
  container:{
    backgroundColor:'#fff',
    padding:16,
  },
  label:{
    fontSize:16,
    fontWeight:'bold',
    color:'#2F2E41',
    marginBottom:16,
  },
  footer:{
    height:30,
  }
});
