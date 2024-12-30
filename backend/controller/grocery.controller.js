import Grocery from "../model/grocery.model.js";
import mongoose from "mongoose";


// Controller to fetch all the groceries in the database
export const getGrocery = async(req, res) => {
  console.log("wsdtu")
  try {
    const groceries = await Grocery.find({});
    res.status(200).json({ 
      success: true,
      data: groceries  
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error fetching your groceries`
    });
  }
}

// Controller to create and store a grocery in the database
export const createGrocery = async(req, res) => {
  const grocery = req.body

  console.log(grocery)

  const groceryObject = new Grocery(grocery);

  try {
    
    await groceryObject.save();
    res.status(200).json({
      success: true,
      data: groceryObject
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Error creating grocery ${error}`
    });
  }
}

// Controller to update grocery from the database
export const updateGrocery = async(req, res) => {
  const { id } = req.params;

  const grocery = req.body;

  if(!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json(
      {
        success: false,
        message: `Invalid id`
      }
    )
  }

  try {
    const updateGrocery = await Grocery.findByIdAndUpdate(id, grocery, {new: true})
    res.status(200).json({
      success: true,
      data: updateGrocery
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error"
    })
  }
}

// Controller to delete grocery from the database
export const deleteGrocery = async(req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)){
    res.status(404).json({
      success: false,
      message: "Invalid id"
    })
  }

  try {
    await Grocery.findByIdAndDelete(id)
    res.status(200).json({
      success: true,
      message: 'Grocery deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Unable to delete grocery`
    })
  }
}