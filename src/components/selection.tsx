import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Selection() {
  const [selectedTab, setSelectedTab] = useState('pika');

  return (
    <div className="window">
      <nav>
        <ul>
          {['pika', 'rola', 'pemba'].map((item) => (
            <li
              key={item}
              className={item === selectedTab ? "selected" : ""}
              onClick={() => setSelectedTab(item)}
            >
              {`${item}`}
              {item === selectedTab ? (
                <motion.div className="underline" layoutId="underline" />
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {selectedTab}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
