/* eslint-disable prefer-arrow/prefer-arrow-functions */

import { Animation } from '@ionic/angular';
import { createAnimation } from '@ionic/angular';

export function popupEnterAnimation(
    baseEl: HTMLElement,
    options: any
): Animation {

    const baseAnimation = createAnimation('baseAnimation');
    const popAnimation = createAnimation('popaniamtion');
    const containerAnimation = createAnimation('containerAnimation');

    const mw = baseEl.shadowRoot.querySelector('.modal-wrapper');
    const cont = baseEl.querySelector('.container');


    popAnimation
        .addElement(mw)
        .duration(1000)
        .easing('cubic-bezier(.56,.09,.36,1.45)')
        .beforeStyles({ 'backdrop-filter': 'blur(10px) grayscale(30%)',transform: 'translate3d(0, 0, 0)', '--ion-background-color': 'rgb(1,1,1,0)', background: 'rgb(1,1,1,0)' })

    containerAnimation.addElement(cont).duration(800)
        .easing('cubic-bezier(.56,.09,.36,1.45)').beforeStyles({ color: 'transparent' })
        .to('color', 'white');


    baseAnimation.addAnimation([popAnimation, containerAnimation]);

    return baseAnimation;


}
