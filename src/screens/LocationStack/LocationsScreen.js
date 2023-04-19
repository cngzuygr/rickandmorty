import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LocationItem from "../../components/LocationItem";

const LocationsScreen = () => {
	const [locations, setLocations] = useState([]);
	const [jsonInfo, setJsonInfo] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [query, setQuery] = useState("");
	const [searchChars, setSearchChars] = useState([]);

	useEffect(() => {
		fetchLocations();
	}, []);

	const fetchLocations = async () => {
		try {
			const response = await fetch(`https://rickandmortyapi.com/api/location`);
			const json = await response.json();
			setLocations((prevLocations) => [...prevLocations, ...json.results]);
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
				setLocations((prevLocations) => [...prevLocations, ...json.results]);
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
					`https://rickandmortyapi.com/api/location/?name=${query}`
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
		<LocationItem
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
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.id.toString()}
					onEndReached={handleLoadMore}
					onEndReachedThreshold={0.05}
				/>
			) : (
				<FlatList
					data={locations}
					renderItem={renderItem}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.id.toString()}
					onEndReached={handleLoadMore}
					onEndReachedThreshold={0.05}
				/>
			)}
		</View>
	);
};

export default LocationsScreen;

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
