import { motion } from "framer-motion";

export default function BlogHeader({
  title,
  subtitle,
  coverImage,
  date,
  author,
}) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit={{ opacity: 0 }}
      className="blog-detail-header"
    >
      <motion.p
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        className="lead mb-0"
      >
        <motion.img
          animate={{ x: 0, opacity: 1 }}
          initial={{ x: 200, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.2 }}
          src={author?.avatar}
          className="rounded-circle mr-3"
          height="50px"
          width="50px"
          alt="avatar"
        />
        {author?.name}
        {", "} {date}
      </motion.p>
      <motion.h1
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        className="font-weight-bold blog-detail-header-title mb-0"
      >
        {title}
      </motion.h1>
      <h2 className="blog-detail-header-subtitle mb-3">{subtitle}</h2>

      {coverImage && (
        <motion.img
          animate={{ x: 0, opacity: 1 }}
          initial={{ x: 200, opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.2 }}
          className="img-fluid rounded"
          src={coverImage}
          alt="TODO: provide alt"
        />
      )}
    </motion.div>
  );
}
