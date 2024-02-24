import React from "react";
import { Text as RNText, StyleSheet, TextStyle, TextProps } from "react-native";

import { FontFamily, ThemeColors } from "../../styles";

import { types as styleTypes } from "../../styles";
import { wp } from "../../utils/styles.utils";

export type TextComponentProps = {
    regular?: boolean;
    medium?: boolean;
    SemiBold?: boolean;
    bold?: boolean;
    centered?: boolean;
    end?: boolean;
    right?: boolean;
    inverse?: boolean;
    underlined?: boolean;
    textProps?: TextProps;
    numberOfLines?: number;
    color?: ThemeColors | string;
    size?: number;
    weight?: styleTypes.FontWeights;
    leftSpacing?: number;
    rightSpacing?: number;
    topSpacing?: number;
    bottomSpacing?: number;
    letterSpacing?: number;
    style?: TextStyle | TextStyle[];
    width?: number | undefined;
    height?: number | undefined;
    children?: string | string[] | number | number[];
    opacity?: number;
    capitalize?: boolean;
};

const Text: React.FC<TextComponentProps> = (props) => {
    const {
        regular,
        medium,
        SemiBold,
        bold,
        centered,
        end,
        right,
        underlined,
        textProps,
        numberOfLines,
        color,
        opacity,
        size,
        weight,
        capitalize,
        leftSpacing,
        rightSpacing,
        topSpacing,
        bottomSpacing,
        letterSpacing,
        children,
        width = undefined,
        height = undefined,
        style = {}
    } = props;


    return (
        <RNText
            style={[
                styles.default,
                regular && { fontFamily: FontFamily.Regular },
                medium && { fontFamily: FontFamily.Medium },
                SemiBold && { fontFamily: FontFamily.SemiBold },
                bold && { fontFamily: FontFamily.Bold },
                centered && styles.centered,
                end && styles.alignEnd,
                right && styles.right,
                underlined && styles.underlined,
                !!color && { color },
                !!opacity && { opacity },
                !!size && { fontSize: wp(size) },
                !!weight && { fontWeight: weight },
                !!capitalize && styles.capitalize,
                !!leftSpacing && { marginLeft: wp(leftSpacing) },
                !!rightSpacing && { marginRight: wp(rightSpacing) },
                !!topSpacing && { marginTop: wp(topSpacing) },
                !!bottomSpacing && { marginBottom: wp(bottomSpacing) },
                !!letterSpacing && { letterSpacing: wp(letterSpacing) },
                !!width && { width: wp(width) },
                !!height && { height: wp(height) },
                style
            ]}
            numberOfLines={numberOfLines}
            {...textProps}
        >
            {children}
        </RNText>
    );
};

const styles = StyleSheet.create<any>({
    default: {
        fontFamily: FontFamily.Regular,
        fontSize: wp(16),
        color: ThemeColors.Black
    },
    centered: {
        textAlign: "center"
    },
    alignEnd: {
        alignSelf: "flex-end"
    },
    right: {
        textAlign: "right"
    },
    underlined: {
        textDecorationLine: "underline"
    },
    capitalize: {
        textTransform: "capitalize"
    }
});

export default Text;
