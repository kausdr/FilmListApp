import { Colors } from "@/app/styles/colors";
import React, { useContext, useEffect, useRef } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import ImagePicker from "../dev/components/imagePicker";
import { UserContext } from "../dev/contexts/userContextAPI";
import { updateUser } from "../dev/services/user";
import { indexStyles } from "../styles/indexStyles";

export const Profile = () => {
    const { user, setUser, saveUserSession, logout } = useContext(UserContext);

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [image, setImage] = React.useState('');
    const [editable, setEditable] = React.useState<boolean>(false);
    const prevEmail = useRef<string>(email);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPassword(user.password);
            if (user.image) {
                setImage(user.image);
            }

            prevEmail.current = user.email;
        }
    }, [user])


    const handleSave = async () => {
        if (!user) return;
        setEditable(false)
        const newUser = {
            name,
            email,
            password,
            image,
        };

        try {
            const updatedUser = await updateUser(prevEmail.current, newUser)

            if (updatedUser) {
                setUser(updatedUser);
                await saveUserSession(updatedUser);
                prevEmail.current = email;
                Toast.show({ type: 'success', text1: 'Perfil atualizado!' });
            } else {
                Toast.show({ type: 'error', text1: 'Erro ao salvar', text2: 'Ocorreu um erro ao salvar o perfil.' });
            }

        } catch (error) {
            console.log('Erro ao atualizar usuário:', error);
            Toast.show({ type: 'error', text1: 'Erro de sistema', text2: 'Não foi possível salvar as alterações.' });
        }


    }

    const handleCancel = () => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPassword(user.password);
            setImage(user.image || '');
        }
        setEditable(false);
    }


    return (
        <View style={indexStyles.outerContainer}>
            <ScrollView style={indexStyles.innerContainer}
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View style={indexStyles.card}>
                    <Text style={indexStyles.pageTitle}>Perfil</Text>
                    <View style={indexStyles.section}>
                        <ImagePicker image={image} setImage={setImage} isEditable={editable} />
                        <Text style={indexStyles.title} >{name}</Text>
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
                        {editable ? (
                            <>
                                <TouchableOpacity style={indexStyles.buttonSecondary} onPress={() => handleCancel()}>
                                    <Text style={indexStyles.buttonSecondaryText}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={indexStyles.buttonPrimary} onPress={() => handleSave()}>
                                    <Text style={indexStyles.buttonPrimaryText}>Salvar</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <View style={[indexStyles.section, {width: '100%'}]}>
                                <TouchableOpacity style={indexStyles.buttonPrimary} onPress={() => setEditable(true)}>
                                    <Text style={indexStyles.buttonPrimaryText}>Editar</Text>
                                </TouchableOpacity>


                                <TouchableOpacity style={[indexStyles.buttonDestructive, {width: 100, alignSelf: 'center'}]} onPress={() => logout()}>
                                    <Text style={indexStyles.buttonDestructiveText}>Sair</Text>
                                </TouchableOpacity>
                            </View>
                        )}


                    </View>


                </View>



            </ScrollView>
        </View>
    );
};

export default Profile;
