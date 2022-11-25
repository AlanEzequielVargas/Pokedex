import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pokemonsPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProgressBar from "react-bootstrap/ProgressBar";

const PokemonCard = ({ url }) => {
	const [pokemon, setPokemon] = useState({});

	useEffect(() => {
		axios.get(url).then((res) => setPokemon(res.data));
	}, []);


	return (
		<Link className="pokemon-card" to={`/pokemon/${pokemon.id}`}>
			<h1>{pokemon.name}</h1>
			<img src={pokemon.sprites?.front_default} alt="" />

			<div className="pokemon-card-stats">
				<p className="stat-1">hp:</p>
				<ProgressBar variant="success" now={pokemon.stats?.[0].base_stat} />
				<p className="stat-2">speed:</p>
				<ProgressBar variant="info" now={pokemon.stats?.[5].base_stat} />
				<p className="stat-3">defence:</p>
				<ProgressBar variant="warning" now={pokemon.stats?.[2].base_stat} />
				<p className="stat-4">attack:</p>
				<ProgressBar variant="danger" now={pokemon.stats?.[1].base_stat} />
			</div>
		</Link>
	);
};

export default PokemonCard;
