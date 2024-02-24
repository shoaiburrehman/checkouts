import { Dimensions } from "react-native";
import {
    widthPercentageToDP as lwp,
    heightPercentageToDP as lhp
} from "react-native-responsive-screen";

// here 375 is adobe design width (px)
const getWidthValue = (px: number) => ((px * 100) / 37500) * 100;

// here 812 is adobe design height (px)
const getHeightValue = (px: number) => ((px * 100) / 81200) * 100;

export const wp = (px: number) => lwp(getWidthValue(px));

export const hp = (px: number) => lhp(getHeightValue(px));

export const SCREEN_WIDTH = Dimensions.get("screen").width;
export const SCREEN_HEIGHT = Dimensions.get("screen").height;
