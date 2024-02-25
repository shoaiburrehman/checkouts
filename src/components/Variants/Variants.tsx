import { StyleSheet, View } from "react-native"
import { Text } from "../Text"

import { variantsType } from "../../models/product.model"

import { ThemeColors } from "../../styles"
import { hp, wp } from "../../utils/styles.utils"

type VariantsProps = {
    selectedVariants: variantsType[]
}

const Variants: React.FC<VariantsProps> = ({selectedVariants}) => {
    return(
        <View style={styles.container}>
            {selectedVariants.length > 0 && <Text size={24} bold>Variants</Text>}
            <View style={styles.variantsViiew}>
                {selectedVariants.map((item, index) => (
                    <View key={index} style={styles.variantView}>
                        <Text size={14} medium>{item.name}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
};

const styles = StyleSheet.create ({
    container: {
        marginVertical: hp(20)
    },
    variantsViiew: {
        flex: 1, 
        flexWrap: 'wrap', 
        flexDirection: 'row', 
        marginTop: hp(10)
    },
    variantView: {
        backgroundColor: ThemeColors.LightGray, 
        marginRight: wp(10), 
        marginBottom: wp(10), 
        padding: (10) 
    }
})

export default Variants
