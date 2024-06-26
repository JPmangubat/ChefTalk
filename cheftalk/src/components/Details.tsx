import { RouteComponentProps, useHistory, useLocation } from 'react-router';
import './Details.css'
import { IonButton, IonContent, IonHeader, IonPage, IonSpinner } from "@ionic/react";
import { useEffect, useState } from 'react';
import axios from 'axios';

const Details: React.FC = () => {
    const location = useLocation();
    const history = useHistory();
    const recipe = (location.state as any)?.recipe;
    const [fullRecipe, setFullRecipe] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!recipe) {
            history.replace('/home');
        } else {
            fetchFullRecipe(recipe.idMeal);
        }
    }, [recipe, history]);

    const fetchFullRecipe = async (id: string) => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            if (response && response.data && response.data.meals) {
                setFullRecipe(response.data.meals[0]);
                console.log('Fetched full recipe:', response.data.meals[0]);
            }
        } catch (err) {
            console.error('Error fetching full recipe:', err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBackButtonClick = () => {
        history.push('/home');
    };

    const getIngredients = () => {
        let ingredients = [];
        if (fullRecipe) {
            for (let i = 1; i <= 20; i++) {
                if (fullRecipe[`strIngredient${i}`]) {
                    ingredients.push(
                        `${fullRecipe[`strIngredient${i}`]} - ${fullRecipe[`strMeasure${i}`]}`
                    );
                }
            }
        }
        return ingredients;
    };

    const getInstructions = () => {
        if (fullRecipe && fullRecipe.strInstructions) {
            return fullRecipe.strInstructions.split('\n').map((instruction, index) => (
                <div key={index}>
                    {index + 1}. {instruction.trim()}
                </div>
            ));
        }
        return null;
    };

    if (loading) {
        return (
            <IonPage>
                <IonHeader className='header-recipe'>
                    <IonButton onClick={handleBackButtonClick} className='button'>
                        <img src="./image/left-arrow.png" alt="" />
                    </IonButton>
                </IonHeader>
                <IonContent className='content-recipe'>
                    <IonSpinner />
                </IonContent>
            </IonPage>
        );
    }

    if (!fullRecipe) {
        return null;
    }

    return(
        <IonPage>
            <IonHeader className='header-recipe'>
                <IonButton onClick={handleBackButtonClick} className='button'>
                    <img src="./image/left-arrow.png" alt="" />
                </IonButton>
            </IonHeader>
            <IonContent className='content-recipe'>
                <div className="item-photo">
                    <img src={fullRecipe.strMealThumb} alt={fullRecipe.strMeal} />
                </div>
                <div className="item-name">
                    <h1>{fullRecipe.strMeal}</h1>
                </div>
                <div className="benefits">
                    <div className="item">
                        <h3>Category</h3>
                        <h2>{fullRecipe.strCategory}</h2>
                    </div>
                    <div className="item">
                        <h3>Country</h3>
                        <h2>{fullRecipe.strArea}</h2>
                    </div>
                </div>
                <div className="steps">
                    <div className="step">
                    <div className="ingredients">
                        <h3>Ingredients:</h3>
                    <ul>
                        {getIngredients().map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    </div>
                    <div className="divider"></div>
                    <div className="instructions">
                        <h3>Instructions:</h3>
                        <h5>
                        {getInstructions()}
                        </h5>
                    </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Details;