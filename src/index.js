import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
import {onError} from '@apollo/client/link/error';

const errorLink = onError(({graphqlErrors, networkError}) =>{
  if(graphqlErrors){
    graphqlErrors.map(({message, location, path}) =>{
      alert(`GraphQL Error ${message}`)
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({uri: 'http://localhost:4000'})
])

export const client = new ApolloClient({
  link, 
  cache: new InMemoryCache(),
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
