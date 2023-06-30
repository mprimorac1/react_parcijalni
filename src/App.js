import React, { useState } from "react";
import UserForm from "./components/UserForm";
import UserProfile from "./components/UserProfile";
import "./App.css";

const App = () => {
  // Definiranje stanja
  const [username, setUsername] = useState(""); // Stanje za korisničko ime, početna vrijednost je prazan string
  const [user, setUser] = useState(null); // Stanje za podatke o korisniku,null je posebna vrijednost u JavaScriptu koja označava odsutnost ili nedostatak vrijednosti. Koristi se kada želimo izričito označiti da varijabla, objekt ili izraz nemaju vrijednost ili da je vrijednost nepoznata - inicijalno stanje varijable user je postavljeno na null, što označava da trenutno nemamo informacije o korisniku.
  const [repos, setRepos] = useState([]); // Stanje za podatke o repozitorijima, [] -> prazan niz

  // Funkcija koja se poziva kada se forma za unos podataka pošalje
  const handleFormSubmit = (username) => {
    //handleFormSubmit obavlja dva zadatka: ažurira stanje username s unesenim vrijednostima i dohvaća podatke o korisniku temeljem tog unesenog korisničkog imena.
    setUsername(username); // Ažuriranje stanja s unesenim korisničkim imenom
    fetchUserData(username); // Pozivanje funkcije za dohvat podataka o korisniku s API-ja
  };

  // Funkcija za dohvat podataka o korisniku s API-ja
  //

  //Definiramo funkciju fetchUserData koja prima argument username koji predstavlja korisničko ime korisnika čije podatke želimo dohvatiti.
  //parsiranje se koristi za pretvaranje odgovora dobivenog iz API-ja (koji je u obliku JSON-a) u JavaScript objekt koji se može koristiti u aplikaciji.Razlog za korištenje await operatora je taj što su fetch i json metode asinkrone operacije koje vraćaju obećanje (Promise). Kada se koristi await ispred takve operacije, funkcija se privremeno pauzira i čeka da se operacija dovrši prije nego što nastavi s izvođenjem ostatka koda.U ovom slučaju, korištenje await osigurava da se ažuriranje stanja aplikacije (setUser i setRepos) izvrši tek nakon što su dobiveni odgovori s podacima o korisniku i repozitorijima te su ti odgovori uspješno parsirani u JavaScript objekte. To omogućava da se podaci pravilno postave u stanje aplikacije i budu dostupni za prikaz.
  const fetchUserData = async (username) => {
    try {
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );
      const userData = await userResponse.json(); // Dohvaćeni podaci o korisniku
      setUser(userData); // Ažuriranje stanja s podacima o korisniku

      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      const reposData = await reposResponse.json(); // Dohvaćeni podaci o repozitorijima
      setRepos(reposData); // Ažuriranje stanja s podacima o repozitorijima
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  // Funkcija za resetiranje podataka
  const resetData = () => {
    setUsername(""); // Resetiranje stanja za korisničko ime
    setUser(null); // Resetiranje stanja za korisnika
    setRepos([]); // Resetiranje stanja za repozitorije
  };

  return (
    <div>
      <h1>GitHub korisnici</h1>
      <UserForm handleUserSubmit={handleFormSubmit} />{" "}
      {/* Komponenta za unos korisničkog imena */}
      {user && <UserProfile user={user} repos={repos} />}{" "}
      {/* Prikazivanje podataka o korisniku ako postoje */}
      {user && (
        <button type="button" onClick={resetData}>
          Reset
        </button>
      )}{" "}
      {/* Gumb za resetiranje podataka */}
    </div>
  );
};

export default App;
