import styled from 'styled-components';

const FooterStyle = styled.footer`
  color: white;
  padding: 2rem;
  border-top: 2px solid #fff;
  
  a{
    color: #fff;
  }
  a:hover{
    color: #2b95d7;
  }
  
  @media (max-width: 1439px) {
    h5{
    font-size: .9rem;
    }
    h6{
      font-size: .7rem;
    }
  }
  @media (max-width: 1023px) {
    li{
      font-size: 0.8rem;
      padding: 0rem 2rem;
    }
    h5{
    font-size: .8rem;
    }
    h6{
      font-size: .6rem;
    }
  }
  @media (max-width: 767px) {
    padding: 1rem;
    li{
      display: block;
      padding: 0.3rem 0rem
    }
    &::before{
    margin-top: 1rem;
    }
    div{
      margin-bottom: 1rem;
    }
  }
`;
export default FooterStyle;
