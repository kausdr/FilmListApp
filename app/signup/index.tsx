import { Colors } from "@/app/styles/colors";
import { Link } from "expo-router";
import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { indexStyles } from "../styles/indexStyles";


const SignUp = () => {

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

                    <Link href="/login" asChild>
                        <TouchableOpacity style={indexStyles.link}>
                            <Text style={indexStyles.linkText}>Já tem uma conta? Faça login.</Text>
                        </TouchableOpacity>
                    </Link>


                    <TouchableOpacity style={[indexStyles.buttonPrimary, { marginTop: 30 }]} onPress={() => console.log('Clicou!')}>
                        <Text style={indexStyles.buttonPrimaryText}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>



            </ScrollView>
        </View>
    );
};


export default SignUp;