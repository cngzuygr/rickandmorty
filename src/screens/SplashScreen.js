import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

const SplashScreen = () => {
	return (
		<View style={styles.animationContainer}>
			<LottieView autoPlay source={require("../../assets/splash.json")} />
		</View>
	);
};

const styles = StyleSheet.create({
	animationContainer: {
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
});

export default SplashScreen;
