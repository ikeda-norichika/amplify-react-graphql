import '@aws-amplify/ui-react/styles.css';
import { ThemeProvider } from '@aws-amplify/ui-react';
import { createRoot } from 'react-dom/client'
import { Amplify } from "aws-amplify"
import App from './App.tsx'
import './index.css'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "ap-northeast-1_C00YkVitq",
      userPoolClientId: "37duv6oakatjgfh3u17lsrncv6",
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
