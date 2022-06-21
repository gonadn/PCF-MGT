import * as React from 'react';
import { Component, useRef } from 'react';
import { useState, useEffect, useMemo } from 'react';
import { Person, People, PeoplePicker } from '@microsoft/mgt-react';
import { Providers } from '@microsoft/mgt-element';
import { Msal2Provider } from '@microsoft/mgt-msal2-provider';
import { MgtPerson, MgtPeople } from '@microsoft/mgt-components';
import { PublicClientApplication } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
const arr: any[] = ['adnan.gondal@bouvet.no','fredrik.nilsen@bouvet.no','petter.hansen@bouvet.no']
export const MGT = React.memo((props: any) => {

    const personRef = useRef<MgtPerson>();
    const peopleRef = useRef<MgtPeople>();
    const { instance } = useMsal();
    const [people, setPeople] = useState([]);

    const peop: any[] = [{
        id: "1",
        displayName: "Antonio",
        mail: "adnan.gondal@bouvet.no",
        userPrincipalName: "adnan.gondal@bouvet.no",
        imAddress: "adnan.gondal@bouvet.no"
        
        }, {
        id: "2",
        displayName: "Daniel",
        mail: "adnan.gondal@bouvet.no",
        userPrincipalName: "adnan.gondal@bouvet.no",
        imAddress: "adnan.gondal@bouvet.no"
        }];

    useEffect(() => {
        console.log('Test...');
        Providers.globalProvider = new Msal2Provider({
            clientId: '40b57631-f041-46bc-838e-1b96cba1fe0e',
            authority: "https://login.microsoftonline.com/c317fa72-b393-44ea-a87c-ea272e8d963d",
            redirectUri: "http://localhost:8181",
            scopes: ["Directory.Read.All","People.Read","Presence.Read.All","User.Read","User.Read.All"]
        });
    },[]);

    const requestProfileData = () => {
        const msalConfig: any  = {
            auth: {
                tenantId: 'c317fa72-b393-44ea-a87c-ea272e8d963d',
                clientId: '40b57631-f041-46bc-838e-1b96cba1fe0e',
                authority: "https://login.microsoftonline.com/c317fa72-b393-44ea-a87c-ea272e8d963d",
                redirectUri: "http://localhost:8181"
            },
            cache: {
                cacheLocation: "sessionStorage",
                storeAuthStateInCookie: true
            }
          };
      
      
      let msalInst = new PublicClientApplication(msalConfig);
      msalInst
          .acquireTokenSilent({
            scopes: ["User.Read','User.Read.All','Presence.Read.All','People.Read','Directory.Read.All"],
            authority: `https://login.microsoftonline.com/c317fa72-b393-44ea-a87c-ea272e8d963d`,
          })
          .then((response) => {
            console.log(response);
          });
    }

    const handleSelectionChanged = (e:any) => {
        setPeople(e.target.selectedPeople);
    };

    return (
        <>
            <h1>MGT Test</h1>
            {/* <PeoplePicker selectionChanged={handleSelectionChanged}></PeoplePicker> */}
            <PeoplePicker people={people} selectionMode='single' />

            <Person personQuery="me" />
            Selected People: <People people={people} />

            <Person ref={personRef} personQuery="adnan.gondal@bouvet.no" />
            <People
               ref={peopleRef}
               peopleQueries={arr}
                show-max="3">
            </People>
        </>
    );

});
