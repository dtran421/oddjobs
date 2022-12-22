import { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";

import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { Post } from "../lib/schema";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%"
    }
});

const PostCard = ({
    company,
    position,
    date,
    shift_length: { hours },
    id,
    start_time
}: Post) => (
    <View>
        <Text>Company: {company}</Text>
        <Text>Position: {position}</Text>
        <Text>Date: {date}</Text>
        <Text>Shift Length: {hours}</Text>
        <Text>ID: {id}</Text>
        <Text>Start Time: {start_time}</Text>
    </View>
);

const TabOneScreen = ({ navigation }: RootTabScreenProps<"TabOne">) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await fetch("http://127.0.0.1:8000/posts");
            const data = await response.json();

            if (data) setPosts(data);
        })();
    }, [posts]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab One</Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <Text>Test</Text>
            <FlatList
                data={posts}
                renderItem={({ item }) => <PostCard {...item} />}
                keyExtractor={(item: Post) => item.id}
            />
        </View>
    );
};

export default TabOneScreen;
