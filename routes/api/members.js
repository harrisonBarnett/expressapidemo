const express = require('express')
const router = express.Router()
// uuid: generates a random token for data id instantiation
const uuid = require('uuid')
// this is our mockup of database data, which will normally be persistent
const members = require('../../memberdata')

// return all data
router.get('/', (req, res) => {
    res.json(members)
})

// return a specific data object
// we check the object's "id" value against the request param
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    } else {
        res.status(404)
        res.json({ msg: `no member with id of ${req.params.id} was found :(`})
    }
})

// create a data object
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }
    members.push(newMember)
    res.json(members)
})

// update a data object
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found) {
        // make a copy
        const updatedMember = req.body
        const member = members.filter(member => member.id === parseInt(req.params.id))[0]
        // check against existence of values in the body
        member.name = updatedMember.name ? updatedMember.name : member.name
        member.email = updatedMember.email ? updatedMember.email : member.email

        res.json({ msg: `member updated, `, member})
    } else {
        res.status(404)
        res.json({ msg: `no datum found with an id of ${req.params.id}`})
    }
})

// delete a data object
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))
    if(found) {
        res.json(members.filter(member => member.id !== parseInt(req.params.id)))
        res.json({ msg: `member deleted, `, members})
    } else {
        res.status(404)
        res.json({ msg: `no datum found with an id of ${req.params.id}`})
    }
})

module.exports = router
// the router object tells express to route URL requests to the appropriate endpoint