import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Dashboard() {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getExpenses();
    }, []);

    const getExpenses = async () => {
        try {
            const res = await axios.get("https://kh0tkmpw-5000.usw3.devtunnels.ms/expenses/get_all");
            const expenses = res.data;
            setData(expenses);
            getTotal(expenses);
        } catch (error) {
            console.log("Error al buscar los gastos ", error);
        }
    };

    const getDate = () => {
        const currentDate = new Date();
        return {
            year: currentDate.getFullYear(),
            month: currentDate.getMonth() + 1,
            day: currentDate.getDate()
        };
    };

    const getTotal = (expenses) => {
        const today = getDate();
        let subtotal = 0;
        for (const expense of expenses) {
            const [year, month] = expense.date.split("/");
            if (parseInt(today.year) === parseInt(year) && parseInt(today.month) === parseInt(month)) {
                subtotal += expense.amount;
            }
        }
        setTotal(subtotal);
    };

    const deleteClient = async (id) => {
        try {
            await axios.delete(`https://kh0tkmpw-5000.usw3.devtunnels.ms/expenses/delete/${id}`);
            const filtered = data.filter(expense => expense.id !== id);
            setData(filtered);
            getTotal(filtered);
        } catch (error) {
            console.log("Error al borrar gasto ", error);
        }
    };

    return (
        <View style={style.container}>
            

            <ScrollView style={style.scroll}>
                {data.map((expense) => (
                    <View key={expense.id} style={style.card}>
                        <Text style={style.cardText}>Tipo: {expense.category}</Text>
                        <Text style={style.cardText}>Descripción: {expense.description}</Text>
                        <Text style={style.cardText}>Monto: ${expense.amount}</Text>
                        <Text style={style.cardText}>Fecha: {expense.date}</Text>

                        <View style={style.buttonGroup}>
                            <TouchableOpacity
                                style={style.update}
                                onPress={() => navigation.navigate("updateExpense", { expense })}
                            >
                                <Text style={style.buttonText}>Actualizar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={style.delete}
                                onPress={() => deleteClient(expense.id)}
                            >
                                <Text style={style.buttonText}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity onPress={() => navigation.navigate("createExpense")}>
                <Text style={style.createButton}>Crear Gasto</Text>
            </TouchableOpacity>

            <Image
                source={{
                    uri: 'https://preview.redd.it/gangster-spongebob-holding-money-while-giving-a-thumbs-up-v0-jv3d8mb9f2mb1.jpg?width=640&crop=smart&auto=webp&s=a98226b6a9d7ef832b41acd3a4fe5051b0c13856',
                }}
                style={{ width: 200, height: 200, marginTop: 20 }}
            />
            <Text style={style.title}>${total}</Text>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16,
        alignItems: "center",
        backgroundColor: "#fff",
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#333"
    },

    scroll: {
        width: "100%",
    },

    card: {
        backgroundColor: "#f2f2f2",
        borderRadius: 10,
        padding: 16,
        marginBottom: 15,
        elevation: 3,
    },

    cardText: {
        fontSize: 16,
        marginBottom: 5,
        color: "#444"
    },

    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },

    update: {
        backgroundColor: "green",
        padding: 8,
        borderRadius: 5,
    },

    delete: {
        backgroundColor: "red",
        padding: 8,
        borderRadius: 5,
    },

    buttonText: {
        color: "#fff",
        fontSize: 14,
        textAlign: "center",
    },

    createButton: {
        backgroundColor: "#000",
        color: "#fff",
        borderRadius: 30,
        fontSize: 20,
        paddingHorizontal: 24,
        paddingVertical: 12,
        marginTop: 20,
        textAlign: "center"
    },
});
