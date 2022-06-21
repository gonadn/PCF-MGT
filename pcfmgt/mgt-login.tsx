import * as React from 'react';
import { useState, useEffect } from 'react';
import { Login } from '@microsoft/mgt-react'; 
import { Person } from '@microsoft/mgt-react';
import { Providers, ProviderState } from '@microsoft/mgt-element';
import { Msal2Provider } from '@microsoft/mgt-msal2-provider';


export const MGTLogin = React.memo((props: any) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    useEffect(() => {

        Providers.globalProvider = new Msal2Provider({
            clientId: '***ClientID****',
            authority: "https://login.microsoftonline.com/***TenantID***",
            redirectUri: "http://localhost:8181",
            scopes: ["Directory.Read.All","People.Read","Presence.Read.All","User.Read","User.Read.All"]
        });

        const updateState = () => {
            const provider = Providers.globalProvider;
            setIsSignedIn(provider && provider.state === ProviderState.SignedIn);
        };

        console.log(isSignedIn);
      
          Providers.onProviderUpdated(updateState);
          updateState();
      
          return () => {
            Providers.removeProviderUpdatedListener(updateState);
          }
        
    },[props]);

  return (
    <div className="App">
      <header>
        <Login />
      </header>
      {isSignedIn &&    // Checking if user is signed in that below HTML will be rendered
        <div>
          <div>
            <p>Person Component : <Person personQuery="me"></Person></p>
          </div>
        </div>}
    </div>
  );
});
