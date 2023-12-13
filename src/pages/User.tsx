import { IonContent, IonHeader, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonSearchbar, IonSkeletonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const User: React.FC = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
      // Fetch 100 users from randomuser.me
      axios.get('https://randomuser.me/api/?results=100').then((response) => {
        setUsers(response.data.results.sort((a: any,b: any) => { 
            if(a.name.first < b.name.first) { return -1; }
            if(a.name.first > b.name.first) { return 1; }
        }
           ));
        setIsLoading(false)
      }).catch((e) => {
        console.log("error:",e)
      });
    }, []);
  
    const removeUser = (index: number) => {
      const updatedUsers = [...users];
      updatedUsers.splice(index, 1);
      setUsers(updatedUsers);
    };

    const search =  (e: any) => {
        // console.log("trigger", e)
        const query: string = e.target.value.toLowerCase();

        let results = users.filter((user: any, i: number) => {
            
            return user.name.first.toLowerCase().includes(query)
        })

        setUsers(results)

    }
  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>(Angelo Palma - Applicant )Ionic React Random User App</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
    <IonSearchbar onChange={ (e) => { 

        // let delayTimer: any;
        // clearTimeout(delayTimer);
        // delayTimer = setTimeout(() => {
             search(e)
        // },300)
        
        }} animated={true} placeholder="Search here! "></IonSearchbar>
      <IonList>
        
        {isLoading ? 
                    <IonSkeletonText animated={true} style={{ width: '100%' }}></IonSkeletonText>
                    : users.map((user, index) => (
          <IonItemSliding key={index}>
            <IonItem>
              <IonLabel>
                <h2>{`${user?.name.first} ${user.name.last}`}</h2>
                <p>{user?.email}</p>
              </IonLabel>
            </IonItem>
            <IonItemOptions side="end">
              <IonItemOption
                color="danger"
                onClick={() => removeUser(index)}
              >
                Remove
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        ))}
      </IonList>
    </IonContent>
  </IonPage>
  );
};

export default User;
