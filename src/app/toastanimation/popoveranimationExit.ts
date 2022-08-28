/* eslint-disable prefer-arrow/prefer-arrow-functions */

import { Animation } from '@ionic/angular';
import { createAnimation } from '@ionic/angular';

export function popupExitAnimation(
    baseEl: HTMLElement,
    options: any
): Animation {

    const baseAnimation = createAnimation('baseAnimation');
    const popAnimation = createAnimation('popaniamtion');
    const containerAnimation = createAnimation('containerAnimation');
    const divAnimation = createAnimation('divAnimation');

    const mw = baseEl.shadowRoot.querySelector('.modal-wrapper');
    const cont = baseEl.querySelector('.container');

    const divEl = baseEl.querySelector('.showDiv');

    divAnimation.addElement(divEl)
        .duration(200)
        .to('transform','translate3d(0,10em,0)')
        .to('opacity','0');


    popAnimation
        .addElement(mw)
        .duration(1000)
        .easing('cubic-bezier(0.01,1.21,1,0.98)')
        .beforeStyles({ '--ion-background-color': 'rgb(1,1,1,0)', background: 'rgb(1,1,1,0)'});

    containerAnimation.addElement(cont).duration(800)
        .easing('cubic-bezier(.56,.09,.36,1.45)').beforeStyles({ color: 'transparent' })
        .to('color', 'white');


    baseAnimation.addAnimation([popAnimation, containerAnimation,divAnimation]);

    return baseAnimation;

}
