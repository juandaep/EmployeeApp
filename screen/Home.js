import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import {Card, FAB} from 'react-native-paper'

const Home=({navigation})=> {
    const data = [
        {id:"1", name:"Juanda", email:"juanda@gmail.com", salary:"5000000", phone:"081200001111", position:"Web dev", picture:"https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1042&q=80"},
        {id:"2", name:"Esa", email:"esa@gmail.com", salary:"7000000", phone:"081211110000", position:"Mobile Dev", picture:"https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1042&q=80"},
        {id:"3", name:"Putra", email:"putra@gmail.com", salary:"8000000", phone:"081222220000", position:"iOs Dev", picture:"https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1042&q=80"},
        
    ]

    const renderList = ((item)=>{
        // console.log(item, '<<<')
        return(
            <Card style={styles.mycard}
            
            onPress={()=> navigation.navigate("Profile", {item:item})}>
             <View style={styles.cardView}>
                 <Image 
                        style={{width: 60, height:60, borderRadius:50}}
                        source= {{uri:"https://images.unsplash.com/flagged/photo-1578848151039-b8916d7c1c34?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1042&q=80"}}
                 />

                 <View style={{marginLeft:10}}>
                    <Text style={styles.text}>{item.name}</Text>
                    <Text style={styles.text}>{item.position}</Text>
                 </View>
                 
             </View>
            </Card>
        )
    })


    return(
        <View style={{flex:1}}>
            <FlatList
                data={data}
                renderItem={({item}) =>{
                 return renderList(item)   
                }}
                keyExtractor={item=>item.id}
            />

            <FAB onPress={()=> navigation.navigate("Create")}
                style={styles.fab}
                small={false}
                icon="plus"
                theme={{colors:{accent:"#006aff"}}}
                // onPress={() => console.log('Pressed')}
                />
        </View>
             
        
    )
}

const styles = StyleSheet.create({
    mycard:{
        margin:5
    },
    cardView:{
        flexDirection:"row",
        padding:6
    },
    text:{
        fontSize:18
    },
    fab:{
        position: 'absolute',
        margin: 16,
        right : 0,
        bottom: 0
    }
})

export default Home