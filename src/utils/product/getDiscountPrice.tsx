const getDiscountPrice = ({
  price,
  discount,
}: {
  price: number;
  discount?: number;
}) => {
  if (!discount) return price;
  return price - price * (discount / 100);
};

export default getDiscountPrice;
