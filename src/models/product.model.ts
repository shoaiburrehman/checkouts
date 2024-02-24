// export type ProductModel = {
//     id: number,
//     name: string,
//     level: number
// }

export type Product = {
    id: number;
    name: string;
};

export type ProductCategory = Product & {
    parentId?: number | undefined;
    children?: (ProductCategory | Brand)[];
};

type Brand = Product & {
    children: Model[];
};

type Model = Product & {
    children: Variant[];
};

type Variant = Product