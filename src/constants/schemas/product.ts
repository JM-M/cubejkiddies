import { object, string, number, array, mixed, boolean, InferType } from 'yup';

const productSchema = object({
  id: string(),
  name: string().required(),
  category: string().required(),
  description: string().required(),
  weight: number().required(),
  wholesaleOnly: boolean(),
  price: number().required(),
  moqs: array().of(
    object({
      minQuantity: number().required(),
      price: number().required(),
    })
  ),
  discount: number().required().min(1).max(100),
  variations: object(),
  stocks: array()
    .of(
      object({
        images: array().of(mixed()).required(),
        quantity: number().required(),
        variationCombination: object(),
      })
    )
    .required(),
  rating: object({
    count: number().required(),
    numUserReviews: number().required(),
    ranking: number().required(),
  }),
});

export type Product = InferType<typeof productSchema>;

export type ProductAlgoliaRecord = {
  category: string;
  description: string;
  image: string;
  name: string;
  objectID: string;
  wholesaleOnly: boolean;
  price?: number;
  moqs?: {
    minQuantity: number;
    price: number;
  }[];
  stocks: string[];
  variations: { [key: string]: string };
  discount?: number;
};

export default productSchema;
