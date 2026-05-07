import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CheckboxProps } from '../types/types'
import { Colors } from '../../assets'
import Icon from "react-native-vector-icons/MaterialIcons";

const Checkbox = ({ label, onPress, style, isChecked, ...props }: CheckboxProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ ...styles.container, ...style }} {...props} activeOpacity={1}>
            <Text>{label}</Text>
            <View style={styles.checkbox}>
                {isChecked ?
                    <Icon name="check-box-outline-blank" size={30} color={Colors.mainColor} />
                    :
                    <Icon name="check-box" size={30} color={Colors.mainColor} />
                }
            </View>
        </TouchableOpacity>
    )
}

export default Checkbox

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        /*         borderWidth: 1,
                borderColor: Colors.text, */
        paddingVertical: 7,
        paddingHorizontal: 5,
        borderRadius: 5,
        backgroundColor: Colors.white
    },
    checkbox: {
        marginLeft: 10
    }
})