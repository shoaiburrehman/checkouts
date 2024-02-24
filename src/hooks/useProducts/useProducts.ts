import React, { useState } from 'react';
import { ProductCategory } from '../../models/product.model';
import { productsData } from '../../mock/products';

interface UseCheckboxTreeReturnType {
  checkedItems: ProductCategory[];
  selectedVariants: variantsType[]
  isCheckedItem: (item: ProductCategory) => boolean;
  toggleItem: (item: ProductCategory) => void;
}

export type variantsType = {
  id: number;
  name: string;
}

const useProducts = (initialData?: ProductCategory[]): UseCheckboxTreeReturnType => {
    const [checkedItems, setCheckedItems] = useState<ProductCategory[]>([]);
    const [selectedVariants, setSelectedVariants] = useState<variantsType[]>([])

    const toggleItem = (item: ProductCategory): void => {
        const isChecked = isCheckedItem(item);
        let updatedItems: ProductCategory[];

        if (isChecked) {
            updatedItems = removeItemAndDescendants(item);
        } else {
            updatedItems = [...checkedItems, item, ...getAllDescendants(item)];
        }

        getSelectedVariants(updatedItems);
        setCheckedItems(updatedItems);
    };

    const getSelectedVariants = (checkedItems: any[]) => {
        const tempVariants: variantsType[] = [];
    
        const getDescendantCategory = (data: ProductCategory[], item: ProductCategory, level: number) => {
            // Use a depth-first search to traverse the data tree
            for (const product of data) {
                // If the current product matches the item's parentId, return it with level
                if (product.id === item.parentId) {
                    return { descendant: product, level };
                }
                // If the current product has children, recursively search them
                if (product.children) {
                    const descendant = getDescendantCategory(product.children, item, level + 1);
                    // If a descendant is found, return it immediately
                    if (descendant.descendant) {
                        return descendant;
                    }
                }
            }
            // If no matching descendant is found, return null with level null
            return { descendant: null, level: null };
        };

        const checkAllSelected = (item) => {
            const { descendant, level } = getDescendantCategory(productsData, item, 0);
            return descendant.children?.every((child) => checkedItems.some((checkedItem) => checkedItem.id === child.id));
        }

        checkedItems.forEach((item) => {
    
            const { descendant, level } = getDescendantCategory(productsData, item, 0);
            const allSelected = level > 1 ? checkAllSelected(item) : false;
            const existingVariantIndex = tempVariants.findIndex((selectedVariant) => selectedVariant.id === item.parentId);

            if (existingVariantIndex !== -1) {
                // If the item is found, update its name based on the condition
                if (allSelected) {
                    tempVariants[existingVariantIndex].name = 'All ' + descendant.name;
                } else if(level < 2){
                    tempVariants[existingVariantIndex].name = 'All ' + item.name;
                } else {
                    tempVariants[existingVariantIndex].name = tempVariants[existingVariantIndex].name.concat(`, ${item.name}`);
                }
            } else {
                // If the item is not found, add a new entry to tempVariants
                let variant = {
                    id: level < 2 ? item.id : item.parentId,
                    name: allSelected ? 'All ' + descendant.name : level < 2 ? "All " + item.name : descendant.name + " " + item.name
                };
                tempVariants.push(variant);
            }
        });
    
        setSelectedVariants(tempVariants);
    };
    
    const isCheckedItem = (item: ProductCategory): boolean => {
        if (item.children && item.children.length > 0) {
            // If the item has children, check if all of its children are checked
            return item.children.every((child) =>
                checkedItems.some((checkedItem) => checkedItem.id === child.id)
            );
        } else {
            // If the item has no children, check if it is directly checked
            return checkedItems.some((checkedItem) => checkedItem.id === item.id);
        }
    };

    const removeItemAndDescendants = (item: ProductCategory): ProductCategory[] => {
        const parentId = item.id;

        // Filter out the item being removed and its direct children
        let filteredItems = checkedItems.filter((checkedItem) => {
            if (checkedItem.parentId === parentId || checkedItem.id === parentId || checkedItem.id === item.parentId) {
                return false;
            }
            return true;
        });

        // Remove all descendants of the item being removed
        const descendants = getAllDescendants(item);
        filteredItems = filteredItems.filter((filteredItem) => {
            return !descendants.some((descendant) => descendant.id === filteredItem.id);
        });

        return filteredItems;
    };
    
    const getAllDescendants = (item: ProductCategory): ProductCategory[] => {
        if (item.children && item.children.length > 0) {
            return item.children.reduce((acc, child) => [...acc, child, ...getAllDescendants(child)], []) as ProductCategory[];
        } else {
            return [];
        }
    };

    return { checkedItems, selectedVariants, isCheckedItem, toggleItem };
};

export default useProducts;
