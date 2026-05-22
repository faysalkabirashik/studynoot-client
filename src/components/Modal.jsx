import { X } from 'lucide-react'

const Modal = ({ title, children, onClose, size = 'max-w-2xl' }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-8">
      <div className={`max-h-[92vh] w-full ${size} overflow-y-auto rounded-lg bg-white p-6 dark:bg-[#1f2937]`}>
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-[#17211a] dark:text-white">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#d6e1da] p-2 text-[#425348] hover:border-[#1f7a4c] dark:border-[#31463a] dark:text-[#eff7f1]"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
