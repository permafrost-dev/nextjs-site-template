import { useEffect } from 'react';

const useEffectOnce = function (effect) {
    useEffect(effect, []);
};

export const useRemoveConditionalElements = el => {
    useEffectOnce(() => {
        if (typeof el === 'function') {
            el = el();
        }

        function removeConditionalElements(ele) {
            const element = ele as unknown as HTMLElement;

            if (element.hasChildNodes()) {
                element.childNodes.forEach(child => {
                    removeConditionalElements(child);
                });
            }

            if (typeof element['attributes'] !== 'undefined') {
                for (let attr of element.attributes) {
                    if (attr.name === 'r-if') {
                        const value = <unknown>attr.value;
                        let evalAttr;

                        if (typeof value === 'boolean') {
                            evalAttr = () => value;
                        } else {
                            evalAttr = Function(attr.value);
                        }

                        if (!evalAttr()) {
                            element.remove();
                            break;
                        } else {
                            element.hasAttribute('r-if') && element.removeAttribute('r-if');
                            element.hasAttribute('reactif') && element.removeAttribute('reactif');
                            element.classList.remove('hidden');
                        }
                    }
                }
                element.hasAttribute('r-if') && element.removeAttribute('r-if');
                element.hasAttribute('r-cloak') && element.removeAttribute('r-cloak');
            }
        }

        removeConditionalElements(el.current);
        document.getElementsByTagName('main')[0].hasAttribute('r-cloak') && document.getElementsByTagName('main')[0].removeAttribute('r-cloak');
    });
};
