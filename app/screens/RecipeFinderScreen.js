import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  FlatList,
  Image,
} from "react-native";

export default function RecipeFinderScreen() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const getResult = () => {
    let url = "http://www.recipepuppy.com/api/?i=" + search;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setResult(data.results);
        console.log(data.results);
      })
      .catch((error) => {
        Alert.alert("Error:", error.message);
      });
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 9, paddingTop: 50 }}>
        <FlatList
          style={{ marginLeft: "5%" }}
          keyExtractor={(item) => item.href}
          renderItem={({ item }) => (
            <View>
              <Text>{item.title}</Text>
              <Image
                source={{ uri: item.thumbnail }}
                style={{ height: 40, width: 40 }}
              />
            </View>
          )}
          data={result}
        />
      </View>
      <View styles={{ flex: 1 }}>
        <TextInput
          style={styles.input}
          value={search}
          placeholder="Search"
          onChangeText={(search) => setSearch(search)}
        />
        <Button title="Search" onPress={() => getResult()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 300,
    borderColor: "grey",
    borderWidth: 1,
    textAlign: "center",
    margin: 5,
    height: 40,
  },
  buttons: {
    flexDirection: "row",
    width: 50,
    justifyContent: "center",
  },
});
