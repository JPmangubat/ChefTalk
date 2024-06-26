import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Start from './pages/Start';
import { homeOutline} from 'ionicons/icons';
import './App.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Home from './pages/Home';
import Details from './components/Details';
import VoiceSearch from './components/VoiceSearch';

setupIonicReact();

const App: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/start">
        <Start />
      </Route>
      <Route exact path="/voiceSearch">
        <VoiceSearch />
      </Route>
      <Route exact path="/home">
        <Home />
      </Route>
      <Route exact path="/details/:id">
        <Details />
      </Route>
      <Route exact path="/">
        <Redirect to="/start" />
      </Route>
    </IonRouterOutlet>
    <IonTabBar slot="bottom" className='tab'>
      <IonTabButton tab="home" href="/home" style={{backgroundColor:'transparent'}}>
        <img src="./image/home.png" style={{width:30}} />
        <IonLabel className='text'>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="voiceSearch" href="/voiceSearch" style={{backgroundColor:'transparent'}}>
        <img src="./image/mic.png" style={{width:30}} />
        <IonLabel className='text'>Voice Search</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default App;