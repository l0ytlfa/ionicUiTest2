/* eslint-disable prefer-arrow/prefer-arrow-functions */

import { Animation } from '@ionic/angular';
import { createAnimation } from '@ionic/angular';

export function popupEnterAnimation(
    baseEl: HTMLElement,
    options: any
): Animation {

    debugger;

    const baseAnimation = createAnimation('baseAnimation');
    const popAnimation = createAnimation('popaniamtion');
    const containerAnimation = createAnimation('containerAnimation');

    const mw = baseEl.shadowRoot.querySelector('.popover-wrapper');
    const cont = mw.childNodes[1];


    popAnimation
        .addElement(cont)
        .duration(300)
        //.easing('cubic-bezier(0.18,0.89,0.32,1.27)')   <--- bounce in
        //.easing('cubic-bezier(0.01,1.21,1,0.98)')
        //.beforeStyles({"z-index":999999 })


    baseAnimation.addAnimation([popAnimation]);

    return baseAnimation;


}
