import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header"


const NewPirate = (props) => {

    const navigate = useNavigate()
    const [project, setProject] = useState("");
    const [date, setDate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageAll, setErrorMessageAll] = useState("");

    const [formData, setFormData] = useState({
        PirateName: '',
        ImageURL: '',
        TresureChests: 0,
        Catchphrase: '',
        CrewPosition: 'sailer',
        PegLeg: false,
        EyePatch: false,
        HookHand: false,
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name == "PegLeg" || name == "EyePatch" || name == "HookHand") {
            setFormData({
                ...formData,
                [name]: e.target.checked,
            });

        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const isUrlValid = (userInput) => {
        var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (res == null)
            return false;
        else
            return true;
    }

    const validateForm = () => {
        console.log("the form ", formData)
        let valid = true;
        const newErrors = {};

        if (formData.PirateName == "") {
            newErrors.PirateName = 'PirateName is required';
            valid = false;
        }

        if (formData.ImageURL == "") {
            newErrors.ImageURL = 'ImageURL is required';
            valid = false;
        }

        if (formData.ImageURL != "" && !isUrlValid(formData.ImageURL)) {
            newErrors.ImageURL = 'ImageURL needs a proper URL';
            valid = false;
        }

        if (formData.Catchphrase == "") {
            newErrors.Catchphrase = 'Catchphrase is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form is valid:', formData);
            // create it
            createPirate();
        } else {
            console.log('Form is invalid. Please check errors.');
        }
    };



    const createPirate = () => {


        axios.post('http://localhost:8000/pirate', {
            ...formData
        })
            .then(res => {
                console.log(res); // always console log to get used to tracking your data!
                console.log(res.data);
                if (res?.data?.code == "AlreadyExists") {
                    setErrorMessageAll(res?.data?.message)
                } else {
                    navigate('/')

                }



            })
            .catch(err => {
                setErrorMessage("Your api has some problems!")
                console.log(err)
            })



    }

    return (

        <>
            <div className="page-container ">
                <Header title="New Pirate" buttonLink="/" buttonText="See Crew" />
                <form onSubmit={handleSubmit} className="edit-create-container">
                    <div className="form-section-1">

                        <label>
                            Pirate Name <input type="text" name="PirateName" value={formData.PirateName} onChange={handleInputChange} />
                            {errors.PirateName && <p style={{ color: 'red' }}>{errors.PirateName}</p>}
                        </label>

                        <br />

                        <label>
                            Image URL <input type="text" name="ImageURL" value={formData.ImageURL} onChange={handleInputChange} />
                            {errors.ImageURL && <p style={{ color: 'red' }}>{errors.ImageURL}</p>}
                        </label>

                        <br />

                        <label>
                            Tresure Chests <input type="number" name="TresureChests" value={formData.TresureChests} onChange={handleInputChange} />
                            {errors.TresureChests && <p style={{ color: 'red' }}>{errors.TresureChests}</p>}
                        </label>

                        <br />

                        <label>
                            Catchphrase <input type="text" name="Catchphrase" value={formData.Catchphrase} onChange={handleInputChange} />
                            {errors.Catchphrase && <p style={{ color: 'red' }}>{errors.Catchphrase}</p>}
                        </label>

                        <br />
                    </div>

                    <div className="form-section-2">
                        <label>
                            Crew Position
                            <select name="CrewPosition" id="crewPosition" value={formData.CrewPosition} onChange={handleInputChange}>
                                <option value="sailer">Sailer</option>
                                <option value="captain">Captain</option>
                                <option value="firstmate">First Mate</option>
                            </select>
                        </label>

                        <br />
                        <label className="custom-checkbox"><input type="checkbox" name="PegLeg" checked={formData.PegLeg} onChange={handleInputChange} />PegLeg</label>

                        <br />
                        <label className="custom-checkbox"><input type="checkbox" name="EyePatch" checked={formData.EyePatch} onChange={handleInputChange} />EyePatch</label>

                        <br />
                        <label className="custom-checkbox"><input type="checkbox" name="HookHand" checked={formData.HookHand} onChange={handleInputChange} />HookHand</label>

                        <br />

                        <button type="submit">Add Pirate</button>
                    </div>

                </form>

            </div>
        </>

    )
}

export default NewPirate;