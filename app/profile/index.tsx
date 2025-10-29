import { Colors } from "@/app/styles/colors";
import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import ImagePicker from "../dev/components/imagePicker";
import { takePhoto, uploadImage } from "../dev/services/user";
import { indexStyles } from "../styles/indexStyles";

export const Profile = () => {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [editable, setEditable] = React.useState<boolean>(false);
    const [image, setImage] = React.useState('');


    const handlePickImage = async () => {
        const uri = await uploadImage();
        if (uri) setImage(uri);
    };

    const handleTakePhoto = async () => {
        const uri = await takePhoto();
        if (uri) setImage(uri);
    };

    return (
        <ScrollView style={indexStyles.innerContainer}
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <View style={indexStyles.card}>
                <Text style={indexStyles.pageTitle}>Perfil</Text>
                <View style={indexStyles.section}>
                    <ImagePicker />
                    <Text style={indexStyles.title} >Nome</Text>
                </View>


                <View style={indexStyles.section}>
                    <Text style={indexStyles.label}>Nome:</Text>
                    <TextInput
                        style={[
                            indexStyles.input,
                            !editable && indexStyles.inputDisabled
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
                            !editable && indexStyles.inputDisabled
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
                            !editable && indexStyles.inputDisabled
                        ]}
                        placeholder="Digite sua senha"
                        placeholderTextColor={Colors.placeholder}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        editable={editable}
                    />
                </View>


                <View style={[indexStyles.section, { flexDirection: 'row', marginTop: 30 }]}>
                    <TouchableOpacity style={indexStyles.buttonSecondary} onPress={() => setEditable(false)}>
                        <Text style={indexStyles.buttonSecondaryText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={indexStyles.buttonPrimary} onPress={() => setEditable(true)}>
                        <Text style={indexStyles.buttonPrimaryText}>Salvar</Text>
                    </TouchableOpacity>

                </View>


            </View>



        </ScrollView>
    );
};