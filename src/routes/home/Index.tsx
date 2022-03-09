import { Link } from 'react-router-dom';

const Index = () => {
    return (
        <>
            <div>react home page</div>
            <nav>
                <Link to="/signin">Sign In</Link>
            </nav>
        </>
    );
};

export default Index;
