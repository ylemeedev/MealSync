import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import Input from "../../../shared/components/Input";
import ButtonCustom from "../../../shared/components/ButtonCustom";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors, GlobalStyles } from "../../../assets";
import { LoginFormProps } from "../types/auth.types";
import { useAppNavigation } from "../../../app/navigation/types/rootNavigator.types";
import TextApp from "../../../shared/components/TextApp";
import { useState } from "react";
import { loginApi } from "../api/auth";
import { setToken, setRefreshToken } from "../services/auth.service";
import { fr } from "../../../shared/lang/fr";

export const LoginForm = ({
    onClickRegister,
    onClickForgotPassword,
}: LoginFormProps) => {
    const navigation = useAppNavigation();

    const [email, setEmail] = useState<string | null>();
    const [password, setPassword] = useState<string | null>();
    const [error, setError] = useState<string | null>();

    const handleLogin = async () => {
        if (!email || !password) return;

        try {
            const data = await loginApi(email, password);

            setToken(data.token);
            setRefreshToken(data.refresh_token);

            navigation.replace("Main", { screen: "Planning" });
        } catch (error: any) {
            if (error?.response?.status === 401) {
                setError("Identifiants incorrects");
            } else {
                setError("Une erreur est survenue");
            }
        }
    };

    return (
        <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
            <View>
                <TextApp style={{ ...GlobalStyles.h1, ...styles.h1 }}>
                    {fr.auth.title.login}
                </TextApp>

                {/* Email */}
                <View style={styles.inputGroup}>
                    <Icon name="mail" size={20} color={Colors.text} />
                    <Input
                        placeholder={fr.auth.placeholder.emailAddress}
                        autoCorrect={false}
                        autoCapitalize="none"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        onChangeText={(text) => setEmail(text)}
                        style={styles.input}
                    />
                </View>

                {/* Password */}
                <View style={{ ...styles.inputGroup, marginBottom: 10 }}>
                    <Icon name="lock" size={20} color={Colors.text} />
                    <Input
                        placeholder={fr.auth.placeholder.password}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        textContentType="password"
                        onChangeText={(text) => setPassword(text)}
                        style={styles.input}
                    />
                </View>

                <ButtonCustom
                    title={fr.btnForgottenPassword}
                    onPress={onClickForgotPassword}
                    styleButton={styles.btnForgotPassword}
                />
            </View>

            <View style={styles.bottomContainer}>
                {error && <TextApp style={styles.error}>{error}</TextApp>}

                <ButtonCustom
                    title={fr.btnLogin}
                    type="color"
                    onPress={handleLogin}
                />

                <View style={styles.btnRegisterContainer}>
                    <ButtonCustom
                        title={fr.btnRegister}
                        onPress={onClickRegister}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    bottomContainer: {
        justifyContent: "center",
        marginTop: 50,
    },
    inputGroup: {
        marginBottom: 20,
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 8,
        borderRadius: 15,
    },
    btnForgotPassword: {
        alignItems: "flex-end",
    },
    btnRegisterContainer: {
        marginTop: 10,
        alignItems: "center",
    },
    h1: {
        textAlign: "center",
        marginBottom: 20,
    },
    error: {
        textAlign: "center",
        color: Colors.danger,
    },
    input: {
        flex: 1,
    },
});
