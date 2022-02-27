export default function Component(props: { category: any }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-2xl m-4 flex flex-col w-72 h-96">
      <div className="flex items-center justify-center">
        < img className="w-56 h-60 rounded-lg" src={props.category.categoryImageUrl || '/images/product-image.jpg'} alt="Sunset in the mountains" />
      </div >
      <div className="px-6 pb-4 mt-4">
        <div className="font-bold text-xl mb-2">{props.category.categoryName}</div>
        <p className="text-gray-700 text-base">
          {props.category.categoryDescription}
        </p>
      </div>
    </div >
  );
}
