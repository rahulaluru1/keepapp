import React from "react";

function Header(props) {
  function handleClick(e){
    props.onLogoutClick(e);
  }
  return (
    <div>
     <header>
      <h1>Keeper</h1>
    </header>
      <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={handleClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
    </div>
   
    
  );
}

export default Header;
