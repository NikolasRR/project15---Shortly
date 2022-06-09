import { nanoid } from "nanoid";

async function shortenURL (req, res) {
    console.log(nanoid(8));
    res.sendStatus(201);
}

async function getThisURL (req, res) {
    
}

async function openThisURL (req, res) {
    
}

async function deleteThisURL (req, res) {
    
}

export { shortenURL, getThisURL, openThisURL, deleteThisURL };