const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');

var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
    try {
       const contacts = await Contact.find();
       return res.status(200).json({ contacts });
    } catch (error) {
       return res.status(500).json({ error });
    }
 });

 router.post('/', (req, res, next) => {
   const maxContactId = sequenceGenerator.nextId("contacts");

   const contacts = new Contact({
     id: maxContactId,
     name: req.body.name,
     email: req.body.email,
     phone: req.body.phone,
     imageUrl: req.body.imageUrl,
     group: req.body.group
   });

   contacts.save()
     .then(createdContact => {
       res.status(201).json({
         message: 'Contact added successfully',
         contacts: createdContact
       });
     })
     .catch(error => {
        res.status(500).json({
           message: 'An error occurred',
           error: error
         });
     });
 });


 router.put('/:id', (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then(contacts => {
      contacts.name = req.body.name;
      contacts.email = req.body.email;
      contacts.phone = req.body.phone;
      contacts.imageUrl = req.body.imageUrl;
      contacts.group = req.body.group;

      Contact.updateOne({ id: req.params.id }, contacts)
        .then(result => {
          res.status(204).json({
            message: 'Contact updated successfully'
          })
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Contact not found.',
        error: {contacts: 'Contact not found'}
      });
    });
});


router.delete("/:id", (req, res, next) => {
  Contact.findOne({ id: req.params.id })
    .then(contact => {
      Contact.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Contact deleted successfully"
          });
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Contact not found.',
        error: { contact: 'Contact not found'}
      });
    });
});



router.get('/', (req, res, next) => {
  Contact.find()
    .populate('group')
    .then(contacts => {
      res.status(200).json({
          message: 'Contacts fetched successfully!',
          contacts: contacts
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

module.exports = router;
