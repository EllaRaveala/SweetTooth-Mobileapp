import React, {useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import { Container,  Header, Content, List, ListItem, Text } from 'native-base';
import * as SQLite from 'expo-sqlite';

export default function FrontPage() {

    const db = SQLite.openDatabase('coursedb.db');

    const [recipies,
        setRecipies] = useState([]);
    const [name,
        setName] = useState('');
    const [imageURL,
        setImageURL] = useState('');
    const [duration,
        setDuration] = useState(0);
    const [description,
        setDescription] = useState('');
    const [likes,
        setLikes] = useState(0);

    {/*useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists recipies (id integer primary key not null, name text,' +
                    ' imageURL text, duration int, description text, likes int);');
        }, null, updateList);
    }, []);

    const saveItem = () => {
        db.transaction(tx => {
            tx.executeSql('insert into recipies (name, imageURL, duration, description, likes) values (?, ?' +
                    ', ?, ?, ?);',
            [parseInt(credit), title]);
        }, null, updateList)
    }

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from recipies;', [], (_, {rows}) => setRecipies(rows._array));
        });
    }

    const deleteItem = (id) => {
        db.transaction(tx => {
            tx.executeSql(`delete from recipies where id = ?;`, [id]);
        }, null, updateList)
    }*/}

    return (
        <Container style={styles.container}>
            <Text>Baking recipies</Text>
        </Container>
    );
};

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
    }
});