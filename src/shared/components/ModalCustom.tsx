import { StyleSheet, Modal, View } from "react-native";
import React from "react";
import { ModalCustomProps } from "../types/types";

const ModalCustom = ({ children, isModalVisible, onClose }: ModalCustomProps) => {
    return (
        <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={onClose}>
            <View style={styles.overlay}>{children}</View>
        </Modal>
    );
};

export default ModalCustom;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "center",
        alignItems: "center",
    },
});
