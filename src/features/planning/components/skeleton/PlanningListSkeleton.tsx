import { View, StyleSheet } from "react-native";
import SkeletonBox from "../../../../shared/components/SkeletonBox";
import { Colors, GlobalStyles } from "../../../../assets";

export default function PlanningListSkeleton() {
    return (
        <View style={styles.container}>
            {/* Dates banner */}
            <View style={styles.banner}>
                <SkeletonBox width="100%" height={35} />
            </View>

            {/* List items */}
            <View style={[styles.list, GlobalStyles.ph]}>
                <View style={styles.card}>
                    <SkeletonBox width="80%" height={16} />
                </View>

                <View style={styles.card}>
                    <SkeletonBox width="70%" height={16} />
                </View>

                <View style={styles.card}>
                    <SkeletonBox width="75%" height={16} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 0,
    },

    banner: {
        marginTop: 0,
        marginBottom: 5,
    },

    list: {
        flex: 1,
    },

    card: {
        marginVertical: 10,
        paddingVertical: 25,
        paddingHorizontal: 20,
        borderRadius: 12,
        backgroundColor: Colors.backgroundSkeleton,
    },
});
