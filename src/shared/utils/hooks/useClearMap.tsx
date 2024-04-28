import {useEffect} from 'react';

export const UseClearMap = () => {
    useEffect(() => {
        const element = document.querySelector(
            '.react-flow__panel.react-flow__attribution.bottom.right'
        );
        if (element) element.remove();
    }, []);
};
