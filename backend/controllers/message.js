const Message = require('../models/message');
const fs = require('fs');

exports.createMessage = (req, res, next) => {
  const messageObject = JSON.parse(req.body.message);
  delete messageObject._id;
  const message = new Message({
    ...messageObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  message.save()
    .then(() => res.status(201).json({ message: ' Message published !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneMessage = (req, res, next) => {
  Message.findOne({
    _id: req.params.id
  }).then((message) => { res.status(200).json(message); }
  ).catch((error) => { res.status(404).json({ error: error }) });
};

exports.modifyMessage = (req, res, next) => {
  const messageObject = req.file ?
    {
      ...JSON.parse(req.body.message),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Message.updateOne({ _id: req.params.id }, { ...messageObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Message modify !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteMessage = (req, res, next) => {
  Message.findOne({ _id: req.params.id })
    .then(message => {
      const filename = message.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Message.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Message delete !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllMessage = (req, res, next) => {
  Message.find()
    .then((message) => { res.status(200).json(message); })
    .catch((error) => { res.status(400).json({ error: error }) });
};

exports.like = (req, res, next) => {
  switch (req.body.like) {
    case 0:
      Message.findOne({ _id: req.params.id })
        .then((message) => {
          if (message.usersLiked.find(user => user === req.body.userId)) {
            Message.updateOne({ _id: req.params.id }, {
              $inc: { likes: -1 }, 
              $pull: { usersLiked: req.body.userId }, 
              _id: req.params.id
            })
              .then(() => { res.status(201).json({ message: 'recorded like !' }); })
              .catch((error) => { res.status(400).json({ error: error }); });

          } if (message.usersDisliked.find(user => user === req.body.userId)) {
            message.updateOne({ _id: req.params.id }, {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },
              _id: req.params.id
            })
              .then(() => { res.status(201).json({ message: 'recorded dislike' }); })
              .catch((error) => { res.status(400).json({ error: error }); });
          }
        })
        .catch((error) => { res.status(404).json({ error: error }); });
      break;
    case 1:
      Message.updateOne({ _id: req.params.id }, {
        $inc: { likes: 1 },
        $push: { usersLiked: req.body.userId },
        _id: req.params.id
      })
        .then(() => { res.status(201).json({ message: 'recorded like !' }); })
        .catch((error) => { res.status(400).json({ error: error }); });
      break;
    case -1:
      Message.updateOne({ _id: req.params.id }, {
        $inc: { dislikes: 1 },
        $push: { usersDisliked: req.body.userId },
        _id: req.params.id
      })
        .then(() => { res.status(201).json({ message: 'recorded dislike' }) })
        .catch((error) => { res.status(400).json({ error: error }) });
      break;
    default:
      console.error('Bad request')
  }
};
