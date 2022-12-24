import Lottie from "lottie-react-native";

import triCubeLoader from "../assets/animations/tri-cube-loader.json";
import { StyledText } from "../components/StyledText";
import { View } from "../components/Themed";

const SplashScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <Lottie source={triCubeLoader} autoPlay loop />
        </View>
    );
};

export default SplashScreen;
