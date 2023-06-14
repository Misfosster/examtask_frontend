import {useState} from "react";
import facade from "../apiFacade.js";
import ShowCreate from "./ShowCreate.jsx";
import GuestCreate from "./GuestCreate.jsx";
import FestivalCreate from "./FestivalCreate.jsx";

function CreatePage() {
    return (
        <div>
            <ShowCreate/>
            <GuestCreate/>
            <FestivalCreate/>
        </div>
    );
}

export default CreatePage;
