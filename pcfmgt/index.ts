import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from 'react-dom';
import { createRoot, Root } from 'react-dom/client';
import {MGT} from './mgt';
import {MGTLogin} from './mgt-login';
import { Providers } from '@microsoft/mgt-element';
import { Msal2Provider } from '@microsoft/mgt-msal2-provider';

export class pcfmgt implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private container: HTMLDivElement;
    private notifyOutputChanged: () => void;
    private root: Root;
    constructor(){}

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
    {
        this.notifyOutputChanged = notifyOutputChanged;
        //this.props.numberOfFaces = context.parameters.numberOfFaces.raw || DEFAULT_NUMBER_OF_FACES;
        context.mode.trackContainerResize(true);
        console.log(context);
        //let testt = context.resources.getResource("right-arrow", this.setImage.bind(this, false, ".png"),this.showError.bind(this));
        //console.log(test);

        this.container = container;
     
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        this.root = createRoot(this.container);
       
        this.root.render(React.createElement(
            MGTLogin,
            {}
        ));
    }


    public getOutputs(): IOutputs
    {
        return {};
    }


    public destroy(): void
    {
        this.root.unmount();
    }
}
