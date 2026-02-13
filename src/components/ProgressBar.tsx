import { motion } from "framer-motion";

export default function ProgressBar({ value = 80, max = 100 }) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full max-w-md p-4">
        <div className="flex flex-row justify-between mt-2 text-sm">
            <p className="text-gray-600">Progress</p>
            <p className="font-medium">{value}/{max} tasks</p>
        </div>
      <div className="w-full h-2 bg-gray-200 rounded-2xl overflow-hidden shadow-inner mt-2">
        <motion.div
          className="h-2     bg-slate-950 rounded-2xl"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
