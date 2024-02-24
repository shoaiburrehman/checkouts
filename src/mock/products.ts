import { ProductCategory } from "../models/product.model";

export const productsData: ProductCategory[] = [
    {
        id: 1,
        name: 'Mobile Phones',
        children: [
            {
            id: 2,
            name: 'Apple',
            parentId: 1,
            children: [
                    {
                        id: 3,
                        name: 'iPhone 8',
                        parentId: 2,
                        children: [
                            { id: 4, name: '128 GB', parentId: 3 },
                            { id: 5, name: '256 GB', parentId: 3 },
                            { id: 6, name: '512 GB', parentId: 3 },
                        ],
                    },
                    {
                        id: 7,
                        name: 'iPhone X',
                        parentId: 2,
                        children: [
                            { id: 8, name: '128 GB' , parentId: 7 },
                            { id: 9, name: '256 GB', parentId: 7 },
                        ],
                    },
                    {
                        id: 15,
                        name: 'iPhone 11',
                        parentId: 2,
                    },
                ],
            },
            {
                id: 19,
                name: 'Samsung',
                parentId: 1,
            }
        ],
    },
    {
        id: 11,
        name: 'Computers',
        children: []
    },
    {
        id: 12,
        name: 'Watches',
        children: []
    },
    {
        id: 13,
        name: 'TVs',
        children: []
    },
];
