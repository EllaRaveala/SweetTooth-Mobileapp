import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {
    Container,
    Text,
    Card,
    CardItem,
    Icon,
    Right,
    Thumbnail,
    Left
} from 'native-base';
import * as SQLite from 'expo-sqlite';

export default function Favourites({navigation}) {

    const db = SQLite.openDatabase('favouriteRecipesdb.db');

    const [favourites,
        setFavourites] = useState([]);

    //calls updateList function
    useEffect(() => {
        updateList();
    }, []);

    //sets recipes to favourites -array
    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from favouriteRecipes;', [], (_, {rows}) => setFavourites(rows._array));
        });
    }
    //deletes favourite recipe from database by id
    const deleteItem = (id) => {
        db.transaction(tx => {
            tx.executeSql(`delete from favouriteRecipes where id = ?;`, [id]);
        }, null, updateList)
    }

    //returns flatlist of card items with favourite recipes
    return (
        <Container style={styles.container}>
            <FlatList
                data={favourites}
                keyExtractor={item => item
                .id
                .toString()}
                renderItem={({item}) => <Card>
                <CardItem header button onPress={() => navigation.navigate('Details')}>
                    <Left>
                        <Thumbnail source={require('./images/donuts.jpg')}/>
                    </Left>
                    <Text>{item.name}</Text>
                    <Right>
                        <Text>Details</Text>
                        <Icon name="arrow-forward"/>
                    </Right>
                </CardItem>
                <CardItem footer button onPress={() => deleteItem(item.id)}>
                    <Text>Delete</Text>
                </CardItem>
            </Card>}/>
        </Container>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
});