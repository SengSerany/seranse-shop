import ProductForm from '../../components/product/ProductForm';

function ProductNew() {
  return (
    <div className="flex-column justify-content-center">
      <h1 className="h1-title uppercase ff-primary fs-700 text-center">
        Ajouter un nouveau produit
      </h1>
      <ProductForm />
    </div>
  );
}

export default ProductNew;
