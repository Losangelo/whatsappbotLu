import mongoose, { Schema, model } from "mongoose";

interface ISurvey {
  title: String,
  description: String,
  like: [String],
  desLike: [String],
  start: Date,
  finish: Date,
}

// botConfig.model;
const schema = new Schema({
  title: String,
  description: String,
  like: [String],
  desLike: [String],
  start: Date,
  finish: Date,
})
export default model<ISurvey>("Survey", schema);
