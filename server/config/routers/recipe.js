const express = require('express');

const router = new express.Router();

router.route('/')
  .get((req, res) => {
    res.end('Hello world');
  });

module.exports = router;
