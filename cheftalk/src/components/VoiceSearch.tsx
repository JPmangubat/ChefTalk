import { IonPage } from "@ionic/react"
import './VoiceSearch.css';

const VoiceSearch: React.FC = () => {
    return(
        <IonPage>
            <div className="mic">
                <img src="./image/mic.png" alt="" />
                <h1>Speak to search recipes.</h1>
            </div>
        </IonPage>
    )
}

export default VoiceSearch;
