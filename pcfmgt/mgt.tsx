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



    useEffect(() => {

        Providers.globalProvider = new Msal2Provider({
            clientId: '***ClientID***',
            authority: "https://login.microsoftonline.com/***TenantId***",
            redirectUri: "http://localhost:8181",
            scopes: ["Directory.Read.All","People.Read","Presence.Read.All","User.Read","User.Read.All"]
        });
    },[]);

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

            <Person ref={personRef} personQuery="testuser@contoso.no" />
            <People
               ref={peopleRef}
               peopleQueries={arr}
                show-max="3">
            </People>
        </>
    );

});
