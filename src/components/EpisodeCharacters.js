import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const EpisodeCharacters = ({ item, onPress }) => {
	return (
		<View style={styles.container}>
			<Image
				source={{ uri: item.image }}
				style={{ height: 100, width: 100, borderRadius: 50 }}
			/>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					flex: 1,
				}}
			>
				<View style={styles.textContainer}>
					<Text style={styles.text}>{item.name}</Text>
					<Text style={styles.text}>{item.species}</Text>
				</View>
				<TouchableOpacity onPress={onPress} style={styles.button}>
					<Text style={styles.buttonText}>See More</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default EpisodeCharacters;

const styles = StyleSheet.create({
	container: {
		height: 100,
		flexDirection: "row",
		marginTop: 10,
	},
	textContainer: {
		justifyContent: "center",
		marginLeft: 20,
	},
	text: {
		marginBottom: 5,
	},
	button: {
		height: 30,
		backgroundColor: "#01aec6",
		borderRadius: 5,
		justifyContent: "center",
		alignContent: "center",
		alignSelf: "center",
		marginRight: 20,
	},
	buttonText: {
		color: "#fff",
		padding: 8,
	},
});
