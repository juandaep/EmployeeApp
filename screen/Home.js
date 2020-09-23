import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import {Card, FAB} from 'react-native-paper'

const Home=()=> {
    const data = [
        {id:1, name:"Juanda", position:"Web dev"},
        {id:2, name:"Esa", position:"Android dev"},
        {id:3, name:"Putra", position:"iOS dev"},
        {id:4, name:"Jep", position:"web dev"},
        {id:5, name:"Jep", position:"web dev"},
        {id:6, name:"Jep", position:"web dev"},
        {id:7, name:"Jep", position:"web dev"},
        {id:8, name:"Jep", position:"web dev"},
    ]

    const renderList = ((item)=>{
        return(
            <Card style={styles.mycard}>
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
        <View>
            <FlatList
                data={data}
                renderItem={({item})=>{
                   return renderList(item)
                }}
                keyExtractor={item=>`${item.id}`}
            />

            <FAB
                style={styles.fab}
                small={false}
                icon="plus"
                theme={{colors:{accent:"#006aff"}}}
                onPress={() => console.log('Pressed')}
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