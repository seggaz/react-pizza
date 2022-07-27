import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
	const [pizza, setPizza] = useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>();
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchPizza() {
			try {
				const {data} = await axios.get('https://62ceeece486b6ce8264fe13c.mockapi.io/items/' + id);
				setPizza(data)
			} catch (error) {
				alert('Ошибка пи получении пиццы!');
				navigate('/');
			}
		}
		
		fetchPizza();
	}, []);
		
		if (!pizza) {
			return <>'Загрузка...'</>;
		}

	return (
		<div className='container'>
			<img src={pizza.imageUrl} alt="Pizza" />
			<h2>{pizza.title}</h2>
			<h4>{pizza.price} ₽</h4>
			<Link to='/'>
				<button className="button button--outline button--add">
            		<span>Назад</span>
          		</button>
			</Link>
		</div>
	);
};

export default FullPizza;