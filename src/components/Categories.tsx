import React from "react";

type CategoriesProps = {
	value: number;
	onChangeCategory: (idx: number) => void;
	// getCategories?: (categories: string[]) => void;
};

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = React.memo(({value, onChangeCategory}) => {

// getCategories?.(categories);	
return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li 
		  	key={i}
		  	onClick={() => onChangeCategory(i)} 
			className={value === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
);
export default Categories;