import React from "react";
import logo from "../../../img/logo.png";
// import Github from "../img/icons/github-logo_icon-icons.com_73546.svg";
const Layout = (props) => {
  const logoStyles={
    textDecoration : "none",
    color : "#5f6368"
  }


  const changeColor = {
    backgroundColor : "white" ,
    color : "#5f6368"
  }
  return (
    <>
      <div className='Layout' style={changeColor }>
        <div className='Header'>
          <div className='Header__name'>
            <img className='Header__img' src={logo} alt='logo' />
            <a href="/Note"  style={logoStyles}>
            <h2> Note </h2>
            </a>
          </div>
          <div className='Header__search'>
            <input onChange={props.onChange} placeholder='Search' type='text' />
          </div>
          <div className='Header__made' style={logoStyles}>
            <h2>
              Created by Apoorva
            </h2>

            <a
              href='#'
              target='_blank'
              rel='noreferrer noopener'
              className='logo'
            >
              {/* <img src={Github} alt="Github's logo" /> */}
            </a>
          </div>
        </div>

        <div className='Layout__body'>{props.children}</div>
      </div>
    </>
  );
};

export default Layout;
