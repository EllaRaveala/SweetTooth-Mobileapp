import React, {useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {
    Container,
    Content,
    Text,
    Card,
    CardItem,
    Icon,
    Right,
    Thumbnail,
    Left
} from 'native-base';
import * as SQLite from 'expo-sqlite';

export default function Favourites({route, navigation}) {

    //const db = SQLite.openDatabase('favdb.db');

    const {data} = route.params;

    const [favourites,
        setFavourites] = useState([]);
    /*const [name,
        setName] = useState('');
    const [image,
        setImage] = useState('');
    const [duration,
        setDuration] = useState('');
    const [description,
        setDescription] = useState('');
    const [likes,
        setLikes] = useState(0);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists favs (id integer primary key not null, name text,' +
                    ' image text, duration text, description text, likes int);');
        }, null, updateList);
    }, []);

    const saveItem = () => {
        db.transaction(tx => {
            tx.executeSql('insert into favs (name, image, duration, description, likes) values (?, ?, ?' +
                    ', ?, ?);',
            [name, image, duration, description, likes]);
        }, null, updateList)
    }

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from favs;', [], (_, {rows}) => setFavourites(rows._array));
        });
    }

    const deleteItem = (id) => {
        db.transaction(tx => {
            tx.executeSql(`delete from aa where id = ?;`, [id]);
        }, null, updateList)
    }*/

    return (
        <Container>
            <FlatList 
                    data={data}
                    keyExtractor={item => item
                    .id
                    .toString()}
                    renderItem={({item}) => <Card>
                    <CardItem
                        header
                        button
                        onPress={() => navigation.navigate('Details')}>
                        <Left>
                        <Thumbnail source={require('./images/donuts.jpg')} />
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
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '30%'
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    listItem: {
        width: '50%'
    }
});