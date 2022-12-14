import styled, {createGlobalStyle} from 'styled-components';
import Background from './Images/natural.jpeg';

export const GlobalStyle = createGlobalStyle`
html{
    height: 100%;
}

body{
    background-image: url(${Background});
    background-size: cover;
    margin: 0;
    padding: 0 20px;
    display: flex;
    justify-content: center;
}

*{
    box-sizing: border-box;
    font-family: 'Catamaran', sans-serif;
}
`;

export const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;

> p {
    color: #fff;
}

.score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
}

h1 {
  font-family: Fascinate Inline, 
}

`