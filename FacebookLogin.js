import React, {useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    ImageBackground,
    Button
} from 'react-native';
import { Container, Header, Content, List, ListItem, Separator, Footer } from 'native-base';
import * as Facebook from 'expo-facebook';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FrontPage from './FrontPage';

//console.disableYellowBox = true;

export default function FacebookLogin() {

    const Stack = createStackNavigator();

    const [isLoggedin,
        setLoggedinStatus] = useState(false);
    const [userData,
        setUserData] = useState(null);
    const [isImageLoading,
        setImageLoadStatus] = useState(false);

    facebookLogIn = async() => {
        try {

            await Facebook.initializeAsync('1146170379049255');
            const {type, token, expires, permissions, declinedPermissions} = await Facebook.logInWithReadPermissionsAsync('1146170379049255', {permissions: ['public_profile']});
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`)
                    .then(response => response.json())
                    .then(data => {
                        setLoggedinStatus(true);
                        setUserData(data);
                    })
                    .catch(e => console.log(e))
            } else {
                // type === 'cancel'
            }
        } catch ({message}) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    logout = () => {
        setLoggedinStatus(false);
        setUserData(null);
        setImageLoadStatus(false);
    }

    return (isLoggedin
        ? userData
            ? <Container>
                <Header>
                     <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen name="Home" component={FrontPage}/>
                        </Stack.Navigator>
                    </NavigationContainer>
                    </Header>
                    <Content>
                    <Image
                        style={{
                        width: 100,
                        height: 100,
                        borderRadius: 0
                    }}
                        source={{
                        uri: userData.picture.data.url
                    }}
                        onLoadEnd={() => setImageLoadStatus(true)}/>
                    <ActivityIndicator
                        size="large"
                        color="#0000ff"
                        animating={!isImageLoading}
                        style={{
                        position: "absolute"
                    }}/>
                    <Text
                        style={{
                        fontSize: 22,
                        marginVertical: 10
                    }}>Hi {userData.name}!</Text>
                    </Content>
                    <Footer>
                    <TouchableOpacity style={styles.logoutBtn} onPress={this.logout}>
                        <Text
                            style={{
                            color: "#fff"
                        }}>Logout</Text>
                    </TouchableOpacity>
                    </Footer>
                </Container>
            : null
        : <View style={styles.container}>
            <ImageBackground source={require("./images/donuts.jpg")} style={styles.image}>
                <Text style={styles.header}>SweetTooth</Text>
                <TouchableOpacity style={styles.loginBtn} onPress={this.facebookLogIn}>
                    <Text style={{
                        color: "#fff"
                    }}>Login with Facebook</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9ebee',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginBtn: {
        marginLeft: "25%",
        marginBottom: "150%",
        backgroundColor: '#4267b2',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderColor: "white",
        borderWidth: 4,
        width: "50%"
    },
    logoutBtn: {
        backgroundColor: 'grey',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        position: "absolute",
        bottom: 0
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
    }
});