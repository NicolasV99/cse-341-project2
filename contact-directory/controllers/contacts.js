const { application } = require('express');
const mongodb = require('../data/database');
const ObjetcId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);        
    });
};

const getSingle = async (req, res) => {
    
    const userId = new ObjetcId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: userId});
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);        
    });
};

const createContact = async (req, res) => {
    const contact = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
    };
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user');
    }
};

const updateContact = async (req, res) => {
    const userId = new ObjetcId(req.params.id);
    const contact = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
    };
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: userId}, contact);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user');
    }
};

const deleteContact = async(req, res) => {
    
    const userId = new ObjetcId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: userId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user');
    }
};


module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};