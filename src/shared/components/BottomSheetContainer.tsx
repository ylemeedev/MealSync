import { StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { Colors } from "../../assets";
import { BottomSheetContainerProps } from "../types/types";

export const BottomSheetContainer = forwardRef(({ children, bgColor }: BottomSheetContainerProps, ref) => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    useImperativeHandle(ref, () => ({
        snapToIndex: (index: -1 | 0 | 1) => bottomSheetRef.current?.snapToIndex(index),
        open: () => bottomSheetRef.current?.expand(),
        close: () => bottomSheetRef.current?.close(),
    }));

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            backgroundStyle={{
                backgroundColor: bgColor ? bgColor : Colors.background,
            }}
            enablePanDownToClose
            enableDynamicSizing={true}
            keyboardBehavior="interactive"
        >
            <BottomSheetView style={styles.contentContainer}>{children}</BottomSheetView>
        </BottomSheet>
    );
});

const styles = StyleSheet.create({
    contentContainer: {
        //flex: 1,
    },
});
