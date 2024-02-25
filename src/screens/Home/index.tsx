import React from 'react';
import { View, FlatList, StyleSheet} from 'react-native';

import { ProductCategory } from '../../models/product.model';
import useProducts from '../../hooks/useProducts/useProducts';
import CustomCheckbox from '../../components/Checkbox/CustomCheckbox';
import Variants from '../../components/Variants/Variants';
import { Text } from '../../components/Text';

import { hp, wp } from '../../utils/styles.utils';

import { productsData } from '../../mock/products';

const Home = () => {
  const { selectedVariants, isCheckedItem, toggleItem } = useProducts(productsData);

  const renderItem = ( item: ProductCategory, index: number, level: number) => {
    return(
      <View key={index}>
          <CustomCheckbox 
            title={item.name} 
            selected={isCheckedItem(item)}
            containerStyle={styles.containerStyle(level)}
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

  return (
    <View style={styles.container}>
      <Text size={24} bold>Browse Products</Text>
      <FlatList
        data={productsData}
        renderItem={({item, index}) => renderItem(item, index, 0)}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={() => <Variants selectedVariants={selectedVariants}/>}
        style={styles.mt10}
      />
    </View>

  );
};

const styles = StyleSheet.create<any> ({
  container: {
    margin: hp(20)
  },
  containerStyle: (level: number) => ({    
    alignSelf: 'flex-start', 
    paddingLeft: level * wp(20), 
    marginVertical: hp(5)
  }),
  mt10: {
    marginTop: hp(10)
  }
})

export default Home;