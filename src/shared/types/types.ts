import React from "react";
import { TextInputProps, StyleProp, TextStyle } from "react-native";

export type BackgroundVariant = "linear" | "overflow" | string;
export interface ScreenContainerProps {
    children: React.ReactNode;
    safeAreaTop?: boolean;
    safeAreaBottom?: boolean;
    bgColor?: BackgroundVariant;
}

export interface HeaderContainerProps {
    children: React.ReactNode;
    bgColor?: string;
}

export interface InputProps extends TextInputProps {
    style?: StyleProp<TextStyle>;
}

export type ButtonVariant = "light" | "color" | "linear";
export interface ButtonTextProps {
    color: ButtonTextColor;
}
export type ButtonTextColor = "light" | "dark";
export interface ButtonCustomProps {
    title: string;
    type?: ButtonVariant;
    styleButton?: object;
    styleText?: object;
    titleColor?: ButtonTextColor;
    disabled?: boolean;
    onPress(): void;
}

export interface TextAppProps {
    children: React.ReactNode;
    style?: object;
}

export interface BottomSheetContainerProps {
    children: React.ReactNode;
    bgColor?: string;
}

export type BottomSheetRef = {
    snapToIndex: (index: -1 | 0 | 1) => void;
    open: () => void;
    close: () => void;
};

export interface CheckboxProps {
    label: string;
    isChecked: boolean;
    onPress: () => void;
    style?: StyleProp<TextStyle>;
}

export interface ModalCustomProps {
    children: React.ReactNode;
    isModalVisible: boolean;
    onClose: () => void;
}

export interface HydraResponse<T> {
    member: T[];
}
