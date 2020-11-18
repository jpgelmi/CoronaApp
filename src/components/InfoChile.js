import React, {useEffect, useState} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ActivityIndicator
} from 'react-native'

import Flag from 'react-native-flags';

import colors from "../config/colors"

export default function infoChile(){

    const [infoChile, setInfoChile] = useState(null)
    const [intervalo, setIntervalo] = useState(null)

    const current_date = new Date()
    
    let dd = current_date.getDate()
    let mm = current_date.getMonth() + 1
    let yyyy = current_date.getFullYear()

    if(dd<10){
        dd = "0"+ dd
    }

    if(mm<10){
        mm = "0"+ mm
    }

    let last_date = new Date();
    last_date.setDate(last_date.getDate() - 1);

    let last_dd = last_date.getDate()
    let last_mm = last_date.getMonth() + 1
    let last_yyyy = last_date.getFullYear()

    if(last_dd<10){
        last_dd = "0"+ last_dd
    }

    if(last_mm<10){
        last_mm = "0"+ last_mm
    }

    const updateDate = dd + "-" + mm + "-" + yyyy
    const formatted_date = yyyy + "-" + mm + "-" + dd
    
    const formatted_last_date = last_yyyy + "-" + last_mm + "-" + last_dd

    const URL_HOST = `https://api.covid19api.com/country/chile?from=${formatted_last_date}T00:00:00Z&to=${formatted_date}T00:00:00Z` 
    useEffect(() => {

        fetch(URL_HOST)
        .then((response) => response.json())
        .then((result) => {
            setInfoChile(result)
        })
    },[])

    let date_interval = new Date();
    date_interval.setDate(date_interval.getDate() - 2);

    let interval_dd = date_interval.getDate()
    let interval_mm = date_interval.getMonth() + 1
    let interval_yyyy = date_interval.getFullYear()

    if(interval_dd<10){
        interval_dd = "0"+ interval_dd
    }

    if(interval_mm<10){
        interval_mm = "0"+ inteval_mm
    }

    const formated_date_interval = interval_yyyy + "-" + interval_mm + "-" + interval_dd


    const URL_HOST2 = `https://api.covid19api.com/country/chile?from=${formated_date_interval}T00:00:00Z&to=${formatted_last_date}T00:00:00Z` 
    useEffect(() => {

        fetch(URL_HOST2)
        .then((response) => response.json())
        .then((result) => {
            console.log(result[0].Confirmed)
            setIntervalo(result[0].Confirmed)
        })
    },[])
    

    {if(infoChile){
        return(
            <View style = {styles.container}>
                <View style = {{flexDirection: "row", justifyContent: "space-between"}}>
                <Text style = {styles.text}>
                    Información {"\n"} Chile 
                </Text>
                <Flag
                    code="CL"
                    size={32}
                />
                </View>
               
                <View style = {{alignItems: "center", flex: 1}}>
                    <View style = {styles.mini_card}>
                        <Text style = {styles.textInfo}>
                            Nuevos Casos 
                        </Text>
                        <View style = {{alignItems: "center"}}>
                            <Text style = {styles.textCifra}>
                                {(infoChile[0].Confirmed -  intervalo).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            </Text>
                        </View>
                    </View>
                    <View style = {styles.mini_card}>
                        <Text style = {styles.textInfo}>
                            Casos Activos
                        </Text>
                        <View style = {{alignItems: "center"}}>
                            <Text style = {styles.textCifra}>
                                {((infoChile[0].Active)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            </Text>
                        </View>
                    </View>
                    <View style = {styles.mini_card}>
                        <Text style = {styles.textInfo}>
                            Casos Totales
                        </Text>
                        <View style = {{alignItems: "center"}}>
                            <Text style = {styles.textCifra}>
                                {infoChile[0].Confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            </Text>
                        </View>
                    </View>
                    <View style = {styles.mini_card}>
                        <Text style = {styles.textInfo}>
                            Muertes Totales
                        </Text>
                        <View style = {{alignItems: "center"}}>
                            <Text style = {styles.textCifra}>
                                {((infoChile[0].Deaths)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            </Text>
                        </View>
                    </View>
                    <View style = {styles.footer}>
                        <Text style = {styles.textFooter}>
                            Última actualización {updateDate}
                        </Text>
                    </View>
                </View>
            </View>
            )
    }else{
        return(
            <View style = {{flex: 1, paddingTop: 100}}>
                <ActivityIndicator size = {100} color = {colors.secundario}/>
            </View>
        )
    }}       
}

const styles = StyleSheet.create({
    container:{
        //elevation: 1,
        width: "90%",
        height: "95%", 
        borderRadius:20,
        borderColor: "#000",
        backgroundColor: "#F0F0F0",
        marginVertical: 20,
        marginHorizontal: 15,
        padding: 20,
        marginTop: 50
    },
    text: {
        fontWeight: "bold",
        fontSize: 15
    },
    mini_card:{
        marginTop: 20,
        height: 100,
        width: "95%",
        backgroundColor: "red",
        borderRadius: 20,
        backgroundColor: colors.secundario
    },
    textInfo:{
        fontWeight: "bold",
        fontSize: 15,
        margin: 7,
        color: colors.blanco,
    },
    textCifra:{
        fontWeight: "bold",
        fontSize: 25,
        margin: 5,
        color: colors.blanco
    },
    footer:{
        paddingTop: 10
    },
    textFooter:{
        //fontWeight: "bold"
    }
})