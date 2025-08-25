import { render } from 'preact'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'
import App from './app.jsx'

render(
  <ChakraProvider>
    <App />
  </ChakraProvider>, 
  document.getElementById('app')
)