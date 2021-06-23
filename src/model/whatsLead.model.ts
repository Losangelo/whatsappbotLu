import { Schema, model } from "mongoose";

interface IWhatsLead {
  _id: any,
  profile: {
    id: {
      server: string,
      user: string,
      _serialized: string,
    },
    status: string,
    isBusiness: boolean,
    canReceiveMessage: Boolean,
    numberExists: boolean,
  },
  created_At: Date,
  updated_At: Date,
}

// whatsLead.model;
const schema = new Schema({
  // _id: {type: Schema.Types.ObjectId},
  profile: {
    id: {
      server: String,
      user: String,
      _serialized: String,
    },
    status: String,
    isBusiness: Boolean,
    canReceiveMessage: Boolean,
    numberExists: Boolean,
  },
  created_At: { type: Date, default: Date.now },
  updated_At: { type: Date, default: Date.now },
});

// const WhatsLeadModel = model<IWhatsLead>("WhatsLead", schema);
// export default WhatsLeadModel
export default model<IWhatsLead>("WhatsLead", schema);
