"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "./button"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  content?: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, subtitle, content }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-slate-200">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{title}</h3>
                {subtitle && <p className="text-slate-500 font-medium font-press">{subtitle}</p>}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full p-2"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">{content}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
