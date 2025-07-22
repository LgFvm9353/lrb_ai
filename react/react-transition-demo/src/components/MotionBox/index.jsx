import { motion } from "framer-motion";
const MotionBox = ()=>{
    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{backgroundColor:'skyblue',padding: 20}}
        >
            <h2>Motion Box</h2>
        </motion.div>
    )
}
export default MotionBox