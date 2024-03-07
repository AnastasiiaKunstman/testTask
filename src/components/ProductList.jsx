import { useProducts } from '../hooks/useProducts';
import Pagination from './Pagination/Pagination';
import ProductItem from './ProductItem/ProductItem';
import { ProductFilter } from './ProductFilter/ProductFilter';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const ProductList = () => {
    const { isLoading, filteredItems, page, onPageChange, onFilterChange, pages } = useProducts();

    return (
        <>
            <Header />
            <ProductFilter onSubmit={onFilterChange} disabled={isLoading} />
            <main>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    filteredItems?.map((item) => (
                        <ProductItem key={item.id} product={item} />
                    ))
                )}
            </main>
            <Pagination page={page} onPageChange={onPageChange} pages={pages} disabled={isLoading} />
            <Footer />
        </>
    );
};

export default ProductList;