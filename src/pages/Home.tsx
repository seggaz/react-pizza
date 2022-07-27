import React, { useCallback, useEffect, useRef} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filter/slice';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import Pagination from '../components/Pagination';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/slices/filter/selectors';
import { selectPizzaData } from '../redux/slices/pizza/selectors';
import { fetchPizzas } from '../redux/slices/pizza/asyncActions';

const Home: React.FC = () => {
//   const navigate = useNavigate();
  const dispatch = useAppDispatch();
//   const isMounted = useRef(false);

  const {items, status} = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const onChangeCategory = useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
   	const sortBy = sort.sortProperty.replace('-', '');
	const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );

    window.scroll(0, 0);
  };

// Если параметры изменились, то делае первый рендер
useEffect(() => {
//   if (isMounted.current) {
//     const params = {
//       categoryId: categoryId > 0 ? categoryId : null,
//       sortProperty: sort.sortProperty,
//       currentPage,
//     };

//     const queryString = qs.stringify(params, { skipNulls: true });

//     navigate(`/?${queryString}`);
//   }

//   const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
//   const sortObj = sortList.find((obj) => obj.sortProperty === params.sortBy);
//   dispatch(
//     setFilters({
//       searchValue: params.search,
//       categoryId: Number(params.category),
//       currentPage: Number(params.currentPage),
//       sort: sortObj || sortList[0],
//     }),
//   );

  getPizzas();
//   isMounted.current = true;
}, [categoryId, sort.sortProperty, searchValue, currentPage]);

// Парсим параметры в первый рендер
// useEffect(() => {
//   if (window.location.search) {
//     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
//     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
//     dispatch(
//       setFilters({
//         searchValue: params.search,
//         categoryId: Number(params.category),
//         currentPage: Number(params.currentPage),
//         sort: sort || sortList[0],
//       }),
//     );
//   }
//   isMounted.current = true;
// }, []);

  const pizzas = items.map((obj: any) => (
		<PizzaBlock key={obj.id} {...obj} />
  ));

  const sceletons = [...new Array(6)].map((_, index) => <Sceleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories 
			value={categoryId} 
			onChangeCategory={onChangeCategory} 
		 />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
	  {
		status === 'error' ? (
		<div className='content__error-info'>
			<h2>Произошла ошибка 😕</h2>
            <p>К сожалению удалось получить пиццы. Попробуйте повторить попытку позже</p>
		</div> 
		) : ( 
		<div className="content__items">{status === 'loading' ? sceletons : pizzas}</div>
	  	)}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;