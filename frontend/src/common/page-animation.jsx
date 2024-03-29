import { AnimatePresence, motion } from "framer-motion"

export const AnimationWrapper = ({
  children,
  className,
  keyValue,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  transition = { duration: 1 },
  exit = {},
}) => {
  return (
    <AnimatePresence>
      <motion.div
        key={keyValue}
        initial={initial}
        animate={animate}
        transition={transition}
        exit={exit}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
