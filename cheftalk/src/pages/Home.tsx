import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage } from '@ionic/react';
import './Home.css';
import RecipeCard from '../components/RecipeCard';
import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import axios from 'axios';


const Home: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('beef');
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    getCategory();
  },[])

  useEffect(() => {
    fetchRecipesByCategory(activeCategory);
  }, [activeCategory]);

  const getCategory = async () => {
    try{
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
      if(response && response.data){
        setCategories(response.data.categories)
      }

    }catch(err){
      console.log(err);
    }
  };

  const fetchRecipesByCategory = async (category: string) => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if (response && response.data) {
        const meals = await Promise.all(
          response.data.meals.map(async (meal: any) => {
            const mealDetails = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
            return mealDetails.data.meals[0];
          })
        );
        setRecipes(meals);
      }
    } catch (err) {
      console.log(err);
    }
  };




  const handleSearch = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRecipes(data.meals || []); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  return (
    <IonPage>
      <IonMenu contentId="main-content" className='menu'>
        <IonHeader className='menu-header'>
          <div className="text">
            <h3>ChefTalk</h3>
          </div>
          <IonButtons slot="start">
              <IonMenuButton className='button'>
              <img src="./image/web.png" alt="" />
              </IonMenuButton>
            </IonButtons>
            <div className="image">
            <img src="./image/logo.png" alt="" />
          </div>

        </IonHeader>
        <IonContent className="ion-padding">

        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader className='header'>

            <IonButtons slot="start" className='buttons'>
              <IonMenuButton class='ionbutton'>
                <img src="./image/web.png" alt="" />
              </IonMenuButton>
              <div className="image">
              <img src="./image/logo.png" alt="" />
              </div>  
            </IonButtons>

            <div className="text">
            <h3>Find the same recipe for your self with your voice command.</h3>
          </div>
          <div className="search">
            <label htmlFor="search">
              <img src="./image/search-engine.png" alt="" />
            <input type="search" name='search' id='search' placeholder='Search...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} autoComplete='off'/>
            </label>
            <button onClick={handleSearch}>
              <img src="./image/search.png" alt="" />
            </button>
          </div>
          <div className="category">
            {categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>}
          </div>
        </IonHeader>
        <IonContent className="content">
          <RecipeCard recipes={recipes}/>
        </IonContent>
      </IonPage>
    </IonPage>
  );
};

export default Home;
