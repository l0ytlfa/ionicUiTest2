/* eslint-disable prefer-arrow/prefer-arrow-functions */

import { Animation } from '@ionic/angular';
import { createAnimation } from '@ionic/angular';

export function popupExitAnimation(
    baseEl: HTMLElement,
    options: any
): Animation {

    baseEl.classList.remove('popoverBackDropWideFilter'); //<--- remove here the back effects to avoid to see them for 1 second by standard CSS

    const baseAnimation = createAnimation('baseAnimation');
    const popAnimation = createAnimation('popaniamtion');

    popAnimation
        .addElement(baseEl)
        .duration(200)
        .to('opacity',0);


    baseAnimation.addAnimation([popAnimation]);

    return baseAnimation;

}
