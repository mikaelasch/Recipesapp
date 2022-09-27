import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Button, FlatList, Image} from 'react-native';

export default function App() {
  const [ingredient, setIngredient] = useState('')
  const [recipe, setRecipe] = useState([])

  const getRecipes = () =>{
  fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}')
  .then(response => response.json())
  .then(data => setRecipe(data.meals))
  .catch(error => {
    Alert.alert('Error', error)
  })
  }

  const listSeparator = () => {
     return (

      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
    <StatusBar hidden={true} />
    <FlatList
      style={{ marginLeft: "5%" }}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) =>
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.strMeal}</Text>
          <Image source = {{uri: item.strMealThumb }}
            style = {{ width: 200, height: 200 }}>
          </Image>
        </View>}
      data={recipe}
      ItemSeparatorComponent={listSeparator} />
    <View style={{ marginBottom: 50 }}>
      <TextInput style={{ fontSize: 18, width: 200 }} placeholder='Ingredient'
        onChangeText={text => setIngredient(text)} />
      <Button title="Find" onPress={getRecipes} />
    </View>
  </View>
          )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
