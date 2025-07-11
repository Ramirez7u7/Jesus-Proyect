import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import {
  useRoute,
  useNavigation,
} from '@react-navigation/native';
import axios from 'axios';

export default function UpdateExpense (){
    const route = useRoute();
    const navigation = useNavigation();
    const {expense} = route.params

    const [data, setData] = useState({})


    const onchange = (target, value) => {
        const nData = data
        nData[target] = value
        setData(nData)
    }


    const updateExpense = async () => {
        try {
            await axios.put(`https://kh0tkmpw-5000.usw3.devtunnels.ms/expenses/update/${expense.id}`, data)

            navigation.navigate("dashboard")
        } catch (error) {
            console.log("Error al actualizar registro ", error)
        }
    }


    return (
            <View style={style.container}>
                    <View style={style.form}>
                        <Text style={style.title}>Actualizar Gasto</Text>

                        <Text style={style.name}>Tipo:</Text>
                        <TextInput onChangeText={(text)=>{onchange("category", text)}} style={style.input} placeholder={expense.category}></TextInput>
                        <Text style={style.name}>Descripción:</Text>
                        <TextInput onChangeText={(text)=>{onchange("description", text)}} style={style.input} placeholder={expense.description}></TextInput>
                        <Text style={style.name}>Monto:</Text>
                        <TextInput onChangeText={(text)=>{onchange("amount", text)}} style={style.input} placeholder={expense.amount}></TextInput>
                        <Text style={style.name}>Fecha:</Text>
                        <TextInput onChangeText={(text)=>{onchange("date", text)}} style={style.input} placeholder={expense.date}></TextInput>
                        
                        <TouchableOpacity onPress={()=>{updateExpense()}} style={style.button}>
                            <Text style={style.button.textButton}>Actualizar</Text>
                        </TouchableOpacity>
<Image
  source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd1-B-UfCXrnU9f8LpG6trLecOhA2jp2auxA&s' }}
  style={{ width: 200, height: 200 }}
/>
                        {/* <TouchableOpacity onPress={()=>{navigation.navigate("dashboard")}}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>*/}
                    </View>
<TouchableOpacity onPress={()=>{updateExpense()}} style={style.button}>
                            <Text style={style.button.textButton}>Actualizar</Text>
                        </TouchableOpacity>
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
        borderRadius: 5,
        fontSize: 15,
        borderColor: "black",
        borderWidth: 1,
        textAlign: "center",
        width: "100%",
        height: "auto"
  },

})