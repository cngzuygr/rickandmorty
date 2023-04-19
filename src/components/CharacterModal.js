import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CharacterModal = ({
	selectedCharacter,
	setModalVisible,
	modalVisible,
	addFavorite,
}) => {
	const [favorites, setFavorites] = useState([]);

	handleAddFavorite = async (value) => {
		const myArray = [];
		myArray.push(value);
		try {
			await AsyncStorage.setItem("myArray", JSON.stringify(myArray));
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<View style={styles.centeredView}>
			<View style={styles.modalView}>
				<Image
					source={{ uri: selectedCharacter?.image }}
					style={{ height: 200, width: 200, marginBottom: 20 }}
				/>
				<Text style={styles.modalText}>Name: {selectedCharacter?.name}</Text>
				<Text style={styles.modalText}>
					Status: {selectedCharacter?.status}
				</Text>
				<Text style={styles.modalText}>
					Species: {selectedCharacter?.species}
				</Text>
				<Text style={styles.modalText}>
					Gender: {selectedCharacter?.gender}
				</Text>
				<Text style={styles.modalText}>
					Origin: {selectedCharacter?.origin?.name}
				</Text>
				<Text style={styles.modalText}>
					Location: {selectedCharacter?.location?.name}
				</Text>
				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<TouchableOpacity
						style={[styles.button, styles.buttonClose]}
						onPress={() => handleAddFavorite(toString(selectedCharacter?.id))}
					>
						<Ionicons name="heart-outline" size={24} color="white" />
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.button, styles.buttonClose]}
						onPress={() => setModalVisible(!modalVisible)}
					>
						<Text style={styles.textStyle}>Close</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default CharacterModal;

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		// alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
		justifyContent: "center",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});
