import React from 'react';
import './RecipeCard.css';
import { IonCard, IonPage } from '@ionic/react';
import { useHistory } from 'react-router';

interface RecipeCardProps {
  recipes: any[];
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipes = [] }) => {

  const history = useHistory();

  const handleCardClick = (recipe: any) => {
    history.push(`/details/${recipe.idMeal}`, { recipe });
  };

  return (
    <IonPage>
    <div className="foods">
      <div className="content-food">
        {recipes.map(recipe => (
          <IonCard className='card' key={recipe.idMeal} onClick={() => handleCardClick(recipe)}>
            <div className="recipes">
              <img src={recipe.strMealThumb} alt={recipe.strMeal} />
              <h1>{recipe.strMeal}</h1>
              <div className="time">
                <span>{recipe.strCategory}</span>
                <h2>{recipe.strArea}</h2>
              </div>
            </div>
          </IonCard>
        ))}
      </div>
    </div>
    </IonPage>
  );
}

export default RecipeCard;
