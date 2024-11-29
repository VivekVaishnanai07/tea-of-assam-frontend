import { motion } from 'framer-motion';
import "./card.css";

const Card = ({ icon: Icon, title, color, data }) => {
  return (
    <motion.div className="card-wrapper" whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}>
      <div className="card-header">
        <Icon size={22} style={{ color: color, marginRight: "0.5rem" }} />
        {title}</div>
      <div className="card-content">{data}</div>
    </motion.div>
  )
}

export default Card;