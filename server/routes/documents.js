const sequenceGenerator = require('./sequenceGenerator');
const Documents = require('../models/document');
var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
    try {
       const documents = await Documents.find();
       return res.status(200).json({ documents });

    } catch (error) {
       return res.status(500).json({ error });
    }
 });

 router.post('/', (req, res, next) => {
   const maxDocumentId = sequenceGenerator.nextId("documents");

   const document = new Documents({
     id: maxDocumentId,
     name: req.body.name,
     description: req.body.description,
     url: req.body.url
   });

   document.save()
     .then(createdDocument => {
       res.status(201).json({
         message: 'Document added successfully',
         document: createdDocument
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
  Documents.findOne({ id: req.params.id }, console.log('findOne Documents is working'))
    .then(document => {
      document.name = req.body.name;
      document.description = req.body.description;
      document.url = req.body.url;

      Documents.updateOne({ id: req.params.id }, document)
        .then(result => {
          res.status(204).json({
            message: 'Document updated successfully'
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
        message: 'Document not found.',
        error: { document: 'Document not found'}
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Documents.findOne({ id: req.params.id })
    .then(document => {
      Documents.deleteOne({ id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Document deleted successfully"
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
        message: 'Document not found.',
        error: { document: 'Document not found'}
      });
    });
});


router.get('/', (req, res, next) => {
  Documents.find()
    .populate('children')
    .then(documents => {
      res.status(200).json({
          message: 'Documents fetched successfully!',
          documents: documents
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
