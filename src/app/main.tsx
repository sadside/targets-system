import {RouterProvider} from '@tanstack/react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {router} from 'app/providers/routing/router.ts';
import 'shared/styles/global.scss';
import 'shared/styles/reset.scss';
import 'shared/styles/variables.scss';
import 'reactflow/dist/style.css';
// eslint-disable-next-line import/order
import {ChakraProvider, extendTheme} from '@chakra-ui/react';
import {Toaster} from 'shared/ui/components/ui/sonner.tsx';

const theme = extendTheme({
    styles: {
        global: {
            body: {
                bg: 'rgb(18 18 18 / 98%)',
                color: 'white',
                fontFamily: 'Alegreya Sans, serif',
            },
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <Toaster />
            <RouterProvider router={router} />
        </ChakraProvider>
    </React.StrictMode>
);
