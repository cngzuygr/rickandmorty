import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import {
	EpisodesScreen,
	CharactersScreen,
	LocationsScreen,
	EpisodeDetailsScreen,
	FavoriteCharactersScreen,
} from "../screens";
import { TouchableOpacity } from "react-native";

const BottomTab = createBottomTabNavigator();

export default function AppNavigator() {
	return (
		<BottomTab.Navigator>
			<BottomTab.Screen
				name="EpisodesStack"
				component={EpisodesNavigator}
				options={{
					headerShown: false,
					title: "Home",
					tabBarIcon: () => <TabBarIcon name="home-outline" color={"black"} />,
				}}
			/>
			<BottomTab.Screen
				name="CharactersStack"
				component={CharactersNavigator}
				options={{
					headerShown: false,
					title: "Characters",
					tabBarIcon: () => (
						<MaterialCommunityIcons
							size={30}
							style={{ marginBottom: -3 }}
							name="head-outline"
							color="black"
						/>
					),
				}}
			/>
			<BottomTab.Screen
				name="LocationsStack"
				component={LocationsNavigator}
				options={{
					headerShown: false,
					title: "Locations",
					tabBarIcon: () => (
						<TabBarIcon name="location-outline" color={"black"} />
					),
				}}
			/>
		</BottomTab.Navigator>
	);
}

function TabBarIcon(props) {
	return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const EpisodesStack = createNativeStackNavigator();
function EpisodesNavigator({ navigation }) {
	return (
		<EpisodesStack.Navigator>
			<EpisodesStack.Screen
				name="EpisodesScreen"
				component={EpisodesScreen}
				options={{
					headerTitle: "episodes",
					headerTitleAlign: "center",
					headerTitleStyle: {
						color: "#01aec6",
						fontSize: 36,
						fontFamily: "Schwifty",
						fontWeight: "bold",
						textShadowOffset: { width: 2, height: 2 },
						textShadowColor: "#8ac881",
						textShadowRadius: 4,
					},
				}}
			/>
			<EpisodesStack.Screen
				name="EpisodeDetailsScreen"
				component={EpisodeDetailsScreen}
				options={{
					headerTitle: "episodes",
					headerTitleAlign: "center",
					headerTitleStyle: {
						color: "#01aec6",
						fontSize: 36,
						fontFamily: "Schwifty",
						fontWeight: "bold",
						textShadowOffset: { width: 2, height: 2 },
						textShadowColor: "#8ac881",
						textShadowRadius: 4,
					},
					headerLeft: () => (
						<TouchableOpacity
							style={{
								justifyContent: "center",
								alignItems: "center",
							}}
							onPress={() => navigation.goBack()}
						>
							<Ionicons name="arrow-back" size={32} color="black" />
						</TouchableOpacity>
					),
				}}
			/>
		</EpisodesStack.Navigator>
	);
}

const CharactersStack = createNativeStackNavigator();
function CharactersNavigator({ navigation }) {
	return (
		<CharactersStack.Navigator>
			<CharactersStack.Screen
				name="CharactersScreen"
				component={CharactersScreen}
				options={{
					headerTitle: "characters",
					headerTitleAlign: "center",
					headerTitleStyle: {
						color: "#01aec6",
						fontSize: 36,
						fontFamily: "Schwifty",
						fontWeight: "bold",
						textShadowOffset: { width: 2, height: 2 },
						textShadowColor: "#8ac881",
						textShadowRadius: 4,
					},
					headerRight: () => (
						<TouchableOpacity
							style={{
								justifyContent: "center",
								alignItems: "center",
							}}
							onPress={() => navigation.navigate("FavoriteCharactersScreen")}
						>
							<Ionicons name="heart-outline" size={32} color="black" />
						</TouchableOpacity>
					),
				}}
			/>
			<CharactersStack.Screen
				name="FavoriteCharactersScreen"
				component={FavoriteCharactersScreen}
				options={{
					headerTitle: "characters",
					headerTitleAlign: "center",
					headerTitleStyle: {
						color: "#01aec6",
						fontSize: 36,
						fontFamily: "Schwifty",
						fontWeight: "bold",
						textShadowOffset: { width: 2, height: 2 },
						textShadowColor: "#8ac881",
						textShadowRadius: 4,
					},
					headerLeft: () => (
						<TouchableOpacity
							style={{
								justifyContent: "center",
								alignItems: "center",
							}}
							onPress={() => navigation.navigate("CharactersScreen")}
						>
							<Ionicons name="arrow-back" size={32} color="black" />
						</TouchableOpacity>
					),
				}}
			/>
		</CharactersStack.Navigator>
	);
}

const LocationsStack = createNativeStackNavigator();
function LocationsNavigator() {
	return (
		<LocationsStack.Navigator>
			<LocationsStack.Screen
				name="LocationScreen"
				component={LocationsScreen}
				options={{
					headerTitle: "locations",
					headerTitleAlign: "center",
					headerTitleStyle: {
						color: "#01aec6",
						fontSize: 36,
						fontFamily: "Schwifty",
						fontWeight: "bold",
						textShadowOffset: { width: 2, height: 2 },
						textShadowColor: "#8ac881",
						textShadowRadius: 4,
					},
				}}
			/>
		</LocationsStack.Navigator>
	);
}
