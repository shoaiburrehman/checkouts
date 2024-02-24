import React, { FC } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text } from "../Text";
import { Icon } from "../Icon";
import { wp } from "../../utils/styles.utils";
import { ThemeColors } from "../../styles";

const CustomCheckbox: FC<{
    title: string;
    selected: Boolean;
    onPress?: () => void;
    containerStyle?: object;
    radioStyle?: object;
}> = ({ title = "Radio Text", selected = true, onPress, containerStyle, radioStyle }) => {

    return (
        <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
            <View style={styles.radioContainer}>
                {selected && (
                    <Icon
                        source={require("../../assets/icons/check.png")}
                        width={8}
                        height={8}
                        color={ThemeColors.Black}
                    />
                )}
            </View>
            <Text regular leftSpacing={10} size={14.5}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomCheckbox;

const styles = StyleSheet.create<any>({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    radioContainer: {
        width: wp(15),
        backgroundColor: "tansparent",
        height: wp(15),
        padding: wp(5),
        borderWidth: wp(1),
        borderColor: ThemeColors.Black,
        justifyContent: "center",
        alignItems: "center"
    },
    radioStyle: {
        width: wp(10),
        height: wp(10),
        backgroundColor: ThemeColors.Black,
        alignSelf: "center"
    }
});
