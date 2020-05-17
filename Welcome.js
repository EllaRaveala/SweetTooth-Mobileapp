import React, {useState} from 'react';
import {StyleSheet, Text, Image, ActivityIndicator} from 'react-native';
import {Container} from 'native-base';

export default function Welcome({route, navigation}) {

    //user data from FacebookLogin -component
    const {uData} = route.params;

    const [isImageLoading,
        setImageLoadStatus] = useState(false);

    // returns facebook profile photo and facebook user name 
    //navigation button to Recipes page
    return (
        <Container style={styles.container}>
            <Text
                style={{
                fontSize: 22,
                marginVertical: 10
            }}>Hi {uData.name}!</Text>
            <Image
                style={{
                width: 100,
                height: 100,
                borderRadius: 0,
                marginBottom: 20
            }}
                source={{
                uri: uData.picture.data.url
            }}
                onLoadEnd={() => setImageLoadStatus(true)}/>
            <ActivityIndicator
                size="large"
                color="#0000ff"
                animating={!isImageLoading}
                style={{
                position: "absolute"
            }}/>
            <Text style={styles.navButton} onPress={() => navigation.navigate('Recipes')}>
                Go to Recipes
            </Text>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9ebee',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        width: "100%",
        resizeMode: "cover",
        justifyContent: "center"
    },
    header: {
        textAlign: "center",
        marginBottom: 20,
        color: "#4267b2",
        fontSize: 40
    },
    navButton: {
        margin: 10,
        backgroundColor: 'white',
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: 0,
        borderColor: "#4267b2",
        borderWidth: 2,
        width: "50%",
        textAlign: "center"
    }
});