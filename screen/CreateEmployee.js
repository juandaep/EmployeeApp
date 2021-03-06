import React, {useState} from 'react';
import { StyleSheet, Text, View, Modal, Alert, KeyboardAvoidingView } from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const CreateEmployee = (navigation)=>{
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [salary, setSalary] = useState("")
    const [picture, setPicture] = useState("")
    const [position, setPosition] = useState("")
    const [modal, setModal] = useState(false)

    //connect to backend
    const submitData = ()=> {
        fetch("http://10.0.2.2:3000/send-data", {
            method:"post",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name, email, phone, salary, picture, position

            })
        })
        .then(res => res.json())
        .then(data=>{
            Alert.alert(`${data.name} is saved successfully`)
            navigation.navigate("Home")
        })
    }

    const pickFromGallery = async ()=>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(granted){
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect:[1, 1],
                quality: 0.5
            })
            if(!data.cancelled){
                let newFile = { 
                    uri:data.uri, 
                    type:`test/${data.uri.split(".")[1]}`, 
                    name:`test.${data.uri.split(".")[1]}`
                }
                handleUpload(newFile)
            }
        }else{
            Alert.alert("You need to give up permission to work")
        }
    }

    const pickFromCamera = async ()=>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(granted){
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect:[1, 1],
                quality: 0.5
            })
            if(!data.cancelled){
                let newFile = { 
                    uri:data.uri, 
                    type:`test/${data.uri.split(".")[1]}`, 
                    name:`test.${data.uri.split(".")[1]}`
                }
                handleUpload(newFile)
            }
        }else{
            Alert.alert("You need to give up permission to work")
        }
    }

    const handleUpload = (image)=>{
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'employeeApp')
        data.append("cloud_name", "juandaep")

        fetch("https://api.cloudinary.com/v1_1/juandaep/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json()).
        then(data=>{
            console.log(data)
            setPicture(data.url)
            setModal(false)
        })
    }

    return(
        <View style={styles.root}>
            <TextInput 
                label='name'
                style={styles.inputStyle}
                value={name}
                theme={theme}
                mode="outlined"
                onChangeText={text => setName(text)}
            />
            <TextInput 
                label='email'
                style={styles.inputStyle}
                value={email}
                theme={theme}
                mode="outlined"
                onChangeText={text => setEmail(text)}
            />
            <TextInput 
                label='phone'
                style={styles.inputStyle}
                value={phone}
                theme={theme}
                keyboardType="number-pad"
                mode="outlined"
                onChangeText={text => setPhone(text)}
            />
            <TextInput 
                label='salary'
                style={styles.inputStyle}
                value={salary}
                theme={theme}
                mode="outlined"
                onChangeText={text => setSalary(text)}
            />
            <TextInput 
                label='position'
                style={styles.inputStyle}
                value={position}
                theme={theme}
                mode="outlined"
                onChangeText={text => setPosition(text)}
            />

            <Button style={styles.inputStyle}
                icon={picture==""?"upload":"check"}
                mode="contained"
                theme={theme} 
                onPress={()=> setModal(true)}>
                Upload Image
            </Button>
            
            <Button style={styles.inputStyle}
                icon="content-save"
                mode="contained"
                theme={theme} 
                onPress={()=> submitData()}>
                Save
            </Button>
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
                    onRequestClose={()=>{
                        setModal(false)
                    }}
                    >
                    <View style={styles.modalView}>
                        <View style={styles.modalButtonView}>
                            <Button 
                                icon="camera" 
                                theme={theme} 
                                mode="contained" 
                                onPress={()=> pickFromCamera()}>
                                    Camera
                            </Button>

                            <Button 
                                icon="image-area" 
                                mode="contained" 
                                theme={theme} 
                                onPress={()=> pickFromGallery()}>
                                    Galery
                            </Button>
                        </View>
                            <Button 
                                theme={theme} 
                                onPress={()=> setModal(false)}>
                                    cancel
                            </Button>
                    </View>
                </Modal>
        </View>
    )
}

const theme = {
    colors:{
        primary:"#006aff"
    }
}

const styles=StyleSheet.create({
    root:{
        flex:1
    },
    inputStyle:{
        margin:5
    },
    modalButtonView:{
        flexDirection:"row",
        justifyContent:"space-around",
        padding:10
    },
    modalView:{
        position:"absolute",
        bottom:2,
        width:"100%",
        backgroundColor:"white"
    }
})

export default CreateEmployee