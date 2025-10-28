import { Dimensions, StyleSheet } from "react-native";
const { height } = Dimensions.get('window');

export const indexStyles = StyleSheet.create({

    outerContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        height: height,
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'column',
        gap: 5,
        width: '80%',
    },
    section: {
        flexDirection: 'column',
        gap: 10,
    },
    card: {
        flexDirection: 'column',
        width: 300,
        justifyContent: 'center',
        alignSelf: 'center',
        gap: 20,
        padding: 20,
    },
    input: {
        padding: 15,
        borderColor: '#302626ff',
        borderWidth: 1,
        borderRadius: 5,
    },
    inputDisabled: {
        padding: 15,
        backgroundColor: '#eaeaeaff',
        borderColor: '#eaeaeaff',
        borderWidth: 1,
        borderRadius: 5,
    },
    label: {
        color: '#353535ff',
        fontWeight: 'bold',
    },
    buttonPrimary: {
        flex: 1,
        backgroundColor: '#023b84ff',
        padding: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonPrimaryText: {
        color: '#ffffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    buttonSecondary: {
        flex: 1,
        backgroundColor: '#d6e4f7ff',
        padding: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonSecondaryText: {
        color: '#001f48ff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    link: {
        alignItems: 'flex-end',
    },
    linkText: {
        color: '#023b84ff',

    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 60,
        alignSelf: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#00224fff',
        marginBottom: 20,
    }


});