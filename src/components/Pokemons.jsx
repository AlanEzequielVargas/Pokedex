import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import "../styles/pokemonsPage.css";
import gamepad from "../assets/gamepad-arrows.png";
import leftArrow from "../assets/left-arrow.png";
import rightArrow from "../assets/right-arrow.png";
import rotatePokemon from "../assets/rotate-pokemon.gif";
import rotatePokemon2 from "../assets/rotate-pokemon-2.gif";
import rotatePokemon3 from "../assets/rotate-pokemon-3.gif";

const Pokemons = () => {
	const userName = useSelector((state) => state.name);
	const [pokemon, setPokemon] = useState([]);
	const [type, setType] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [limitedPages, setLimitedPages] = useState(8);
	let randomPokemon = Math.floor(Math.random() * 3);

	useEffect(() => {
		axios.get("https://pokeapi.co/api/v2/pokemon/?limit=1154").then(
			(res) => setPokemon(res.data.results)
		);

		axios.get("https://pokeapi.co/api/v2/type/").then((res) =>
			setType(res.data.results)
		);
	}, []);

	const navigate = useNavigate();

	function searchCharacter() {
		inputValue && navigate(`/pokemon/${inputValue}`);
	}

	function backToInput() {
		navigate("/");
	}

	function filterType(url) {
		axios.get(url).then((res) => setPokemon(res.data.pokemon));
	}

	const [page, setPage] = useState(1);
	const pokemonPerPage = 8;
	const lastIndex = page * pokemonPerPage;
	const firstIndex = lastIndex - pokemonPerPage;
	const pokemonPaginated = pokemon.slice(firstIndex, lastIndex);
	const totalPages = Math.ceil(pokemon.length / pokemonPerPage);

	const numbers = [];
	for (let i = 1; i <= totalPages; i++) {
		numbers.push(i);
	}

	return (
		<div className="pokedex">
			<div className="input-section">
				<img src={gamepad} className="gamepad" alt="gamepad" />
				<h1>Pokedex</h1>

				<div className="false-btns">
					<div className="false-btn-1"></div>
					<div className="false-btn-2"></div>
				</div>

				<h2 className="welcome-message">
					Welcome <span>{userName.toUpperCase()}</span>! Here you
					will have access to information on more than 1000
					Pokémons!
				</h2>

				<div className="pokemon-alert-display">
					<img
						src={
							randomPokemon === 0
								? rotatePokemon
								: randomPokemon === 1
								? rotatePokemon2
								: rotatePokemon3
						}
						alt="pokemon"
					/>
					<h1 className="alert">ALERT!</h1>
					<h2 className="alert-message">
						A{" "}
						{randomPokemon === 0
							? "Gengar"
							: randomPokemon === 1
							? "Meowth"
							: "Golbat"}{" "}
						is near.
					</h2>
				</div>

				<img
					onClick={backToInput}
					className="arrow-pagination"
					src={leftArrow}
					alt=""
				/>

				<input
					type="text"
					placeholder="search pokémon"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<div className="btn-gamepad">
					<button onClick={searchCharacter}>GO!</button>
				</div>

				<div className="select-display">
					<select
						onChange={(e) => filterType(e.target.value)}
						name=""
						id=""
					>
						<option>types</option>
						{type.map((type) => (
							<option value={type.url} key={type.name}>
								{type.name}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="pokemons-container">
				{pokemonPaginated.map((poke) => (
					<PokemonCard
						url={poke.url ? poke.url : poke.pokemon.url}
						key={poke.url ? poke.url : poke.pokemon.url}
					/>
				))}
			</div>

			<div className="pagination">
				<button
					disabled={page === 1}
					onClick={() => setPage(page - 1)}
				>
					<img
						className="arrow-pagination"
						src={leftArrow}
						alt=""
					/>
				</button>

				{/* {numbers.map((num) => (
					<button key={num} onClick={() => setPage(num)}>{num}</button>
				))}
 */}

				<button
					disabled={page === totalPages}
					onClick={() => setPage(page + 1)}
				>
					<img
						className="arrow-pagination"
						src={rightArrow}
						alt=""
					/>
				</button>
			</div>
         <div className="parlante">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
         </div>
		</div>
	);
};

export default Pokemons;
