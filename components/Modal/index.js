import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "200px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};
const Modal = ({ showModal }) => {
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="backdrop"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className="blog-modal" variants={modal}>
            <div className="x-touch">
              <div className="line1"></div>
              <div className="line2"></div>
            </div>
            <p>Hey, you don't seem to logged in would you like to login?</p>
            <Link href="/api/v1/login">
              <button>Login</button>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
