import React, { useState } from "react";
import { Link } from "react-router";
// import "./NavBar.css";
import SideBarProfile from "../SideBarProfile/SideBarProfile";
function NavBar({ profiles }) {
  const [textInput, setTextInput] = useState("");
  const [searchResult, setSearchResult] = useState([...profiles]);

  function handledTextChange(e) {
    const value = e.target.value;
    setTextInput(value);

    const filtered = profiles.filter((profile) =>
      profile.employee.name.toLowerCase().includes(value.toLowerCase()),
    );

    setSearchResult(filtered);
  }

  return (
    <div>
      <nav className=" h-16 w-full flex items-center justify-center gap-16 bg-[#15616D] padding poppin">
        <div className="flex items-center w-52">
          <form>
            <input
              className="bg-[#ffff] p-2 rounded-xsh-full w-full rounded-2xl h-8 text-[12px]"
              value={textInput}
              onChange={handledTextChange}
              type="text"
              placeholder="Search for People!"
            />
          </form>
          <ul>
            {searchResult.map((profile) => {
              return (
                <li key={profile.id}>
                  <Link to={`/home/${profile.id}`}>
                    {profile.employee.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <ul className="flex gap-6 justify-end text-[0.9rem] text-[#ffff] font-medium font-Poppins  ">
          <i>
            <Link className="text-[22px]">Learn</Link>
          </i>
          <i>
            <Link className="text-[22px]">Leader Board</Link>
          </i>
          <i>
            <Link className="text-[22px]">Find my path</Link>
          </i>
        </ul>
        <SideBarProfile />
      </nav>
    </div>
  );
}
export default NavBar;

// don't forget to implement a popup box for search results
