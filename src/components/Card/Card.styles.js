import styled from 'styled-components';

const CardStyle = styled.div`
    background-color: #fff;
    color: #000;
    padding: 1rem;
    /* width: 25%; */
    div{
        align-items: center;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    h3{
        text-transform: uppercase;
        font-weight: bold;
        padding: 0 1rem;
        font-size: 1rem;
    }
    h5{
        padding: 0 1rem;
    }
    img{
        object-fit: cover;
        width:100%;
        height:100%;
    }
    a{
        text-decoration: none;
        color: #fff;
    }
    li> a:hover{
        color: #999;
    }
    
`;
export default CardStyle;