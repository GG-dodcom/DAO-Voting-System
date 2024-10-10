import { Link } from 'react-router-dom';

//TODO:
const TheNavbar = () => {
  return (
    <div>
      <div className="px-3 sm:px-4">
        <div className="flex items-center py-[12px]">
          <div className="flex flex-auto items-center">
            <Link
              to="/"
              className="hidden items-center sm:block"
              style={{ fontSize: '24px' }}
            >
              LiveVote
            </Link>
          </div>
          {/* <div key={web3Account} className="flex space-x-2">
            <NavbarAccount />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TheNavbar;