import styled from "styled-components";

const ButtonStyle = styled.button`
    font-size: 0.9rem;
    font-weight: bold;
    background-color: #2b95d7;
    padding: 0.8rem 1.2rem;
    border-radius: .6rem;
    border: none;
    &:hover{
        background-color: #c828e4;
        color: #fff;
    }
    @media (max-width: 424px) {
        font-size: 0.7rem;
    }
`;

export default ButtonStyle;




