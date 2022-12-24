import { useCallback, useEffect, useState } from "react";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";

import PostCard from "../components/PostCard";
import { RootTabScreenProps } from "../types";
import { Post } from "../lib/schema";
import { View } from "../components/Themed";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent"
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
    const [hasFetched, setFetched] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
    }, []);

    useEffect(() => {
        if (!hasFetched || refreshing) {
            setFetched(true);
            (async () => {
                const response = await fetch("http://127.0.0.1:8000/posts");
                if (response.status != 200) {
                    console.error(response.text);
                    setFetched(false);
                }

                const data = await response.json();
                setPosts(data);
                setFetched(true);
                setRefreshing(false);
            })();
        }
    }, [hasFetched, refreshing, posts]);

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View
                style={{
                    width: "100%",
                    flex: 1
                }}
            >
                {posts.map((post) => (
                    <PostCard key={post.id} {...post} />
                ))}
            </View>
        </ScrollView>
    );
};

export default HomeScreen;
