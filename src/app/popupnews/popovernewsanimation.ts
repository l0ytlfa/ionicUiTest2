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
    const cont = baseEl.shadowRoot.querySelector('.container');


    popAnimation
        .addElement(mw)
        .duration(300)
        .easing('cubic-bezier(0.01,1.21,1,0.98)')
        .beforeStyles({ width: '90%',height: '75%' ,'border-radius':'1em'})
        .to('transform','translate3d(0, 0, 0)');

    containerAnimation.addElement(cont).duration(800)
        .easing('cubic-bezier(.56,.09,.36,1.45)').beforeStyles({ color: 'transparent' })
        .to('color', 'white');


    baseAnimation.addAnimation([popAnimation, containerAnimation]).afterAddWrite(function(){
        //--> remove animation stopper added in init of swiper
        window.document.querySelector('.fashion-slider-no-transition').classList.remove('fashion-slider-no-transition');
    });

    return baseAnimation;

}
