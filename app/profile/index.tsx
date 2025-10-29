import { Colors } from "@/app/styles/colors";
import React, { useContext, useEffect } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import ImagePicker from "../dev/components/imagePicker";
import { UserContext } from "../dev/contexts/userContextAPI";
import { indexStyles } from "../styles/indexStyles";

export const Profile = () => {
    const { user } = useContext(UserContext);

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [image, setImage] = React.useState('');
    const [editable, setEditable] = React.useState<boolean>(false);


    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPassword(user.password);
            if (user.image) {
                setImage(user.image);
            }
        }
    }, [user])


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
                                <TouchableOpacity style={indexStyles.buttonSecondary} onPress={() => setEditable(false)}>
                                    <Text style={indexStyles.buttonSecondaryText}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={indexStyles.buttonPrimary} onPress={() => setEditable(false)}>
                                    <Text style={indexStyles.buttonPrimaryText}>Salvar</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TouchableOpacity style={indexStyles.buttonPrimary} onPress={() => setEditable(true)}>
                                    <Text style={indexStyles.buttonPrimaryText}>Editar</Text>
                                </TouchableOpacity>
                            </>
                        )}


                    </View>


                </View>



            </ScrollView>
        </View>
    );
};

export default Profile;