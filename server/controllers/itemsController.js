import Item  from "../models/ItemSchema.js";



export const addItem = async (req, res) => {
  try {
    const { itemName, price, status, category, picture } = req.body;
    console.log(req.body)

    const newItem = new Item({
      itemName,
      price,
      status,
      category,
      picture
    });

    const savedItem = await newItem.save();

    res.status(201).json({ message: 'Item added successfully', item: savedItem });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add item', error: error.message });
  }
};





export const getAllItems = async (req, res) => {
  try {
    // Fetch all items from the database
    const items = await Item.find();

    // Return the items as JSON response
    res.status(200).json({ success: true, items });
  } catch (error) {
    console.error('Error getting items:', error.message);
    res.status(500).json({ success: false, message: 'Failed to get items' });
  }
};


export const changeItemStatus = async (req, res) => {
  const { id } = req.params;
  const { newStatus } = req.body;

  try {
    // Find the item by ID
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    item.status = newStatus;

    // Save the updated item
    const updatedItem = await item.save();

    res.status(200).json({ success: true, item: updatedItem });
  } catch (error) {
    console.error('Error changing item status:', error.message);
    res.status(500).json({ success: false, message: 'Failed to change item status' });
  }
};


export const itemDetails = async (req, res) => {
  const { id } = req.params;
  console.log(id)

  try {
    // Find the item by ID
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    console.log(item)
    res.status(200).json({ success: true, item: item });
  } catch (error) {
    console.error('Error changing item status:', error.message);
    res.status(500).json({ success: false, message: 'Failed to change item status' });
  }
};


export const deleteMachineById = async (req, res) => {
  try {
    const { id } = req.params;
  
    const deletedMachine = await Item.findByIdAndDelete(id);

    if (!deletedMachine) {
      return res.status(404).json({ error: 'Machine not found' });
    }
    
    // Return a success message
    res.status(200).json({ success: 'Machine deleted successfully', deletedMachine });
  } catch (error) {
    console.error('Error deleting machine:', error);
    res.status(500).json({ error: 'Failed to delete machine' });
  }
};