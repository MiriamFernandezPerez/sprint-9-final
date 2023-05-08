import styled from 'styled-components';

const CardStyle = styled.div`
    background-color: #fff;
    color: #000;
    padding: 1rem;
    margin-bottom: 2rem;
    h3{
        text-transform: uppercase;
        font-weight: bold;
        font-size: 1rem;
    }
    img{
        object-fit: cover;
        width:100%;
        height:100%;
    }

    @media (max-width: 1023px) {
        h3{
            font-size: .8rem;
        }
    } 
    @media (max-width: 767px) {
        li{
            display: block;
            padding: 0.3rem 0rem
        }
        
    }
    @media (max-width: 424px) {
        h3{
            font-size: .7rem;
        }
    }
`;
export default CardStyle;