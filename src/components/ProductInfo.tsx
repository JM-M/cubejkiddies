import cx from 'classnames';
import { NAIRA } from '../constants/unicode';
import ProductStars from './ProductStars';
import ProductPricingTable from './ProductPricingTable';
import getDiscountPrice from '../utils/product/getDiscountPrice';

interface Props {
  name: string;
  price?: number;
  wholesaleOnly?: boolean;
  moqs?: { minQuantity: number; price: number }[];
  rating: {
    count: number;
    numUserReviews: number;
    ranking: number;
  } | null;
  discount?: number;
}

const ProductInfo = ({
  name,
  price,
  moqs,
  wholesaleOnly,
  rating,
  discount,
}: Props) => {
  const avgRating = rating ? rating.count / rating.numUserReviews : null;

  let discountedPrice;

  let priceRange;
  if (moqs?.length) {
    let prices = moqs.map(({ price }) => price);
    if (!wholesaleOnly && price) prices.unshift(price);
    prices = prices.sort();
    const lowestPrice = prices[0];
    const highestPrice = prices[prices.length - 1];
    priceRange = `${lowestPrice.toLocaleString()} - ${highestPrice.toLocaleString()}`;
    if (discount)
      discountedPrice = `${getDiscountPrice({
        price: lowestPrice,
        discount,
      })?.toLocaleString()} - ${getDiscountPrice({
        price: highestPrice,
        discount,
      })?.toLocaleString()}`;
  } else if (price && discount) {
    discountedPrice = getDiscountPrice({ price, discount });
  }

  return (
    <div className='pt-4 flex flex-col gap-[10px] md:pt-0'>
      <h3 className='font-medium text-lg'>{name}</h3>
      <div className='flex flex-col gap-2'>
        <div
          className={cx('inline-block -mb-[2px] text-base', {
            'line-through text-gray-700': discountedPrice,
          })}
        >
          {NAIRA}
          {priceRange || price?.toLocaleString()}
        </div>
        <ProductPricingTable
          wholesaleOnly={wholesaleOnly}
          moqs={moqs}
          price={price}
        />
        {!!discount && !!discountedPrice && (
          <span className='inline-block -mb-[2px] text-base'>
            {NAIRA}
            {discountedPrice.toLocaleString()}
          </span>
        )}
      </div>
      {avgRating && (
        <span className='flex gap-1 text-gray-500'>
          <ProductStars max={5} value={avgRating} /> ({rating?.numUserReviews})
        </span>
      )}
    </div>
  );
};

export default ProductInfo;
