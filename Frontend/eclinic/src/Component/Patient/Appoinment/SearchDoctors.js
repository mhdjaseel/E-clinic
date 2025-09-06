import React from "react";

function SearchDoctors() {
  return (
    <div>
      <div className="container">
        <div className="card mt-2">
          <div className="card-body">
            <div class="container-fluid">
              <form class="d-flex">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search hospital or doctor"
                  aria-label="Search"
                />
                <button class="btn btn-outline-success" type="submit">
                  Search 
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchDoctors;
