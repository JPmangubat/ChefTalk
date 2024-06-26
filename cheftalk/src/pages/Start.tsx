import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import "./Start.css"
import { useHistory } from 'react-router';
import { useEffect } from 'react';

const Start: React.FC = () => {

  const history = useHistory();

  useEffect(() => {
    const timeout = setTimeout(() => {
      history.push('/home');
    }, 3000);
    return () => clearTimeout(timeout);
  }, [history]);

    return (
      <IonPage>
        <div className="container">
        <h1>Welcome to</h1>
        <img src="./image/logo1.png" alt="" />
        <h2>Your Voice Controlled Culinary Assistant</h2>
        </div>
      </IonPage>

    );
  };
  
  export default Start;