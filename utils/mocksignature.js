import crypto from "crypto"
import { razorpayInstance } from "../razorPayconfig.js";
const key = razorpayInstance.key_secret
export const mock=()=>{


const order_id = 'order_Og037ioJ5yIgZ0'; // Replace with your order_id
const pay_id = 'pay_H9o5O8Zf3UxY45'; // Replace with your pay_id
const key_secret = key ; // Replace with your key secret

const hmac = crypto.createHmac('sha256', key_secret);
hmac.update(order_id + '|' + pay_id);
const generated_signature = hmac.digest('hex');

console.log("signature",generated_signature); // Use this generated signature in the request
}