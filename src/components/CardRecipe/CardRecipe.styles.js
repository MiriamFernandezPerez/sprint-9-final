import styled from 'styled-components';

const CardRecipeStyle = styled.div`
    background-color: #fff;
    color: #000;
    /* padding: 1rem; */
    width: 80%;
    display:flex;
    flex-direction: column;
    align-items:center;
    p{
        margin-top: 1rem;
        font-size: 1rem;
    }
    h5{
        padding: 0 1rem;
    }
    img{
        width:100%;
        height:100%;
    }
    div{
        display:flex;
        flex-direction: column;
        align-items: center;
    }
`;
export default CardRecipeStyle;