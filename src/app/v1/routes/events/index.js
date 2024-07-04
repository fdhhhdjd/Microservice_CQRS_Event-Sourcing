'use strict';

const express = require('express');
const router = express.Router();

const EventControllers = require('@/app/v1/controllers/eventControllers');
const asyncHandler = require('@/helpers/asyncHandlerHelpers');

router.get('/history-event', asyncHandler(EventControllers.getHistoryEventService));

module.exports = router;
