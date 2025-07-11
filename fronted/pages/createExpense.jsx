import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';

export default function Create() {
    const navigation = useNavigation()
    const [data, setData] = useState({})
 
    const onchange = (target, value) => {
        const nData = data
        nData[target] = value
        setData(nData)
    }

    const onSubmit = async ()=>{
        try {
            await axios.post("https://vxx28nqw-5000.usw3.devtunnels.ms/expenses/create", data)
       
            navigation.navigate("dashboard")
        } catch (error) {
            console.error("Error al crear registro de gasto", error);
        }
    }

    return (
            <View style={style.container}>
                <View style={style.form}>
                     <Text style={style.title}>Crear Gastadero</Text>

                        <Text style={style.name}>Tipo:</Text>
                        <TextInput onChangeText={(text)=>{onchange("category", text)}} style={style.input}></TextInput>
                        <Text style={style.name}>Descripción:</Text>
                        <TextInput onChangeText={(text)=>{onchange("description", text)}} style={style.input}></TextInput>
                        <Text style={style.name}>Total:</Text>
                        <TextInput onChangeText={(text)=>{onchange("amount", text)}} style={style.input}></TextInput>
                        <Text style={style.name}>Fecha:</Text>
                        <TextInput onChangeText={(text)=>{onchange("date", text)}} style={style.input} date></TextInput>
<Image
  source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg5H2e-9C9o0Y-Zlc63H24qL_m6DYnjAgSiQ&s' }}
  style={{ width: 200, height: 200 }}
/><TouchableOpacity style={style.button} onPress={()=>{onSubmit()}} >
                        <Text style={style.button.textButton}>Aceptar</Text>
                    </TouchableOpacity>


                    {/*<TouchableOpacity onPress={()=>{navigation.navigate("client")}}>
                        <Text>Cancelar</Text>    
                    </TouchableOpacity>*/}
                </View>
            </View>
            
    )
}

const style = StyleSheet.create({
    container: {
        width: '100%',             
        padding: 10,
        marginVertical: 8,         
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        fontSize: 16,
        outline: 'none',           
        transition: '0.3s',  
    },

    form: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        padding: 60, 
        borderRadius: "10%",

        
    },

    title:{
        fontSize: 38,
        fontWeight: "bold",
  },

    name: {
    
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 2
    },

    button: {
        backgroundColor: "#ffffff",
        color: "#000000ff",
        borderRadius: 50,
        fontSize: 40,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginBottom: 20,
        elevation: 3,
        alignSelf: 'flex-end'
  },

    input:{
        width: '100%',
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
  },

})