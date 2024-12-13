import React from 'react';
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link';

function PopUpModal({ open, setOpen }: { open: boolean, setOpen(x: boolean): any }) {

  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setIsOpen(open);
  }, [open])

  if (!isOpen) {
    return null;
  }

  function closeModal() {
    setIsOpen(false);
    setOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-red-900"
                >
                  Extension Not Found
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Kindly install MetaMask extension by clicking below button.
                  </p>
                </div>

                <div className="mt-4">
                  <p className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                    <Link
                      href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'
                      target="_blank"
                    >
                      Install Extension
                    </Link>
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )

}


export default PopUpModal