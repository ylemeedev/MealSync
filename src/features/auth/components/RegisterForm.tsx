import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import Input from "../../../shared/components/Input";
import ButtonCustom from "../../../shared/components/ButtonCustom";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors, GlobalStyles } from "../../../assets";
import { RegisterFormProps } from "../types/auth.types";
import TextApp from "../../../shared/components/TextApp";

export const RegisterForm = ({
    onClickLogin,
    onClickForgotPassword,
}: RegisterFormProps) => {
    return (
        <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
            <View>
                <TextApp style={{ ...GlobalStyles.h1, ...styles.h1 }}>
                    Créer un compte
                </TextApp>

                {/* Username */}
                <View style={styles.inputGroup}>
                    <Icon name="account-circle" size={20} color={Colors.text} />
                    <Input
                        placeholder="Pseudo"
                        autoCorrect={false}
                        autoCapitalize="none"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        style={styles.input}
                    />
                </View>

                {/* Email */}
                <View style={styles.inputGroup}>
                    <Icon name="mail" size={20} color={Colors.text} />
                    <Input
                        placeholder="Adresse E-mail"
                        autoCorrect={false}
                        autoCapitalize="none"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        style={styles.input}
                    />
                </View>

                {/* Password */}
                <View style={styles.inputGroup}>
                    <Icon name="lock" size={20} color={Colors.text} />
                    <Input
                        placeholder="Votre mot de passe"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        textContentType="password"
                        style={styles.input}
                    />
                </View>

                {/* Confirm Password */}
                <View style={{ ...styles.inputGroup, marginBottom: 10 }}>
                    <Icon name="lock" size={20} color={Colors.text} />
                    <Input
                        placeholder="Confirmez votre mot de passe"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        autoCorrect={false}
                        textContentType="password"
                        style={styles.input}
                    />
                </View>

                <ButtonCustom
                    title="Mot de passe oublié"
                    onPress={onClickForgotPassword}
                    styleButton={styles.btnForgotPassword}
                />
            </View>

            <View style={styles.bottomContainer}>
                <ButtonCustom
                    title="Créer un compte"
                    type="color"
                    onPress={() => console.log("Créer un compte")}
                />
                <View style={styles.btnRegisterContainer}>
                    <ButtonCustom title="Se connecter" onPress={onClickLogin} />
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
        marginBottom: 30,
    },
    input: {
        flex: 1,
    },
});
