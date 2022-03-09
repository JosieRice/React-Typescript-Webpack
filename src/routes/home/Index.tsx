import ArrowUpIcon from 'icons/arrow-up.svg';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Index = () => {
    return (
        <>
            <H1>styled components test</H1>
            <div>react home page</div>
            <ArrowUpIcon />
            <nav>
                <Link to="/signin">Sign In</Link>
            </nav>
        </>
    );
};

export default Index;

/**
 * ====================================================================================================
 * Style
 * ====================================================================================================
 */

const H1 = styled.h1`
    color: hotpink;
    background-color: blue;
`;
