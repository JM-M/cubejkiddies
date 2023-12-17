import getDiscountPrice from '../utils/product/getDiscountPrice';

type Props = {
  price?: number;
  moqs?: { minQuantity: number; price: number }[];
  wholesaleOnly?: boolean;
  discount?: number;
};

const ProductPricingTable = (props: Props) => {
  const { moqs = [], wholesaleOnly, discount } = props;
  let price;
  if (props.price && !wholesaleOnly) {
    price = getDiscountPrice({ price: props.price!, discount });
  }

  return (
    <table>
      <thead>
        <tr className='h-8 text-neutral-700 text-left'>
          <th className='w-[70px] font-medium'>MOQ</th>
          <th className='font-medium'>Price</th>
        </tr>
      </thead>
      <tbody>
        {!!price && !wholesaleOnly && (
          <tr className='h-8 text-neutral-700 text-left'>
            <td>1</td>
            <td>{price}</td>
          </tr>
        )}
        {moqs.map((moq, i) => {
          return (
            <tr key={i} className='h-8 text-neutral-700 text-left'>
              <td>{moq.minQuantity}</td>
              <td>{getDiscountPrice({ price: moq.price, discount })}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductPricingTable;
