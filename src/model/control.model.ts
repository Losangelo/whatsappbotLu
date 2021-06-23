
import { ObjectId } from "mongodb";
import mongoose, { Schema, model } from "mongoose";


interface IControl {
  // whatsleadId: Number,
  usuario: String,
  status: {
    type: String,
    enum: [String],
  },
  created_At: Date,
  updated_At: Date,
}

// whatsLead.model;
const schema = new Schema({
  WhatsLeadId: {
    type: Schema.Types.ObjectId,
    ref: "whatslead",
  },
  user: String,
  //[8x envia link do site, pde para se cadastrar ]
  status: {
    type: String,
    enum: ["A", "S", "B"],
    default: "A",
    //'A' - Ativo default
    //'S' - Pediu para sair e pode voltar
    //'B' - Banido evita que seja usado em campanhas e não volta
  },
  created_At: { type: Date, default: Date.now },
});

// const ControlModel = model<IControl>("Control", schema);
// export default ControlModel
export default model<IControl>("Control", schema);
