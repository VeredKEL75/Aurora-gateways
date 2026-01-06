import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from './Components/LayoutArea/Layout/Layout.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './Redux/Store.ts'
import { interceptor } from './Utils/interceptor.ts'

interceptor.create(); //gives the token to the header in every request 
createRoot(document.getElementById('root')!).render(
    //Wrap the app with the Provider to make the Redux store available to all components
    <Provider store={store}>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>

    </Provider>
)
