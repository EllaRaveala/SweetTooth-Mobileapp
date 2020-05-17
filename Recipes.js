import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, TextInput, Button, Alert} from 'react-native';
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
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default function Recipes({navigation}) {

    const db = SQLite.openDatabase('bakingsdb.db');

    const [recipes,
        setRecipes] = useState([]);
    const [name,
        setName] = useState('');
    const [image,
        setImage] = useState('./images/donuts.jpg');
    const [duration,
        setDuration] = useState('');
    const [ingredients,
        setIngredients] = useState('');
    const [likes,
        setLikes] = useState(1);

    // Creates new bakings table if not exist, calls updateList and
    // getPermissionAsync(permission to acces gallery) functions
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists bakings (id integer primary key not null, name text, ' +
                    'image text, duration text, ingredients text, likes int);');
        }, null, updateList);
        getPermissionAsync();
    }, []);

    //Saves new recipe into database
    const saveItem = () => {
        db.transaction(tx => {
            tx.executeSql('insert into bakings (name, image, duration, ingredients, likes) values (?, ?, ?,' +
                    ' ?, ?);',
            [name, image, duration, ingredients, likes]);
        }, null, updateList)
    }

    //Sets data from database to recipes -array
    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from bakings;', [], (_, {rows}) => setRecipes(rows._array));
        });
    }

    //Creates alert when Delete -is pressed, deletes recipe from database by id
    const deleteItem = (id) => {
        Alert.alert("Are you sure you want to delete recipe?", "Click Cancel/Yes", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            }, {
                text: "Yes",
                onPress: () => {
                    db.transaction(tx => {
                        tx.executeSql(`delete from bakings where id = ?;`, [id]);
                    }, null, updateList)
                }
            }
        ], {cancelable: false});
    }

    //Checks permission to access camera roll
    const getPermissionAsync = async() => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    //Opens phone gallery and sets an image to image - variable
    const pickImage = async() => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [
                    4, 3
                ],
                quality: 1
            });
            if (!result.cancelled) {
                setImage(result.uri);
            }
            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    // returns text inputs for adding a new recipe 
    //returns flatlist of card items with all recipes
    return (
        <Container style={styles.container}>
            <Content>
                <Content contentContainerStyle={styles.addRecipeArea}>
                    <Text style={styles.header}>Share a Recipe</Text>
                    <TextInput
                        style={styles.textinput}
                        foc
                        placeholder='Title, i.e Donuts'
                        label='Title'
                        onChangeText={name => setName(name)}
                        value={name}/>
                    <TextInput
                        style={styles.textinput}
                        placeholder='Duration, (i.e "30 min"/"1 hour 30 min")'
                        label="Duration"
                        onChangeText={duration => setDuration(duration)}
                        value={duration}/>
                    <TextInput
                        style={styles.textinput}
                        placeholder='Ingredients (separate with comma)'
                        label="Ingredients"
                        onChangeText={ingredients => setIngredients(ingredients)}
                        value={ingredients}/>
                    <Text style={styles.addImagebtn} onPress={pickImage}>
                        + Add Image</Text>
                    <Button
                        buttonStyle={{
                        backgroundColor: 'gray',
                        height: 50
                    }}
                        onPress={() => {
                        saveItem();
                        Alert.alert('Recipe Added!')}}
                        title="SAVE"/>
                </Content>

                <Text style={styles.header}>Find Recipies</Text>
                <FlatList
                    data={recipes}
                    keyExtractor={item => item
                    .id
                    .toString()}
                    renderItem={({item}) => <Card>
                    <CardItem
                        header
                        button
                        onPress={() => navigation.navigate('Details', {data: item})}>
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
            </Content>
        </Container>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e9ebee'
    },
    addRecipeArea: {
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
    },
    addImagebtn: {
        color: "#4267b2",
        margin: 1,
        width: 300
    }
});