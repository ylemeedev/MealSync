import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors, GlobalStyles } from "../../../assets";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { FormContainerProps, NamesForm } from "../types/auth.types";

export const FormContainer = ({
    formShow,
    onClickBottomSheet,
}: FormContainerProps) => {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                ...GlobalStyles.ph,
                ...styles.formContainer,
                paddingBottom: insets.bottom + 50,
            }}
        >
            {formShow === "login" && (
                <LoginForm
                    onClickRegister={() => onClickBottomSheet("register")}
                    onClickForgotPassword={() =>
                        onClickBottomSheet("forgotPassword")
                    }
                />
            )}
            {formShow === "register" && (
                <RegisterForm
                    onClickLogin={() => onClickBottomSheet("login")}
                    onClickForgotPassword={() =>
                        onClickBottomSheet("forgotPassword")
                    }
                />
            )}
            {formShow === "forgotPassword" && (
                <ForgotPasswordForm
                    onClickLogin={() => onClickBottomSheet("login")}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    formContainer: {
        backgroundColor: Colors.background,
        paddingTop: 20,
    },
});
