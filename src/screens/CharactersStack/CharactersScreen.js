import {
	ActivityIndicator,
	FlatList,
	Modal,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EpisodeCharacters from "../../components/EpisodeCharacters";
import CharacterModal from "../../components/CharacterModal";

const CharactersScreen = () => {
	const [characters, setCharacters] = useState([]);
	const [jsonInfo, setJsonInfo] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedCharacter, setSelectedCharacter] = useState();
	const [query, setQuery] = useState("");
	const [searchChars, setSearchChars] = useState([]);

	useEffect(() => {
		fetchCharacters();
	}, []);

	const fetchCharacters = async () => {
		try {
			const response = await fetch(`https://rickandmortyapi.com/api/character`);
			const json = await response.json();
			setCharacters((prevCharacters) => [...prevCharacters, ...json.results]);
			setJsonInfo(json.info);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	const handleLoadMore = async () => {
		if (jsonInfo?.next) {
			try {
				const response = await fetch(jsonInfo.next);
				const json = await response.json();
				setCharacters((prevCharacters) => [...prevCharacters, ...json.results]);
				setJsonInfo(json.info);
			} catch (error) {
				console.error(error);
			}
		}
	};

	const handleShowModal = (index) => {
		if (searchChars.length > 1) {
			setSelectedCharacter(searchChars[index]);
		} else {
			setSelectedCharacter(characters[index]);
		}
		setModalVisible(true);
	};

	const handleHideModal = () => {
		setSelectedCharacter(null);
		setModalVisible(false);
	};

	const handleAddFavorite = () => {
		console.log("add fav");
	};

	const handleSearch = async () => {
		if (query.length > 0) {
			try {
				const response = await fetch(
					`https://rickandmortyapi.com/api/character/?name=${query}`
				);
				const json = await response.json();
				setSearchChars([...json.results]);
				setIsLoading(false);
			} catch (error) {
				console.error(error);
			}
		} else {
			setSearchChars([]);
		}
	};

	const renderItem = ({ item, index }) => (
		<EpisodeCharacters
			key={index}
			item={item}
			onPress={() => handleShowModal(index)}
		/>
	);

	if (isLoading) {
		return (
			<SafeAreaView style={styles.loadingContainer}>
				<ActivityIndicator color={"#2e8934"} size={"large"} />
			</SafeAreaView>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.searchContainer}>
				<TextInput
					style={styles.input}
					placeholder="Search..."
					value={query}
					onChangeText={setQuery}
				/>
				<TouchableOpacity style={styles.button} onPress={handleSearch}>
					<Text style={styles.buttonText}>Search</Text>
				</TouchableOpacity>
			</View>
			{searchChars.length > 1 ? (
				<View>
					<FlatList
						data={searchChars}
						renderItem={renderItem}
						showsVerticalScrollIndicator={false}
						keyExtractor={(item) => item.id.toString()}
					/>
					<Modal
						animationType="slide"
						transparent={true}
						visible={modalVisible}
						onRequestClose={() => {
							Alert.alert("Modal has been closed.");
							handleHideModal();
						}}
					>
						<CharacterModal
							selectedCharacter={selectedCharacter}
							setModalVisible={setModalVisible}
							modalVisible={modalVisible}
							addFavorite={handleAddFavorite}
						/>
					</Modal>
				</View>
			) : (
				<View>
					<FlatList
						data={characters}
						renderItem={renderItem}
						showsVerticalScrollIndicator={false}
						keyExtractor={(item) => item.id.toString()}
						onEndReached={handleLoadMore}
						onEndReachedThreshold={0.05}
					/>
					<Modal
						animationType="slide"
						transparent={true}
						visible={modalVisible}
						onRequestClose={() => {
							Alert.alert("Modal has been closed.");
							handleHideModal();
						}}
					>
						<CharacterModal
							selectedCharacter={selectedCharacter}
							setModalVisible={setModalVisible}
							modalVisible={modalVisible}
							addFavorite={handleAddFavorite}
						/>
					</Modal>
				</View>
			)}
		</View>
	);
};

export default CharactersScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	loadingContainer: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 16,
		marginTop: 16,
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 8,
		marginRight: 8,
	},
	button: {
		backgroundColor: "#2e8934",
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 8,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
	},
});
