export default function Component(props: { product: any, addProduct: (productName: string) => void }) {
  return (
    <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
      <div className="m-2">
        <img
          src={props.product.previewImageUrl || '/images/product-image.jpg'}
          alt={props.product.productName}
          className="w-full h-full object-center object-cover group-hover:opacity-75 max-h-80"
        />
        <div className="flex flex-row items-center">
          <div className="w-full">
            <h3 className="mt-4 text-sm text-gray-700">{props.product.productName}</h3>
            {
              props.product.discountPercentage
                ? <span className="flex flex-row">
                  <p className="mt-1 text-lg font-medium line-through text-gray-400">$ {props.product.price}</p>
                  <p className="mt-1 ml-4 text-lg font-medium text-red-500">$ {(props.product.price * (1 - props.product.discountPercentage / 100)).toFixed(2)}</p>
                </span>
                : <p className="mt-1 text-lg font-medium text-gray-900">$ {props.product.price}</p>
            }
          </div>
          <div className="mr-2 w-full flex justify-end">
            <button className="flex flex-row bg-slate-300 px-4 py-2 rounded-full"
              onClick={() => props.addProduct(props.product.productName)}
            >add to <img className="h-full w-7" src="/images/cart.svg" /></button>
          </div>
        </div>
      </div>
    </div>

  );
}
