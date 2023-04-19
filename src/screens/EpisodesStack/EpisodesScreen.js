import React, { useState, useEffect } from "react";
import { ImageBackground, TextInput, TouchableOpacity } from "react-native";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Image,
	ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardItem from "../../components/CardItem";

const EpisodesScreen = ({ navigation }) => {
	const [episodes, setEpisodes] = useState([]);
	const [jsonInfo, setJsonInfo] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [query, setQuery] = useState("");
	const [searchChars, setSearchChars] = useState([]);

	useEffect(() => {
		fetchEpisodes();
	}, []);

	const fetchEpisodes = async () => {
		try {
			const response = await fetch(`https://rickandmortyapi.com/api/episode`);
			const json = await response.json();
			setEpisodes((prevEpisodes) => [...prevEpisodes, ...json.results]);
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
				setEpisodes((prevEpisodes) => [...prevEpisodes, ...json.results]);
				setJsonInfo(json.info);
			} catch (error) {
				console.error(error);
			}
		}
	};

	const handleSearch = async () => {
		if (query.length > 0) {
			try {
				const response = await fetch(
					`https://rickandmortyapi.com/api/episode/?name=${query}`
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

	const renderItem = ({ item }) => (
		<CardItem
			key={item.id}
			item={item}
			onPress={() => navigation.navigate("EpisodeDetailsScreen", item.id)}
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
				<FlatList
					data={searchChars}
					renderItem={renderItem}
					numColumns={2}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.id.toString()}
					onEndReached={handleLoadMore}
					onEndReachedThreshold={0.05}
				/>
			) : (
				<FlatList
					data={episodes}
					renderItem={renderItem}
					numColumns={2}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.id.toString()}
					onEndReached={handleLoadMore}
					onEndReachedThreshold={0.05}
				/>
			)}
		</View>
	);
};

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

export default EpisodesScreen;
