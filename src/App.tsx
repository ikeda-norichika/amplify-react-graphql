import reactLogo from "./assets/react.svg";
import viteLogo from "../public/vite.svg";
import {
  Authenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import './App.css'

function App() {
  return (
    <Authenticator>
      {({ signOut }) => (
        <View className="App">
        <Card>
          <div>
          <Image src={reactLogo} className="App-logo" alt="logo" />
          <Image src={viteLogo} className="App-logo" alt="logo" />
          </div>
          <Heading level={1}>We now have Auth!</Heading>
        </Card>
        <Button onClick={signOut}>Sign Out</Button>
      </View>
      )}
    </Authenticator>
  )
}

export default App