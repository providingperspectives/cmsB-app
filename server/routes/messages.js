const sequenceGenerator = require('../routes/sequenceGenerator');
const Messages = require('../models/message')
var express = require('express');
var router = express.Router();


router.get(' ', async (req, res, next) => {
    try {
       const messages = await Messages.find();
       return res.status(200).json({ messages });
    } catch (error) {
       return res.status(500).json({ error });
    }
 });

 router.post('/', (req, res, next) => {
   const maxMessageId = sequenceGenerator.nextId("messages");

   const messages = new Messages({
     id: maxMessageId,
     subject: req.body.subject,
     msgText: req.body.msgText,
     sender: req.body.sender
   });

   messages.save()
     .then(createdMessage => {
       res.status(201).json({
         message: 'Message added successfully',
         messages: createdMessage
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
  Messages.findOne({ id: req.params.id })
    .then(messages => {
      messages.subject = req.body.subject;
      messages.msgText = req.body.msgText;
      messages.sender = req.body.sender;

      Messages.updateOne({ id: req.params.id }, messages)
        .then(result => {
          res.status(204).json({
            message: 'Messages updated successfully'
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
        message: 'Messages not found.',
        error: {messages: 'Messages not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Messages.findOne({ id: req.params.id })
    .then(messages => {
      Messages.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Message deleted successfully"
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
        message: 'Message not found.',
        error: { messages: 'Message not found'}
      });
    });
});

router.get('/', (req, res, next) => {
  Messages.find()
    .populate('group')
    .then(messages => {
      res.status(200).json({
          message: 'Contacts fetched successfully!',
          messages: messages
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
