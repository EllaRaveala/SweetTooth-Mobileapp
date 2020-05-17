import React, {useEffect} from 'react';
import {StyleSheet, Image, Text, Alert} from 'react-native';
import {
    Container,
    Icon,
    Right,
    Card,
    CardItem,
    Left,
    Body,
    Button
} from 'native-base';
import * as SQLite from 'expo-sqlite';

export default function Details({route, navigation}) {

    const db = SQLite.openDatabase('favouriteRecipesdb.db');

    //Import params from Recipes - component
    const {data} = route.params;

    //set params to variables
    const name = data.name;
    const image = data.image;
    const duration = data.duration;
    const ingredients = data.ingredients;
    const likes = data.likes;

    //Creates database table favouriteRecipes if not exist
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists favouriteRecipes (id integer primary key not null, na' +
                    'me text, image text, duration text, ingredients text, likes int);');
        }, null);
    }, []);

    //Saves new recipe to favouriteRecipes table
    const saveItem = () => {
        db.transaction(tx => {
            tx.executeSql('insert into favouriteRecipes (name, image, duration, ingredients, likes) values ' +
                    '(?, ?, ?, ?, ?);',
            [name, image, duration, ingredients, likes]);
        }, null)
    }

    // returns one card item with all the information in it
    // lets user add the recipe to favourites
    return (
        <Container style={styles.container}>
            <Text
                style={styles.navButton}
                onPress={() => navigation.navigate('Favourites')}>Favourites</Text>
            <Card>
                <CardItem>
                    <Left>
                        <Text
                            style={{
                            fontSize: 20
                        }}>{name}</Text>
                    </Left>
                    <Body>
                        <Text
                            style={{
                            color: "#4267b2"
                        }}
                            onPress={() => {
                            saveItem();
                            Alert.alert('Recipe Added to Favourites!')
                        }}>
                            + Add to Favourites
                        </Text>
                    </Body>
                    <Right></Right>
                </CardItem>
                <CardItem cardBody>
                    <Image
                        source={{
                        uri: image
                    }}
                        style={{
                        height: 200,
                        width: 200,
                        flex: 1
                    }}/>
                </CardItem>
                <CardItem>
                    <Left>
                        <Button transparent>
                            <Icon active name="thumbs-up"/>
                            <Text>
                                {likes}</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Button transparent>
                            <Icon active name="chatbubbles"/>
                            <Text>4 Comments</Text>
                        </Button>
                    </Body>
                    <Right>
                        <Text>{duration}</Text>
                    </Right>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text
                            style={{
                            fontSize: 15,
                            color: "#4267b2"
                        }}>
                            Ingredients
                        </Text>
                        <Text>
                            {ingredients}
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e9ebee'
    },
    header: {
        textAlign: "center",
        marginBottom: 5,
        color: "#4267b2",
        fontSize: 25
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