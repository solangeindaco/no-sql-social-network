const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const moment = require('moment');

// Schema to create a Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: (createdAtVal) => {
        return moment(createdAtVal).format("dddd, MMMM Do YYYY");
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// get total count of reactions on retrieval
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
