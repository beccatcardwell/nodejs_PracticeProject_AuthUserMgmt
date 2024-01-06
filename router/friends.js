const express = require('express');

const router = express.Router();

let friends = {
    "johnsmith@gamil.com": {"firstName": "John","lastName": "Doe","DOB":"22-12-1990"},
    "annasmith@gamil.com":{"firstName": "Anna","lastName": "smith","DOB":"02-07-1983"},
    "peterjones@gamil.com":{"firstName": "Peter","lastName": "Jones","DOB":"21-03-1989"}
};


// GET request: Retrieve all friends
router.get("/",(req,res)=>{
  res.send(JSON.stringify(friends,null,4));
});

// GET by specific ID request: Retrieve a single friend with email ID
router.get("/:email",(req,res)=>{
  const email = req.params.email
  res.send(friends[email])
});


// POST request: Add a new friend
router.post("/",(req,res)=>{
  const body = req.body
  const email = body.email

  if (email) {
    friends[email] = {
      'firstName': body.firstName,
      'lastName': body.lastName,
      'DOB': body.DOB
    }

  }
  res.send(`The user ${body.firstName} ${body.lastName} has been added.`)
});


// PUT request: Update the details of a friend with email id
router.put("/:email", (req, res) => {
  const body = req.body
  const email = req.params.email
  let friend = friends[email]
  if (friend) {
    let DOB = body.DOB
    let firstName = body.firstName
    let lastName = body.lastName

    if (DOB) friend['DOB'] = DOB
    if (firstName) friend ['firstName'] = firstName
    if (lastName) friend['lastName'] = lastName

    friends[email]=friend
    res.send(`Friend with the email ${email} updated.`)
  } else {
    res.send('Unable to find friend with email ${email}.')
  }
});


// DELETE request: Delete a friend by email id
router.delete("/:email", (req, res) => {
  const email = req.params.email

  if (friends[email]) {
    delete friends[email]
    res.send(`Friend with email ${email} deleted.`)
  } else {
    res.send(`Friend with email ${email} not found`)
  }
});

module.exports=router;
