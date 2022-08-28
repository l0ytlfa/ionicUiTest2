/* eslint-disable prefer-arrow/prefer-arrow-functions */

import { Animation } from '@ionic/angular';
import { createAnimation } from '@ionic/angular';

export function popupEnterAnimation(
    baseEl: HTMLElement,
    options: any
): Animation {

    baseEl.classList.remove('popoverBackDropDarker'); //<--- remove here the back effects to avoid to see them for 1 second by standard CSS

    const baseAnimation = createAnimation('baseAnimation');
    const popAnimation = createAnimation('popaniamtion');
    const containerAnimation = createAnimation('containerAnimation');

    const mw = baseEl.shadowRoot.querySelector('.modal-wrapper');
    const cont = baseEl.shadowRoot.querySelector('.container');


    popAnimation
        .addElement(mw)
        .duration(600)
        .easing('cubic-bezier(0.01,1.21,1,0.98)')
        .beforeStyles({ '--ion-background-color': 'rgb(1,1,1,0)', background: 'rgb(1,1,1,0)'})
        .to('opacity',0);

    containerAnimation.addElement(cont).duration(800)
        .easing('cubic-bezier(.56,.09,.36,1.45)').beforeStyles({ color: 'transparent' })
        .to('color', 'white');


    baseAnimation.addAnimation([popAnimation, containerAnimation]);

    return baseAnimation;

}
