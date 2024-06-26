import './Categories.css'
import { IonButton, IonPage } from "@ionic/react"
import { Category } from '../consant/index'

interface CategoriesProps {
    categories: Category[];
    activeCategory: string;
    setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
}

const Categories: React.FC<CategoriesProps> = ({ categories, activeCategory, setActiveCategory }) => {
    return (
            <div className="bar">
                <div className="buttons">
                    {categories.map((cat, index) => {
                        let isActive = cat.strCategory === activeCategory;
                        return (
                            <IonButton className={`button ${isActive ? 'active' : ''}`} key={index} onClick={() => setActiveCategory(cat.strCategory)}>
                                <div className="icon">
                                    <img src={cat.strCategoryThumb} alt={cat.strCategory} />
                                </div>
                                <span>{cat.strCategory}</span>
                            </IonButton>
                        )
                    })}
                </div>
            </div>
    )
}

export default Categories
