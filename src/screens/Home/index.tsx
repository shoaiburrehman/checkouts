import React from 'react';
import { View, FlatList} from 'react-native';
import { productsData } from '../../mock/products';
import { ProductCategory } from '../../models/product.model';
import CustomCheckbox from '../../components/Checkbox/CustomCheckbox';
import useProducts from '../../hooks/useProducts/useProducts';
import { hp, wp } from '../../utils/styles.utils';
import { Text } from '../../components/Text';
import { ThemeColors } from '../../styles';

const Home = () => {
  const { checkedItems, selectedVariants, isCheckedItem, toggleItem } = useProducts();

  const renderItem = ( item: ProductCategory, index: number, level: number) => {
    return(
      <View key={index}>
          <CustomCheckbox 
            title={item.name} 
            selected={isCheckedItem(item)}
            containerStyle={{
              alignSelf: 'flex-start', 
              paddingLeft: level * wp(20), 
              marginVertical: hp(5)
            }}
            onPress={() => toggleItem(item)}
          />
        {item.children && item.children.length > 0 && (
          <FlatList
            data={item.children}
            renderItem={({ item: child, index: ind }) => renderItem( child as ProductCategory, ind, level + 1 )}
            keyExtractor={(child) => child.id.toString()}
            nestedScrollEnabled={true}
          />
        )}
      </View>
    )
  };

  const Variants = () => {
    return(
      <View style={{marginVertical: hp(20)}}>
        {selectedVariants.length > 0 && <Text size={24} bold>Variants</Text>}
        <View style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row', marginTop: hp(10)}}>
          {selectedVariants.map((item, index) => (
            <View key={index} style={{backgroundColor: ThemeColors.LightGray, marginRight: wp(10), marginBottom: wp(10), padding: (10) }}>
              <Text size={14} medium>{item.name}</Text>
            </View>
          ))}
        </View>
      </View>
    )
  }

  return (
    <View style={{ margin: hp(20) }}>
      <Text size={24} bold>Browse Products</Text>
      <FlatList
        data={productsData}
        renderItem={({item, index}) => renderItem(item, index, 0)}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={() => <Variants/>}
        style={{marginTop: hp(10)}}
      />
    </View>

  );
};

export default Home;