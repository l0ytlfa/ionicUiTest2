/* eslint-disable prefer-arrow/prefer-arrow-functions */

/*import { Animation } from '@ionic/angular';
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


}*/


import { Animation } from '@ionic/angular';
import { createAnimation } from '@ionic/angular';



export const popupEnterAnimation = (baseEl: HTMLElement, options?: any): Animation => {
  let originY = 'top';
  let originX = 'left';

  const contentEl = baseEl.shadowRoot.querySelector('.popover-content') as HTMLElement;
  const contentDimentions = contentEl.getBoundingClientRect();
  const contentWidth = contentDimentions.width;
  const contentHeight = contentDimentions.height;

  const bodyWidth = (baseEl.ownerDocument as any).defaultView.innerWidth;
  const bodyHeight = (baseEl.ownerDocument as any).defaultView.innerHeight;

  // If ev was passed, use that for target element
  const targetDim = options.event  && options.event.target && (options.event.target as HTMLElement).getBoundingClientRect();

  const targetTop = targetDim != null && 'top' in targetDim ? targetDim.top : bodyHeight / 2 - contentHeight / 2;
  const targetLeft = targetDim != null && 'left' in targetDim ? targetDim.left : bodyWidth / 2;
  const targetWidth = (targetDim && targetDim.width) || 0;
  const targetHeight = (targetDim && targetDim.height) || 0;

  const arrowEl = baseEl.shadowRoot.querySelector('.popover-arrow') as HTMLElement;

  const arrowDim = arrowEl.getBoundingClientRect();
  const arrowWidth = arrowDim.width;
  const arrowHeight = arrowDim.height;

  if (targetDim == null) {
    arrowEl.style.display = 'none';
  }

  const arrowCSS = {
    top: targetTop + targetHeight,
    left: targetLeft + targetWidth / 2 - arrowWidth / 2
  };

  const popoverCSS: { top: any; left: any } = {
    top: targetTop + targetHeight + (arrowHeight - 1),
    left: targetLeft + targetWidth / 2 - contentWidth / 2
  };

  // If the popover left is less than the padding it is off screen
  // to the left so adjust it, else if the width of the popover
  // exceeds the body width it is off screen to the right so adjust
  //
  let checkSafeAreaLeft = false;
  let checkSafeAreaRight = false;

  // If the popover left is less than the padding it is off screen
  // to the left so adjust it, else if the width of the popover
  // exceeds the body width it is off screen to the right so adjust
  // 25 is a random/arbitrary number. It seems to work fine for ios11
  // and iPhoneX. Is it perfect? No. Does it work? Yes.
  if (popoverCSS.left < POPOVER_IOS_BODY_PADDING + 25) {
    checkSafeAreaLeft = true;
    popoverCSS.left = POPOVER_IOS_BODY_PADDING;
  } else if (
    contentWidth + POPOVER_IOS_BODY_PADDING + popoverCSS.left + 25 > bodyWidth
  ) {
    // Ok, so we're on the right side of the screen,
    // but now we need to make sure we're still a bit further right
    // cus....notchurally... Again, 25 is random. It works tho
    checkSafeAreaRight = true;
    popoverCSS.left = bodyWidth - contentWidth - POPOVER_IOS_BODY_PADDING;
    originX = 'right';
  }

  // make it pop up if there's room above
  if (targetTop + targetHeight + contentHeight > bodyHeight && targetTop - contentHeight > 0) {
    arrowCSS.top = targetTop - (arrowHeight + 1);
    popoverCSS.top = targetTop - contentHeight - (arrowHeight - 1);

    baseEl.className = baseEl.className + ' popover-bottom';
    originY = 'bottom';
    // If there isn't room for it to pop up above the target cut it off
  } else if (targetTop + targetHeight + contentHeight > bodyHeight) {
    contentEl.style.bottom = POPOVER_IOS_BODY_PADDING + '%';
  }

  arrowEl.style.top = arrowCSS.top + 'px';
  arrowEl.style.left = arrowCSS.left + 'px';

  contentEl.style.top = popoverCSS.top + 'px';
  contentEl.style.left = popoverCSS.left + 'px';

  if (checkSafeAreaLeft) {
    contentEl.style.left = `calc(${popoverCSS.left}px + var(--ion-safe-area-left, 0px))`;
  }

  if (checkSafeAreaRight) {
    contentEl.style.left = `calc(${popoverCSS.left}px - var(--ion-safe-area-right, 0px))`;
  }

  contentEl.style.transformOrigin = originY + ' ' + originX;

  const baseAnimation = createAnimation();
  const backdropAnimation = createAnimation();
  const wrapperAnimation = createAnimation();
  const contentrAnimation = createAnimation();

  backdropAnimation
    .addElement(baseEl.shadowRoot.querySelector('ion-backdrop')!)
    .fromTo('opacity', 0.01, 'var(--backdrop-opacity)')
    .beforeStyles({
      'pointer-events': 'none'
    })
    .afterClearStyles(['pointer-events']);

  wrapperAnimation
    .addElement(baseEl.shadowRoot.querySelector('.popover-wrapper')!)
    .fromTo('opacity', 0.01, 1);

  contentrAnimation
    .addElement(baseEl.shadowRoot.querySelector('.popover-content'))
    .fromTo('transform','scale3d(0.8,0.8,1)','scale3d(1,1,1)')
    .easing('cubic-bezier(0.18,0.89,0.32,1.27)');


  return baseAnimation
    .addElement(baseEl)
    .easing('ease')
    .duration(300)
    .addAnimation([backdropAnimation, wrapperAnimation,contentrAnimation]);
};

const POPOVER_IOS_BODY_PADDING = 5;
