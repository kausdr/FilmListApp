import { Colors } from "@/app/_styles/colors";
import { Link, useRouter } from "expo-router";
import React, { useContext } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import Toast from "react-native-toast-message";
import { UserContext } from "../_dev/contexts/userContextAPI";
import { loginUser } from "../_dev/services/user";
import { dismissKeyboard } from "../_dev/utils/utils";
import { indexStyles } from "../_styles/indexStyles";

const Login = () => {
  const { setUser, saveUserSession } = useContext(UserContext);
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { width } = useWindowDimensions();

  const handleLogin = async () => {
    const user = await loginUser(email, password);
    if (user) {
      setUser(user);
      await saveUserSession(user);
      router.push("/home");
    } else {
      console.log("Email ou senha incorretos!");
      Toast.show({
        type: "error",
        text1: "Erro ao fazer login!",
        text2: "Usuário não encontrado.",
      });
    }
  };

  // Define dinamicamente o tamanho do card com base na tela
  const cardWidth =
    width >= 1200 ? "40%" : width >= 768 ? "60%" : "90%";

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
        <View
          style={[
            indexStyles.outerContainer,
            { justifyContent: "center", alignItems: "center", padding: 20 },
          ]}
        >
          <ScrollView
            style={[indexStyles.innerContainer, { width: "100%" }]}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 30,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[indexStyles.card, { width: cardWidth, padding: 25 }]}>
              <View style={indexStyles.section}>
                <Text style={[indexStyles.pageTitle, { fontSize: width > 768 ? 28 : 24 }]}>
                  Login
                </Text>

                <Text style={indexStyles.label}>Email:</Text>
                <TextInput
                  style={[indexStyles.input, { fontSize: width > 768 ? 18 : 16 }]}
                  accessible={true}
                  accessibilityLabel="Campo de email. Digite seu endereço de email."
                  placeholder="Digite seu email"
                  placeholderTextColor={Colors.placeholder}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
              </View>

              <View style={indexStyles.section}>
                <Text style={indexStyles.label}>Senha:</Text>
                <TextInput
                  accessible={true}
                  accessibilityLabel="Campo de senha. Digite sua senha."
                  style={[indexStyles.input, { fontSize: width > 768 ? 18 : 16 }]}
                  placeholder="Digite sua senha"
                  placeholderTextColor={Colors.placeholder}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={true}
                />
              </View>

              <Link href="/signup" asChild>
                <TouchableOpacity style={indexStyles.link}>
                  <Text style={indexStyles.linkText}>Não tem uma conta?</Text>
                </TouchableOpacity>
              </Link>

              <TouchableOpacity
                style={[
                  indexStyles.buttonPrimary,
                  { marginTop: 30, paddingVertical: width > 768 ? 14 : 10 },
                ]}
                onPress={handleLogin}
                accessibilityLabel="Botão de entrar. Faz login com o email e senha informados."
                accessibilityRole="button"
              >
                <Text
                  style={[
                    indexStyles.buttonPrimaryText,
                    { fontSize: width > 768 ? 18 : 16 },
                  ]}
                >
                  Entrar
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;
