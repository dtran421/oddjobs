import { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Post } from "../lib/schema";

import { RootStackParamList, RootStackScreenProps } from "../types";
import { StyledText } from "../components/StyledText";
import { formatDate, formatShiftLength, formatStartTime } from "../lib/utils";
import { Feather } from "@expo/vector-icons";
import { View, useThemeColor } from "../components/Themed";
import { Button, Chip } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../lib/AuthContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingHorizontal: 18,
        paddingTop: 20,
        paddingBottom: 40
    },
    position: {
        fontSize: 32,
        fontWeight: "bold"
    },
    pill: {
        backgroundColor: "#333",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20
    },
    payRate: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18
    }
});

const signUpForPost = async (
    navigation: NativeStackNavigationProp<RootStackParamList, "Post">,
    userId: string,
    postId: string
) => {
    const response = await fetch(`http://127.0.0.1:8000/posts/${postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId,
            postId
        })
    });

    if (response.status != 200) {
        console.error(response.text);
        Alert.alert("Something went wrong with signup!");
        return;
    }

    navigation.goBack();
};

const PostScreen = ({ route, navigation }: RootStackScreenProps<"Post">) => {
    const { postId } = route.params;
    const { session } = useContext(AuthContext);

    const [isLoading, setLoading] = useState(false);
    const [hasFetched, setFetched] = useState(false);
    const [postInfo, setPostInfo] = useState<Post>({
        id: "",
        company: "",
        position: "",
        date: "",
        start_time: "",
        shift_length: "",
        description: "",
        pay_rate: "",
        active: true
    });

    useEffect(() => {
        if (!hasFetched) {
            setFetched(true);
            (async () => {
                const response = await fetch(
                    `http://127.0.0.1:8000/posts/${postId}`
                );
                if (response.status != 200) {
                    console.error(response.text);
                    setFetched(false);
                }

                const data = (await response.json())[0];
                setPostInfo(data);
                setFetched(true);
            })();
        }
    }, [hasFetched, postInfo]);

    const postSignUp = async () => {
        if (!session) {
            console.error("user not signed in!");
            navigation.navigate("Login");
            return;
        }

        setLoading(true);
        await signUpForPost(navigation, session.user.id, postId);
        setLoading(false);
    };

    const {
        company,
        position,
        date,
        start_time: startTime,
        shift_length: shiftLength,
        description,
        pay_rate: payRate
    } = postInfo;

    return (
        <View style={styles.container}>
            <View>
                <View style={{ marginBottom: 10 }}>
                    <StyledText style={styles.position}>{position}</StyledText>
                    <StyledText style={{ fontSize: 24 }}>{company}</StyledText>
                </View>
                <View style={{ marginVertical: 10 }}>
                    <StyledText style={{ fontSize: 16 }}>
                        {formatDate(date)}
                    </StyledText>
                    <View style={{ flexDirection: "row", marginVertical: 6 }}>
                        <StyledText style={{ fontSize: 16 }}>
                            {formatStartTime(startTime)}
                        </StyledText>
                        <Feather
                            name="zap"
                            size={20}
                            color={useThemeColor({}, "text")}
                            style={{ marginHorizontal: 10 }}
                        />
                        <StyledText style={{ fontSize: 16 }}>
                            {formatShiftLength(shiftLength)}
                        </StyledText>
                    </View>
                    <View style={{ alignItems: "flex-start" }}>
                        <Chip
                            title={payRate}
                            ViewComponent={LinearGradient}
                            linearGradientProps={{
                                colors: ["#2cf933", "#16d53c", "#1ab00e"],
                                start: { x: 0, y: 0.5 },
                                end: { x: 1, y: 0.5 }
                            }}
                            titleStyle={{
                                color: "black",
                                fontSize: 18,
                                fontWeight: "600",
                                fontFamily: "AvenirNext-Medium"
                            }}
                        />
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 28
                    }}
                >
                    <StyledText style={{ fontSize: 14 }}>
                        {description}
                    </StyledText>
                </View>
            </View>
            <View>
                <Button
                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: ["#2cf933", "#16d53c", "#1ab00e"],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 }
                    }}
                    size="lg"
                    titleStyle={{
                        color: "black",
                        fontFamily: "AvenirNext-Medium",
                        fontWeight: "600"
                    }}
                    buttonStyle={{
                        borderRadius: 6
                    }}
                    loading={isLoading}
                    onPress={() => postSignUp()}
                >
                    <Feather
                        name="edit-3"
                        size={20}
                        color="black"
                        style={{ marginRight: 10 }}
                    />
                    I'll take it!
                </Button>
            </View>
        </View>
    );
};

export default PostScreen;
