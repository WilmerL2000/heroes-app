import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../hook/useForm";
import queryString from "query-string";
import { HeroCard } from "../components";
import { getHeroesByName } from "../helpers";

export const SearchPage = () => {
  const navigate = useNavigate();

  /* Getting the current location. To get url object params*/
  const location = useLocation();

  /* Destructuring the query string from the location.search. Query param */
  const { q = "" } = queryString.parse(location.search);

  /* Getting the heroes by name. */
  const heroes = getHeroesByName(q);

  const { searchText, onInputChange } = useForm({ searchText: q });

  const onSearchSubmit = (e) => {
    // if (searchText.trim().length <= 1) return;
    e.preventDefault();

    /* A function that is used to navigate to a new location. */
    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input
              type="search"
              placeholder="Search"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />

            <button className="btn btn-outline-primary mt-1"> Search</button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {q === "" ? (
            <div className="alert alert-primary">Search a hero</div>
          ) : (
            heroes.length === 0 && (
              <div className="alert alert-danger">
                No hero with <b>{q}</b>
              </div>
            )
          )}

          {heroes.map((hero) => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};
