export type NamesForm = "login" | "register" | "forgotPassword" | null;

export interface LoginFormProps {
    onClickRegister(): void;
    onClickForgotPassword(): void;
}

export interface RegisterFormProps {
    onClickLogin(): void;
    onClickForgotPassword(): void;
}

export interface ForgotPasswordFormProps {
    onClickLogin(): void;
}

export interface FormContainerProps {
    formShow: NamesForm;
    onClickBottomSheet: (formShow: Exclude<NamesForm, null>) => void;
}

export interface FormBottomSheetProps {
    formShow: NamesForm;
}
