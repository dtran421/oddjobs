import { useEffect, useState } from "react";
import { StyleSheet, FlatList } from "react-native";

import PostCard from "../components/PostCard";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { Post } from "../lib/schema";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 10
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

const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (!posts.length)
            (async () => {
                const response = await fetch("http://127.0.0.1:8000/posts");
                const data = await response.json();

                if (data) setPosts(data);
            })();
    }, [posts]);

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={({ item }) => <PostCard {...item} />}
                keyExtractor={(item: Post) => item.id}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            />
        </View>
    );
};

export default HomeScreen;
