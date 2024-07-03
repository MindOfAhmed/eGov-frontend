import { Link } from 'react-router-dom';

export const Nav = ({ isLoggedIn, onLogout}) => {
  return (
    <nav className="navbar navbar-expand-lg primary_color">
      <div className="container-fluid">
        <Link className="navbar-brand complimentary_color" to="/">Digital Society</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className='nav-item'>
              <Link className="nav-link complimentary_color" to="/townhall">Town Hall</Link>
            </li>
            <li className='nav-item'>
              <Link className="nav-link complimentary_color" to="/services">Services</Link>
            </li>
            {/* conditionally render the login, logout, and profile links */}
            { isLoggedIn ? 
              (
                <>
                  <li className='nav-item'>
                    <Link className="nav-link complimentary_color" to="/profile">Profile</Link>
                  </li>
                  <li className='nav-item'>
                    <button className='nav-link complimentary_color' onClick={onLogout}>Logout</button>
                  </li>
                </>
              ) : 
              (
                <li className='nav-item'>
                  <Link className='nav-link complimentary_color' to='/login/'>Login</Link>
                </li>
              )}
          </ul>
        </div>
      </div>
    </nav>
  );
};