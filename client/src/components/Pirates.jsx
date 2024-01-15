import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header"
import LinkButton from "./LinkButton"


const Pirates = (props) => {
    const navigate = useNavigate()
    const [pirates, setPirates] = useState([]);
    const [CrewPosition, setCrewPosition] = useState("");

    useEffect(() => {
        getAllPirates()

    }, []);

    const handleFilter = () => {
        if (CrewPosition != "") {
            getFilteredPirates(CrewPosition)
        } else {
            getAllPirates()
        }
    }

    const resetFilters = () => {

        setCrewPosition("")
        getAllPirates()
    }


    const removePirate = (id) => {
        axios.delete(`http://localhost:8000/pirate/${id}`)
            .then((res) => {
                console.log(res.data);
                getAllPirates();

            })
            .catch((err) => {
                console.log(err);
            });

    }



    const getFilteredPirates = (crew) => {
        axios.get(`http://localhost:8000/filtered-pirates/${crew}`)
            .then((res) => {
                console.log("Testtt", res.data);

                setPirates(res.data?.Pirates)

            })
            .catch((err) => {
                console.log(err);
            });
    }


    const getAllPirates = () => {
        axios.get('http://localhost:8000/pirates')
            .then((res) => {
                console.log("Testtt", res.data);

                setPirates(res.data?.Pirates)

            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <>
            <div className="page-container">
                <Header title="Pirate Crew" buttonLink="/pirate/new" buttonText="Add Pirate" />
                <div className="all-container">
                    <div className="filter-container">
                        <label>
                            Crew Position
                            <select name="CrewPosition" id="crewPosition" value={CrewPosition} onChange={(e) => setCrewPosition(e.target.value)}>
                                <option value="">All</option>
                                <option value="sailer">Sailer</option>
                                <option value="captain">Captain</option>
                                <option value="firstmate">First Mate</option>
                            </select>
                        </label>
                        <div className="filter-actions">
                            <button className="custom-button" onClick={handleFilter}>Filter</button>
                            <button className="custom-button" onClick={resetFilters}>Reset</button>
                        </div>

                    </div>
                    <div className="pirates-container">
                        {pirates.length > 0 && pirates.map((item, ind) => (

                            <div key={ind} className="pirate-container">
                                <div className="img">
                                    <img src={item?.ImageURL} alt={item?.PirateName} className="pirate-image" />
                                </div>
                                <div className="text">
                                    <h2>{item.PirateName}</h2>
                                    <div className="pirate-buttons">
                                        <LinkButton buttonText="View Pirate" buttonLink={`/pirates/${item?._id}/details`} />
                                        <button className="custom-button remove" onClick={() => removePirate(item?._id)}>Walk the plank</button>

                                    </div>
                                </div>

                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </>
    );
}

export default Pirates;