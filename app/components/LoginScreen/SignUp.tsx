import { Colors } from "@/app/styles/colors";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../index";
import { indexStyles } from "../../styles/indexStyles";
type SignupcreenProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;


export const SignUp = () => {
    const navigation = useNavigation<SignupcreenProp>();

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <View style={indexStyles.outerContainer}>
            <ScrollView style={indexStyles.innerContainer}
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View style={indexStyles.card}>
                    <Text style={indexStyles.pageTitle}>Cadastrar</Text>
                    <View style={indexStyles.section}>
                        <Text style={indexStyles.label}>Nome:</Text>
                        <TextInput
                            style={indexStyles.input}
                            placeholder="Digite seu nome"
                            placeholderTextColor={Colors.placeholder}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View style={indexStyles.section}>
                        <Text style={indexStyles.label}>Email:</Text>
                        <TextInput
                            style={indexStyles.input}
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
                            style={indexStyles.input}
                            placeholder="Digite sua senha"
                            placeholderTextColor={Colors.placeholder}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                    </View>

                    <TouchableOpacity style={indexStyles.link} onPress={() => navigation.navigate('Login')}>
                        <Text style={indexStyles.linkText}>
                            Já tem uma conta? Faça login.
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[indexStyles.buttonPrimary, { marginTop: 30 }]} onPress={() => console.log('Clicou!')}>
                        <Text style={indexStyles.buttonPrimaryText}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>



            </ScrollView>
        </View>
    );
};