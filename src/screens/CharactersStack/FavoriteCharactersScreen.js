import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoriteCharactersScreen = () => {
	const [favorites, setFavorites] = useState([]);

	useEffect(() => {
		getFavorites();
	}, []);

	const getFavorites = async () => {
		try {
			const storedArray = await AsyncStorage.getItem("myArray");
			if (storedArray !== null) {
				console.log(JSON.parse(storedArray));
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<View>
			{favorites.map((character) => (
				<Text key={character}>{character}</Text>
			))}
			<Text>FavoriteCharacters</Text>
		</View>
	);
};

export default FavoriteCharactersScreen;

const styles = StyleSheet.create({});
