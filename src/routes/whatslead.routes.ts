import express from 'express'
const WhatsLeadRoutes = express.Router()

import run from '../middleware/dbMongoose'
import WhatsLead from "../model/whatsLead.model";

//POST
WhatsLeadRoutes.post('/whatsleads', async (req:express.Request, res: express.Response, next: express.NextFunction) =>{
  try {
     const wfound = await db.collection('WhatsappLeads').findOne(req.body);

     if (!wfound){
        const response = await db.collection('WhatsLeads').insertOne({
          whatsName,
          whatsNumber,
          // control.contactCounter: +1,
          // control.status,
        });
        res.status(200).json(response.ops[0]).end()
      }

  } catch (error) {
    res.json({ error: true, message: error.message }).end()
  }
})

WhatsLeadRoutes.get('/whatsleads', (req, res) => {
  const WhatsappLeads = db.Mongoose.model("WhatsappLeads", db.WhatsappLeadsSchema, "WhatsappLeads");
  const docs = await WhatsappLeads.find({}).lean().exec();
  res.render("index", { docs }).end();
})


//GET
// WhatsLeadRoutes.get('/whatsleads/:whatsleadID', async (req, res) =>{
//   try {
//     const { whatsleadID } = req.params;
//     res.json({wlead});
//   } catch (error) {
//     res.json({ error: true, message: error.message })
//   }
// })


export  {WhatsLeadRoutes}
