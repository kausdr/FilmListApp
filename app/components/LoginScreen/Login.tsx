import { Colors } from "@/app/styles/colors";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../../index";
import { indexStyles } from "../../styles/indexStyles";

type LoginScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export const Login = () => {
    const navigation = useNavigation<LoginScreenProp>();

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
                    <View style={indexStyles.section}>
                        <Text style={indexStyles.pageTitle}>Login</Text>
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
                    <TouchableOpacity style={indexStyles.link} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={indexStyles.linkText}>
                            Não tem uma conta?
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[indexStyles.buttonPrimary, { marginTop: 30 }]} onPress={() => console.log('Clicou!')}>
                        <Text style={indexStyles.buttonPrimaryText}>Entrar</Text>
                    </TouchableOpacity>
                </View>



            </ScrollView>
        </View>
    );
};