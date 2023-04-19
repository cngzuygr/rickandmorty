import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

import Navigation from "./src/navigation";
import { SplashScreen } from "./src/screens";

export default function App() {
	const [fonts] = useFonts({
		Schwifty: require("./assets/fonts/get_schwifty.ttf"),
	});

	const [isLoading, setIsLoading] = useState(false);

	if (isLoading || !fonts) {
		return <SplashScreen />;
	}

	return <Navigation />;
}
