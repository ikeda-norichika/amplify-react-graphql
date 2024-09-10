import '@aws-amplify/ui-react/styles.css';
import { ThemeProvider } from '@aws-amplify/ui-react';
import { createRoot } from 'react-dom/client'
import { Amplify } from "aws-amplify"
import App from './App.tsx'
import './index.css'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "ap-northeast-1_0ASofsJU7",
      userPoolClientId: "4887ihfc4e4evaqiqq4o519bei",
      loginWith: {
        email: true
      }
    },
  }
})

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
)
