import React, { memo } from "react";
import { motion } from "framer-motion";

export const HeaderActions = memo(() => {
  return (
    <motion.div
      className="justify-self-center absolute right-0 top-0 left-0 flex justify-between h-[50px] bg-slate-500 text-white rounded-tl-[5px] rounded-tr-[5px] z-10 p-2"
      initial={{ opacity: 0, width: "95%" }}
      animate={{ opacity: 1, width: "100%" }}
      exit={{ opacity: 0, width: "95%" }}
    >
      HeaderActions
    </motion.div>
  );
});
