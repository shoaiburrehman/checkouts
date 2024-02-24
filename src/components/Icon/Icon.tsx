import React from "react";
import {
    View,
    Image,
    StyleSheet,
    ImageSourcePropType,
    FlexStyle,
    ImageStyle,
    TouchableOpacity,
    GestureResponderEvent
} from "react-native";

type IconProps = {
    width: number | string;
    height: number | string;
    color?: string;
    source: ImageSourcePropType | string;
    containerStyles?: FlexStyle;
    imageStyles?: ImageStyle;
    onPress?: (event: GestureResponderEvent) => void;
    resizeContain?: boolean;
    activeOpacity?: number;
};

type IconStyles = {
    image: ImageStyle;
};

const Icon: React.FC<IconProps> = (props) => {
    const {
        width,
        height,
        source,
        color,
        containerStyles = {},
        imageStyles = {},
        onPress,
        resizeContain = true,
        activeOpacity = 0.8
    } = props;

    const isPressable: boolean = !!(onPress && typeof onPress === "function");

    const renderImage = () => (
        <Image
            source={source}
            style={[
                styles.image,
                resizeContain && { resizeMode: "contain" },
                { ...(color && { tintColor: color }), ...imageStyles }
            ]}
        />
    );

    return isPressable ? (
        <TouchableOpacity
            style={{ width, height, ...containerStyles }}
            onPress={onPress}
            activeOpacity={activeOpacity}
        >
            {renderImage()}
        </TouchableOpacity>
    ) : (
        <View style={{ width, height, ...containerStyles }}>{renderImage()}</View>
    );
};

const styles = StyleSheet.create<IconStyles>({
    image: {
        width: "100%",
        flex: 1
    }
});

export default Icon;
