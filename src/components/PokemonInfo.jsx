import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/pokemonInfo.css";
import platform from "../assets/platform2.png";
import gamepad from "../assets/gamepad-arrows.png";
import rotatePokemon from "../assets/rotate-pokemon.gif";
import rotatePokemon2 from "../assets/rotate-pokemon-2.gif";
import rotatePokemon3 from "../assets/rotate-pokemon-3.gif";
import rotatePokeball from "../assets/pokeball.png";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import leftArrow from "../assets/left-arrow.png";

const PokemonInfo = () => {
	const [pokemon, setPokemon] = useState({});
   let randomPokemon = Math.floor(Math.random() * 3);

	const { id } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((res) =>
			setPokemon(res.data)
		);
	}, []);

   function backToInput(){
      navigate('/pokemons')
   }

	function redirection() {
		navigate("/pokemons/");
	}

	return (
		<div className="pokedex">
			<div className="input-section">
         <img onClick={backToInput} className='arrow-pagination back-arrow' src={leftArrow} alt="" />
				<img src={gamepad} className="gamepad-arr" alt="gamepad" />
				<h1>Pokedex</h1>
				<h2 className="welcome-message">
					SCANNING POKEMON
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

            <div className="false-btns">
					<div className="false-btn-1"></div>
					<div className="false-btn-2"></div>
				</div>

				<input
					type="text"
					placeholder="search pokémon"
					onClick={redirection}
				/>

				<div className="btn-gamepad">
					<button>GO!</button>
				</div>

				<div className="select-display">
					<img
						className="pokeball"
						src={rotatePokeball}
						alt="pokeball"
					/>
				</div>
			</div>

			<div className="pokemon-info-container">
				<h2 className="pokemon-name">{pokemon.name}</h2>
            <h2 className="pokemon-stat-title">stats</h2>
				<img className="pokemon-image"
					src={
						pokemon.sprites?.other["official-artwork"]
							.front_default
					}
					alt=""
				/>
            <img className='platform' src={platform} alt="" />





            <div className="pokemon-stats">

               <p className="caracterists">type:{pokemon.types?.[0]?.type.name}</p>
               <p className="caracterists">height:{pokemon.height}</p>
               <p className="caracterists">weight:{pokemon.weight}</p>

               <ul className="movements">
                  <p>Abilities:</p>
                  {pokemon.abilities?.map(ability =>(
                     <li key={ability.slot}>{ability.ability.name}</li>
                  ))}
               </ul>

            <div className="pokemon-stats-bar">
				<ProgressBar variant="success" now={pokemon.stats?.[0].base_stat} />
            <p className="stat-1">health: {pokemon.stats?.[0].base_stat}pts</p>
				
				<ProgressBar variant="info" now={pokemon.stats?.[5].base_stat} />
            <p className="stat-2">speed: {pokemon.stats?.[5].base_stat}pts</p>
				
				<ProgressBar variant="warning" now={pokemon.stats?.[2].base_stat} />
            <p className="stat-3">defence: {pokemon.stats?.[2].base_stat}pts</p>
				
            <ProgressBar variant="danger" now={pokemon.stats?.[1].base_stat} />
				<p className="stat-4">attack: {pokemon.stats?.[1].base_stat}pts</p>
				
            
			</div>

            </div>

			</div>
                     <div className="parlante">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
         </div>
		</div>
	);
};

export default PokemonInfo;
