import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import SplashScreen from "./screens/SplashScreen";

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    return (
        <SafeAreaProvider>
            {!isLoadingComplete ? (
                <SplashScreen />
            ) : (
                <>
                    <Navigation colorScheme={colorScheme} />
                    <StatusBar />
                </>
            )}
        </SafeAreaProvider>
    );
}
