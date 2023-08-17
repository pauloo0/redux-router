// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/style.css'
import { store } from './app/store.ts'
import { Provider } from 'react-redux'

import { fetchUsers } from './features/users/usersSlice.ts'

store.dispatch(fetchUsers())

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // {/* </React.StrictMode> */}
)
