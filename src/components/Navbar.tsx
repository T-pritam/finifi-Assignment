const Navbar = () => {
    return (
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Profile
          </button>
        </div>
      </header>
    );
  };
  
  export default Navbar;
  