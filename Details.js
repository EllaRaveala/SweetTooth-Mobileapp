import React, {useState, useEffect} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    Alert,
    FlatList,
    TextInput
} from 'react-native';
import {
    Container,
    Header,
    Content,
    Icon,
    Right,
    Card,
    CardItem,
    Left,
    Thumbnail,
    Body,
    Button
} from 'native-base';
import * as SQLite from 'expo-sqlite';

export default function Details({route, navigation}) {

    const db = SQLite.openDatabase('favdb.db');

    //Variables for imported params
    const {data} = route.params;

    const name = data.name;
    const image = data.image;
    const duration = data.duration;
    const description = data.description;
    const likes = data.likes;

    //New array where favourites are saved
    const [favourites,
        setFavourites] = useState([]);

    //Variables for converting amounts
    const [ingredientName,
        setIngredientName] = useState('');
    const [targetUnit,
        setTargetUnit] = useState('');
    const [sourceUnit,
        setSourceUnit] = useState('');
    const [sourceAmount,
        setSourceAmount] = useState('');
    const [answer,
        setAnswer] = useState('');

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists fav (id integer primary key not null, name text, imag' +
                    'e text, duration text, description text, likes int);');
        }, null, updateList);
    }, []);

    const saveItem = () => {
        db.transaction(tx => {
            tx.executeSql('insert into fav (name, image, duration, description, likes) values (?, ?, ?, ?, ' +
                    '?);',
            [name, image, duration, description, likes]);
        }, null, updateList)
    }

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from fav;', [], (_, {rows}) => setFavourites(rows._array));
        });
    }

    const deleteItem = (id) => {
        db.transaction(tx => {
            tx.executeSql(`delete from fav where id = ?;`, [id]);
        }, null, updateList)
    }

    const convert = () => {
        fetch("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/convert?sour" +
                "ceUnit=cups&sourceAmount=2.5&ingredientName=flour&targetUnit=grams", {
            method: "GET",
            headers: {
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "x-rapidapi-key": "8493581f79msh5161cd8f00aee52p14a556jsn3478eac19610"
            },
        }).then((response) => response.json()).then((data) => {
            setAnswer(data.answer);
        }).catch((error) => {
            Alert.alert('Error', error);
        });
    }

    return (
        <Container style={styles.container}>
            <Text
                onPress={() => navigation.navigate('Favourites', {data: favourites})}>"Favourites"</Text>
            <Card>
                <CardItem>
                    <Left>
                        <Text>{name}</Text>
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
                    <Right>
                        <Text
                            style={{
                            color: "#4267b2"
                        }}
                            onPress={() => {
                            deleteItem();
                            Alert.alert('Recipe Deleted from Favourites!')
                        }}>
                            - Delete
                        </Text>
                    </Right>
                </CardItem>
                <CardItem cardBody>
                    <Image
                        source={{
                        uri: data.image
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
                                {data.likes}</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Button transparent>
                            <Icon active name="chatbubbles"/>
                            <Text>4 Comments</Text>
                        </Button>
                    </Body>
                    <Right>
                        <Text>{data.duration}</Text>
                    </Right>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            {data.ingredients}
                        </Text>
                    </Body>
                </CardItem>
            </Card>

            <Content contentContainerStyle={styles.convertArea}>
                <Text style={styles.header}>Convert amounts</Text>
                <TextInput
                    style={styles.textinput}
                    foc
                    placeholder='Ingredient name, i.e flour'
                    onChangeText={ingredientName => setIngredientName(ingredientName)}
                    value={ingredientName}/>
                <TextInput
                    style={styles.textinput}
                    placeholder='Target unit i.e, grams'
                    onChangeText={targetUnit => setTargetUnit(targetUnit)}
                    value={targetUnit}/>
                <TextInput
                    style={styles.textinput}
                    placeholder='Source unit i.e, cups'
                    onChangeText={sourceUnit => setSourceUnit(sourceUnit)}
                    value={sourceUnit}/>
                <TextInput
                    style={styles.textinput}
                    placeholder='Source amount i.e, 2.5'
                    onChangeText={sourceAmount => setSourceAmount(sourceAmount)}
                    value={sourceAmount}/>
                <Text
                  style={{
                    padding: 20,
                    borderWidth: 2,
                }}
                    onPress={convert}>Convert</Text>
                <Text>{answer}</Text>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e9ebee'
    },
    convertArea: {
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textinput: {
        width: 300,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        margin: 1,
        paddingVertical: 8
    },
    header: {
        textAlign: "center",
        marginBottom: 5,
        color: "#4267b2",
        fontSize: 25
    }
});