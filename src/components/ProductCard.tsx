import { Link } from 'react-router-dom';
import { IonImg } from '@ionic/react';
import cx from 'classnames';
import ToggleWishlistIcon from './ToggleWishlistIcon';
import { NAIRA } from '../constants/unicode';
import { ProductAlgoliaRecord } from '../constants/schemas/product';
import useCategories from '../hooks/useCategories';
import useAuth from '../hooks/useAuth';
import getDiscountPrice from '../utils/product/getDiscountPrice';

interface Props {
  product: ProductAlgoliaRecord;
}

const ProductCard = ({ product }: Props) => {
  const { isLoggedIn } = useAuth();

  const {
    name,
    category,
    wholesaleOnly,
    price,
    moqs,
    objectID,
    image,
    discount,
  } = product;
  if (objectID === 'fed3d92e-54d2-41f5-b065-6f3e887f4c33') console.log(product);
  const { getCategoryFromId } = useCategories();
  const categoryName = getCategoryFromId(category)?.name;

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
    <div className='min-w-[150px] sm:min-w-[280px] md:min-w-[220px] lg:min-w-[290px]'>
      <Link to={`/store/products/${objectID}`} className='block'>
        <div className='relative w-full aspect-[5/6] mb-[10px] bg-gray-100 rounded-lg overflow-hidden'>
          {image && (
            <IonImg
              src={image}
              alt={name}
              className='h-full w-full bg-gray-200 object-cover'
            />
          )}
          {product && isLoggedIn && <ToggleWishlistIcon product={product} />}
        </div>
      </Link>
      <div>
        <div>
          <span className='block font-medium'>{name}</span>
        </div>
        <div>
          <span className='text-xs text-gray-500'>{categoryName}</span>
        </div>
        <div className='flex flex-col gap-2'>
          <div
            className={cx('inline-block -mb-[2px] text-base', {
              'line-through text-gray-700': discountedPrice,
            })}
          >
            {NAIRA}
            {priceRange || price?.toLocaleString()}
          </div>
          {!!discountedPrice && (
            <span className='inline-block -mb-[2px] text-base'>
              {NAIRA}
              {discountedPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
