import { useState, useEffect } from "react";
// import CardList from "./components/CardList/CardList";
import Search from "./components/Search/Search";

function App() {
  const [input, setInput] = useState("");
  const [catsInfo, setCatsInfo] = useState([]);

  const getUsers = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    setCatsInfo(data);
  };

  useEffect(() => {
    getUsers();
    getUsers().catch(console.error);
  }, []);

  function handleChange(e) {
    const inputChange = e.target.value;
    setInput(inputChange);

    if (inputChange) {
      const filteredCats = catsInfo.filter((cat) => {
        return cat.name.toLocaleLowerCase().includes(input.toLocaleLowerCase());
      });
      setCatsInfo(filteredCats);
    } else {
      setCatsInfo(getUsers);
    }
  }

  return (
    <section className="application">
      <div className="heading__container">
        <h1>cat</h1>
        <img
          className="heading__img"
          src="https://i.ibb.co/74VCLrv/paw-removebg-preview.png"
          alt=""
        />
        <h1>call</h1>
      </div>
      <Search
        handleChange={handleChange}
        inputValue={input}
        placeholderText="Search Cats"
      />
      {/* <CardList content={filteredCats} /> */}
      <>
        {catsInfo.length > 0 && (
          <div className="cat__list">
            {catsInfo.map((cat) => (
              <div key={cat.id} className="cat__card">
                <h2>{cat.name}</h2>
                <img
                  src={`https://robohash.org/${Math.floor(
                    (Math.random() + 4.2) * cat.id
                  )}?set=set4&size=180x180`}
                  alt={cat.name}
                />
                <p>{cat.email}</p>
              </div>
            ))}
          </div>
        )}
      </>
    </section>
  );
}

export default App;
