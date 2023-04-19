import {
	ActivityIndicator,
	Dimensions,
	Image,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EpisodeCharacters from "../../components/EpisodeCharacters";
import CharacterModal from "../../components/CharacterModal";

const EpisodeDetailsScreen = ({ route }) => {
	const { width, height } = Dimensions.get("window");
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedCharacter, setSelectedCharacter] = useState();
	const [episode, setEpisode] = useState();
	const [characters, setCharacters] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchEpisode();
	}, []);

	useEffect(() => {
		fetchCharacters();
	}, [episode]);

	const fetchEpisode = async () => {
		try {
			const response = await fetch(
				`https://rickandmortyapi.com/api/episode/${route.params}`
			);
			const json = await response.json();
			setEpisode(json);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	const fetchCharacters = async () => {
		if (episode) {
			const results = [];
			for (const character of episode.characters) {
				const response = await fetch(character);
				const data = await response.json();
				results.push(data);
			}
			setCharacters(results);
		}
	};

	const handleShowModal = (index) => {
		setSelectedCharacter(characters[index]);
		setModalVisible(true);
	};

	const handleHideModal = () => {
		setSelectedCharacter(null);
		setModalVisible(false);
	};

	const handleAddFavorite = () => {
		console.log("add fav");
	};

	if (isLoading) {
		return (
			<SafeAreaView style={styles.loadingConatiner}>
				<ActivityIndicator color={"#2e8934"} size={"large"} />
			</SafeAreaView>
		);
	}

	return (
		<ScrollView style={styles.container}>
			<Image
				source={require("../../../assets/episodeThumbnails/1.jpeg")}
				style={{ width: width, height: height / 2 }}
			/>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					margin: 10,
				}}
			>
				<Text style={styles.subtitle}>
					Season: {parseInt(episode.episode.slice(1, 3))}
				</Text>
				<Text style={styles.subtitle}>
					Episode: {parseInt(episode.episode.slice(4, 6))}
				</Text>
			</View>
			<Text style={styles.title}>{episode.name}</Text>
			<Text
				style={{
					fontSize: 24,
					fontWeight: "bold",
					color: "#01aec6",
					marginLeft: 10,
					marginTop: 10,
					textDecorationLine: "underline",
				}}
			>
				Characters
			</Text>
			{characters?.map((e, _i) => (
				<EpisodeCharacters
					key={e.id}
					item={e}
					onPress={() => handleShowModal(_i)}
				/>
			))}
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
		</ScrollView>
	);
};

export default EpisodeDetailsScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "black",
		alignSelf: "center",
	},
});
