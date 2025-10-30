import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { indexStyles } from "../styles/indexStyles";


const Home = () => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[
            indexStyles.outerContainer,
            {
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }
        ]}
        >
            <View style={indexStyles.innerContainer}>
                <View style={indexStyles.card}>
                    <Text>Home Screen</Text>
                    <Link href="/profile" asChild>
                        <TouchableOpacity style={indexStyles.link}>
                            <Text style={indexStyles.linkText}>Perfil</Text>
                        </TouchableOpacity>
                    </Link>
                </View>

            </View>

        </View>
    );
}

export default Home;