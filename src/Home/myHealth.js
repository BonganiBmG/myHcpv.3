

import { Button, StyleSheet, Image, Text, View, SafeAreaView, TextInput, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import myHCPData from './Data';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = ({ navigation }) => {
    return (
        <SafeAreaView>
            <FlatList
                data={myHCPData}
                contentInset={{ padding: 12 }}
                renderItem={({ item }) => {

                    return (
                        <TouchableOpacity style={{ margin: 20, height: windowHeight * 0.15, backgroundColor: item.bgColor, borderRadius: 5, }}
                            onPress={() => navigation.navigate('Details')} >
                            <View style={{ backgroundColor: item.bgColor }}>
                                <Text style={styles.category}>
                                    {item.category}
                                </Text>
                                <Text sytle={styles.name}>
                                    {item.name}
                                </Text>
                                <Text>
                                    {item.numberCompany}
                                </Text>
                                <Image style={{
                                    height: 80, width: 80, position: 'absolute', right: 0, margin: 10,
                                }} source={item.image} />




                            </View>


                        </TouchableOpacity>
                    )
                }}

            >

            </FlatList>


        </SafeAreaView>




    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e88e5',
    },
    category: {
        fontSize: 24,
        fontWeight: "100"

    },
    name: {
        fontSize: 24,
        fontWeight: "200"
    }


});



export default Home;