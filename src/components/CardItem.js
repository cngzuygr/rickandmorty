import React from "react";
import {
	View,
	Text,
	StyleSheet,
	ImageBackground,
	TouchableOpacity,
} from "react-native";

const CardItem = ({ item, onPress }) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.card}>
			<ImageBackground
				source={require("../../assets/episodeThumbnails/1.jpeg")}
				style={styles.background}
			>
				<View style={styles.opacity}>
					<Text style={styles.title}>{item.name}</Text>
					<View
						style={{ flexDirection: "row", justifyContent: "space-between" }}
					>
						<Text style={styles.subtitle}>
							Season: {parseInt(item.episode.slice(1, 3))}
						</Text>
						<Text style={styles.subtitle}>
							Episode: {parseInt(item.episode.slice(4, 6))}
						</Text>
					</View>
					<Text style={styles.subtitleDate}>Air date: {item.air_date}</Text>
				</View>
			</ImageBackground>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	card: {
		flex: 1,
		margin: 5,
		height: 250,
		borderRadius: 10,
		overflow: "hidden",
	},
	background: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "flex-end",
	},
	opacity: {
		backgroundColor: "#000000aa",
		padding: 10,
	},
	title: {
		fontSize: 14,
		fontWeight: "bold",
		color: "white",
	},
	subtitle: {
		fontSize: 14,
		color: "white",
	},
	subtitleDate: {
		fontSize: 10,
		color: "lightgrey",
	},
});

export default CardItem;
