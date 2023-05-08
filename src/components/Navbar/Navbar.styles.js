import styled from 'styled-components';

const NavbarStyle = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  color: white;
  text-transform: uppercase;
  margin: 2rem;  
  &::before{
    height: 1px;
    background-color: #fff;
    content: "";
    width: 100%;
    margin-bottom: 0.6rem;
  }
  &::after{
    height: 1px;
    background-color: #fff;
    content: "";
    width: 100%;
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
    font-weight:bolder;
    text-transform: uppercase;
    text-align: center;
    margin: 0 .2rem;
    list-style:none;
    padding: 0rem 3rem;
  }
  @media (max-width: 1023px) {
    li{
      font-size: 0.8rem;
      padding: 0rem 2rem;
    }
  }
  @media (max-width: 767px) {
    li{
      display: block;
      padding: 0.3rem 0rem
    }
    &::before{
    margin-top: 1rem;
    }
  }

`;
export default NavbarStyle;