import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header"
import LinkButton from "./LinkButton"



const ViewPirate = (props) => {

    const navigate = useNavigate()
    const [project, setProject] = useState("");
    const [date, setDate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageAll, setErrorMessageAll] = useState("");

    const { id } = useParams()
    console.log("the id is ", id)

    const [pirate, setPirate] = useState({
        PirateName: '',
        ImageURL: '',
        TresureChests: 0,
        Catchphrase: '',
        CrewPosition: '',
        PegLeg: false,
        EyePatch: false,
        HookHand: false,
    });



    useEffect(() => {
        axios.get(`http://localhost:8000/pirate/${id}`)
            .then((res) => {
                console.log(res.data)
                setPirate(res.data.Pirates)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (

        <>
            <div className="page-container">
                {pirate?.PirateName != "" ?

                    <>
                        <Header title={pirate?.PirateName} buttonLink="/" buttonText="See Crew" />
                        <div className="view-container">
                            <div className="section-1">
                                <div className="image-container">
                                    <img src={pirate?.ImageURL} alt={pirate?.PirateName} className="pirate-image" />
                                    <p className="catchphrase">{pirate?.Catchphrase}</p>
                                </div>
                                <div className="edit-button">
                                    <LinkButton buttonText={`Edit ${pirate?.PirateName}`} buttonLink={`/pirates/${id}/update`} />
                                </div>
                            </div>
                            <div className="section-2">
                                <p>Position: {pirate?.CrewPosition}</p>
                                <p>Treasures: {pirate?.TresureChests}</p>
                                <p>Peg Leg: {pirate?.PegLeg ? "Yes" : "No"}</p>
                                <p>Eye Patch: {pirate?.EyePatch ? "Yes" : "No"}</p>
                                <p>Hook Hand: {pirate?.HookHand ? "Yes" : "No"}</p>
                            </div>
                        </div>

                    </>

                    : <p>Loading...</p>}

            </div>
        </>

    )
}

export default ViewPirate;