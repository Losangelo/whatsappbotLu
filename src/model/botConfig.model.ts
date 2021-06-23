import mongoose, { Schema, model } from "mongoose";

interface IbotConfig {
  msnWelcome: String;
  redirectAction: {
    qtContacts: Number;
    msnAction: String;
  };
  action: [
    {
      key: String;
      msnAction: String;
    }
  ];
}

// botConfig.model;
const schema = new Schema({
  msnWelcome: String,  //primeiro contato

  redirectAction: [
    {
      qtContacts: Number,
      msnAction: String,
    }
  ],

  action: [
    {
      key: String,
      msnAction: String
    }
  ],
})
export default model<IbotConfig>("BotConfig", schema);
