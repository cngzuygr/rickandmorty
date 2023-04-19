import { StyleSheet, Text, View } from "react-native";
import React from "react";

const LocationItem = ({ item }) => {
	return (
		<View style={styles.card}>
			<Text style={styles.title}>{item.name}</Text>
			<Text style={styles.subtitle}>Type: {item.type}</Text>
			<Text style={styles.subtitle}>Dimension: {item.dimension}</Text>
		</View>
	);
};

export default LocationItem;

const styles = StyleSheet.create({
	card: {
		flex: 1,
		margin: 5,
		padding: 15,
		backgroundColor: "#01aec6",
		borderRadius: 10,
		overflow: "hidden",
	},
	title: {
		fontSize: 16,
		fontWeight: "bold",
		color: "white",
		marginBottom: 5,
	},
	subtitle: {
		fontSize: 14,
		color: "black",
	},
});
