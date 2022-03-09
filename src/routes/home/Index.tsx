import { Link } from 'react-router-dom';
import ArrowUpIcon from 'icons/arrow-up.svg';

const Index = () => {
    return (
        <>
            <div>react home page</div>
            <ArrowUpIcon />
            <nav>
                <Link to="/signin">Sign In</Link>
            </nav>
        </>
    );
};

export default Index;
