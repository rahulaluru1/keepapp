import React from "react";

function Header(props) {
  function handleClick(e){
    props.onLogoutClick(e);
  }
  return (
    <div>
     <header>
      <h1>Keeper</h1>
      <button
              style={{
                width: "100px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={handleClick}
              className="btn"
            >
              Logout
            </button>
    </header>
    </div>
   
    
  );
}

export default Header;
