import { useState, useEffect, useMemo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ColorSchemeName, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Session } from "@supabase/supabase-js";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import AccountScreen from "../screens/AccountScreen";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import HomeScreen from "../screens/HomeScreen";
import PostScreen from "../screens/PostScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
    RootStackParamList,
    RootTabParamList,
    RootTabScreenProps
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import { supabase } from "../lib/supabase";
import Login from "../screens/LoginScreen";
import { AuthContext } from "../lib/AuthContext";

const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <RootNavigator />
        </NavigationContainer>
    );
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    const authContext = useMemo(
        () => ({
            session
        }),
        [session]
    );

    return (
        <AuthContext.Provider value={authContext}>
            <Stack.Navigator>
                {session?.user ? (
                    <>
                        <Stack.Screen
                            name="Root"
                            component={BottomTabNavigator}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen name="Post" component={PostScreen} />
                    </>
                ) : (
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{
                            headerShown: false,
                            animationTypeForReplace: session?.user
                                ? "pop"
                                : "push"
                        }}
                    />
                )}
                <Stack.Screen
                    name="NotFound"
                    component={NotFoundScreen}
                    options={{ title: "Oops!" }}
                />
                <Stack.Group screenOptions={{ presentation: "modal" }}>
                    <Stack.Screen name="Modal" component={ModalScreen} />
                </Stack.Group>
            </Stack.Navigator>
        </AuthContext.Provider>
    );
};

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator = () => {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].tint
            }}
        >
            <BottomTab.Screen
                name="Home"
                component={HomeScreen}
                options={({ navigation }: RootTabScreenProps<"Home">) => ({
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="home" color={color} />
                    ),
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate("Modal")}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1
                            })}
                        >
                            <Feather
                                name="info"
                                size={25}
                                color={Colors[colorScheme].text}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    )
                })}
            />
            <BottomTab.Screen
                name="TabTwo"
                component={TabTwoScreen}
                options={{
                    title: "Tab Two",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="code" color={color} />
                    )
                }}
            />
            <BottomTab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    title: "Account",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="user" color={color} />
                    ),
                    headerShown: false
                }}
            />
        </BottomTab.Navigator>
    );
};

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
const TabBarIcon = (props: {
    name: React.ComponentProps<typeof Feather>["name"];
    color: string;
}) => <Feather size={30} style={{ marginBottom: -3 }} {...props} />;

export default Navigation;
