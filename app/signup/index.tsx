import { Colors } from "@/app/styles/colors";
import { Link, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";
import ImagePicker from "../dev/components/ImagePicker";
import { saveUser, userExists } from "../dev/services/user";
import { dismissKeyboard } from "../dev/utils/utils";
import { indexStyles } from "../styles/indexStyles";

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [image, setImage] = React.useState("https://placehold.co/600x400/000000/FFF");

  const { width } = useWindowDimensions(); // largura da tela

  const handleSignUp = async () => {
    const exists = await userExists(email);
    if (exists) {
      Toast.show({
        type: "info",
        text1: "E-mail já existe!",
        text2: "Esse e-mail já está cadastrado.",
      });
      return;
    }

    await saveUser({ name, email, password, image });
    Toast.show({
      type: "success",
      text1: "Cadastrado!",
      text2: "Usuário cadastrado com sucesso! Faça login.",
    });
    router.push("/login");
  };

  const cardWidth = width >= 1200 ? "40%" : width >= 768 ? "60%" : "90%";

  return (
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
            <Text
              style={[
                indexStyles.pageTitle,
                { fontSize: width > 768 ? 28 : 24, marginBottom: 20 },
              ]}
            >
              Cadastrar
            </Text>

            <View style={indexStyles.section}>
              <ImagePicker image={image} setImage={setImage} isEditable={true} />
            </View>

            <View style={indexStyles.section}>
              <Text style={indexStyles.label}>Nome:</Text>
              <TextInput
                style={[indexStyles.input, { fontSize: width > 768 ? 18 : 16 }]}
                placeholder="Digite seu nome"
                placeholderTextColor={Colors.placeholder}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={indexStyles.section}>
              <Text style={indexStyles.label}>Email:</Text>
              <TextInput
                style={[indexStyles.input, { fontSize: width > 768 ? 18 : 16 }]}
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
                style={[indexStyles.input, { fontSize: width > 768 ? 18 : 16 }]}
                placeholder="Digite sua senha"
                placeholderTextColor={Colors.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>

            <Link href="/login" asChild>
              <TouchableOpacity
                style={indexStyles.link}
                accessibilityLabel="Link para a tela de login. Já tem uma conta?"
                accessibilityRole="link"
              >
                <Text style={indexStyles.linkText}>Já tem uma conta? Faça login.</Text>
              </TouchableOpacity>
            </Link>

            <TouchableOpacity
              style={[indexStyles.buttonPrimary, { marginTop: 30, paddingVertical: width > 768 ? 14 : 10 }]}
              onPress={handleSignUp}
              accessibilityLabel="Botão de cadastrar. Envia os dados de registro."
              accessibilityRole="button"
            >
              <Text style={[indexStyles.buttonPrimaryText, { fontSize: width > 768 ? 18 : 16 }]}>
                Cadastrar
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;
