import { Colors } from "@/app/styles/colors";
import React, { useContext, useEffect, useRef } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";
import ImagePicker from "../dev/components/ImagePicker";
import { UserContext } from "../dev/contexts/userContextAPI";
import { updateUser } from "../dev/services/user";
import { dismissKeyboard } from "../dev/utils/utils";
import { indexStyles } from "../styles/indexStyles";

const Profile = () => {
  const { user, setUser, saveUserSession, logout } = useContext(UserContext);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [image, setImage] = React.useState("");
  const [editable, setEditable] = React.useState<boolean>(false);
  const prevEmail = useRef<string>(email);

  const { width } = useWindowDimensions(); // 👈 detecta a largura da tela

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
      if (user.image) setImage(user.image);
      prevEmail.current = user.email;
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setEditable(false);
    const newUser = { name, email, password, image };

    try {
      const updatedUser = await updateUser(prevEmail.current, newUser);
      if (updatedUser) {
        setUser(updatedUser);
        await saveUserSession(updatedUser);
        prevEmail.current = email;
        Toast.show({ type: "success", text1: "Perfil atualizado!" });
      } else {
        Toast.show({
          type: "error",
          text1: "Erro ao salvar",
          text2: "Ocorreu um erro ao salvar o perfil.",
        });
      }
    } catch (error) {
      console.log("Erro ao atualizar usuário:", error);
      Toast.show({
        type: "error",
        text1: "Erro de sistema",
        text2: "Não foi possível salvar as alterações.",
      });
    }
  };

  const handleCancel = () => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
      setImage(user.image || "");
    }
    setEditable(false);
  };

  const cardWidth =
    width >= 1200 ? "40%" : width >= 768 ? "60%" : "90%";

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
              Perfil
            </Text>

            <View style={indexStyles.section}>
              <ImagePicker image={image} setImage={setImage} isEditable={editable} />
              <Text
                style={[
                  indexStyles.title,
                  { fontSize: width > 768 ? 22 : 18, marginTop: 10 },
                ]}
              >
                {name}
              </Text>
            </View>

            <View style={indexStyles.section}>
              <Text style={indexStyles.label}>Nome:</Text>
              <TextInput
                style={[
                  indexStyles.input,
                  !editable && indexStyles.inputDisabled,
                  { fontSize: width > 768 ? 18 : 16 },
                ]}
                placeholder="Digite seu nome"
                placeholderTextColor={Colors.placeholder}
                value={name}
                onChangeText={setName}
                editable={editable}
              />
            </View>

            <View style={indexStyles.section}>
              <Text style={indexStyles.label}>Email:</Text>
              <TextInput
                style={[
                  indexStyles.input,
                  !editable && indexStyles.inputDisabled,
                  { fontSize: width > 768 ? 18 : 16 },
                ]}
                placeholder="Digite seu email"
                placeholderTextColor={Colors.placeholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                editable={editable}
              />
            </View>

            <View style={indexStyles.section}>
              <Text style={indexStyles.label}>Senha:</Text>
              <TextInput
                style={[
                  indexStyles.input,
                  !editable && indexStyles.inputDisabled,
                  { fontSize: width > 768 ? 18 : 16 },
                ]}
                placeholder="Digite sua senha"
                placeholderTextColor={Colors.placeholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                editable={editable}
              />
            </View>

            <View
              style={[
                indexStyles.section,
                { flexDirection: "row", marginTop: 30, flexWrap: "wrap", gap: 10 },
              ]}
            >
              {editable ? (
                <>
                  <TouchableOpacity
                    style={indexStyles.buttonSecondary}
                    onPress={handleCancel}
                    accessibilityLabel="Botão de cancelar alterações no perfil."
                    accessibilityRole="button"
                  >
                    <Text style={indexStyles.buttonSecondaryText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={indexStyles.buttonPrimary}
                    onPress={handleSave}
                    accessibilityLabel="Botão de salvar alterações no perfil."
                    accessibilityRole="button"
                  >
                    <Text style={indexStyles.buttonPrimaryText}>Salvar</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <View style={{ width: "100%", alignItems: "center" }}>
                  <TouchableOpacity
                    style={indexStyles.buttonPrimary}
                    onPress={() => setEditable(true)}
                    accessibilityLabel="Botão de editar perfil."
                    accessibilityRole="button"
                  >
                    <Text style={indexStyles.buttonPrimaryText}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      indexStyles.buttonDestructive,
                      { width: width > 768 ? 150 : 100, marginTop: 10 },
                    ]}
                    onPress={logout}
                    accessibilityLabel="Botão de sair da conta."
                    accessibilityRole="button"
                  >
                    <Text style={indexStyles.buttonDestructiveText}>Sair</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Profile;
