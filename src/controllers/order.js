 import Order from "../models/order.js"
 import moment from "moment"
 
 
 export const orderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const {status} =req.body

        const order = await Order.findByIdAndUpdate(orderId, {status}, {new: true});

        if(!order)
        return res.status(404).json({success: false, message:"Order not found"})

        res.json({success: true, message: `Your order stausus has been updated to "${status}"`, orderStatus: order.status})
        
    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false, message: err.message});
        
    }
 }

 // create the following end points

 // getAllOrders

 export const getAllOrders = async (req, res) => {
    try {
        const order = await Order.find();
        res.json({success: true, message:"Order Process successfully", order});
        
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false, message: err.message})
        
    }
 }

 export const getOrderById = async(req, res)=>{
    try {
      const {orderId} = req.params
      const order = await Order.findById(orderId)
      
      if(!Order){
          return res.status(404).json({success: false , message: "order not found"})
      }
      res.json({success: true, message: "Order Retrieved successfully", order})
  
    } catch (err) {
      console.log("Error creating your order", err.message);
      res.status(500).json({success: false, error: "Internal server error", message: err.message})
      
    }
  }

  export const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.deleteOne({_id: orderId})
        if(!order){
            return res.status(404).json({success: false, message: "Order not found"})
        }
        res.json({success: true, message: "Order deleted successfully", order})
    } catch (err) {
        console.log("Error deleting order", err.message)
        res.status(500).json({success: false, error: "Internal server error", message: err.message})
    }
}

// Controller function to search orders by date or date range with pagination
// export const searchOrdersByDate = async (req, res) => {
//     const { startDate, endDate } = req.query;
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;
  
//     try {
//       let query = {};
  
//       // Check if both startDate and endDate parameters are provided
//       if (startDate && endDate) {
//         query.createdAt = {
//           $gte: new Date(startDate),
//           $lte: new Date(endDate),
//         };
//       } else if (startDate) {
//         // If only startDate is provided, search orders created on or after startDate
//         query.createdAt = { $gte: new Date(startDate) };
//       } else if (endDate) {
//         // If only endDate is provided, search orders created on or before endDate
//         query.createdAt = { $lte: new Date(endDate) };
//       }
  
//       // Search orders based on the constructed query
//       const orders = await Order.find(query).skip(skip).limit(limit);
//       const totalOrders = await Order.countDocuments(query);
  
//       res.json({
//         currentPage: page,
//         ordersFound: totalOrders,
//         totalPages: Math.ceil(totalOrders / limit),
//         orders,
//       });
//     } catch (err) {
//       console.error("Error searching orders by date:", err.message);
//       res
//         .status(500)
//         .json({
//           success: false,
//           message: "Failed to search orders",
//           errorMsg: err.message,
//         });
//     }
//   };

export const searchOrdersByDate = async (req, res) => {
    try {
      const { startDate, endDate } = req.body;
  
      if (!startDate && !endDate) {
        return res.status(400).json({ success: false, message: 'Start date or end date is required' });
      }
  
      let query = {};
  
      // Parse start date
      if (startDate) {
        const parsedStartDate = moment(startDate);
        console.log(parsedStartDate);
  
        if (!parsedStartDate.isValid()) {
          return res.status(400).json({ success: false, message: 'Invalid start date format' });
        }
  
        query.createdAt = { $gte: parsedStartDate.toDate() };
      }
  
      // Parse end date
      if (endDate) {
        const parsedEndDate = moment(endDate);
        console.log(parsedEndDate);
  
        if (!parsedEndDate.isValid()) {
          return res.status(400).json({ success: false, message: 'Invalid end date format' });
        }
    
        // If both start date and end date are provided, add $lte condition
        if (query.createdAt) {
          query.createdAt.$lte = parsedEndDate.toDate();
        } else {
          query.createdAt = { $lte: parsedEndDate.toDate() };
        }
      }
  
      const orders = await Order.find(query);
  
      res.status(200).json({ success: true, orders });
    } catch (error) {
      console.error('Error searching orders by date:', error.message);
      res.status(500).json({ success: false, message: 'Failed to search orders', errorMsg: error.message });
    }
  };