import styled from 'styled-components';

const NavbarStyle = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  color: white;
  text-transform: uppercase;
  font-size: 1.6rem;
  margin: 2rem;  
  &::after{
    height: 1px;
    background-color: #fff;
    content: "";
    width: 100%;
  }
  &::before{
    height: 1px;
    background-color: #fff;
    content: "";
    width: 100%;
    margin-bottom: 0.5rem;
  }
  a{
    text-decoration: none;
    color: #fff;
    padding: 0.5rem;
  }
  a:hover{
    color: #999;
  }
  li{
    display:inline;
    border:none;
    color: #fff;
    font-size: 1.2rem;
    font-weight:bolder;
    text-transform: uppercase;
    text-align: center;
    margin: 0 0.2rem;
    list-style:none;
    padding: 0rem 3rem;
  }
`;
export default NavbarStyle;