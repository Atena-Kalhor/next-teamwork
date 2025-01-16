import React from "react";
import SearchIcon from '@mui/icons-material/Search';
 const Searchbar =()=>{

return(
<div className=" container">
<h1 className="title">Questions</h1>
<form onsubmnit={handlessubmit}>
<input type="text" className="search-input" placeholder="search " value={searchTerm} onchange= {handleChange} />
<button><SearchIcon/></button>
</form>
</div> 
)
}
export default Searchbar;