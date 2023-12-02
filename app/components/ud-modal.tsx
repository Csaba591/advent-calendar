import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function UDModal({ isOpen, onUserInfoProvided }: any) {
    const [open, setOpen] = useState(true);

    const nameInputRef = useRef(null);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    const [showDuplicateEmailError, setShowDuplicateEmailError] =
        useState(false);

    function submitForm(formData: FormData) {
        const fullname = formData.get('fullname');
        const email = formData.get('email');

        if (!fullname || !email) return;

        fetch(new Request('api/person'), {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullname: fullname,
                email: email,
            }),
        })
            .then(async resp => {
                const json = await resp.json();
                console.log(resp);
                console.log(json);

                if (resp.status === 201 || resp.status === 200) {
                    setOpen(false);
                    onUserInfoProvided(json);
                    return;
                }

                if (resp.status === 400) {
                    if (json.error === 'duplicate_email') {
                        setShowDuplicateEmailError(true);
                    }
                }
            })
            .catch(err => {
                // handle offline
            });
    }

    function emailChange(value: string) {
        setShowDuplicateEmailError(false);
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={nameInputRef}
                onClose={setOpen}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-teal-600 sm:mx-0 sm:h-10 sm:w-10">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6 text-white"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-base font-semibold leading-6 text-gray-900"
                                            >
                                                Kérjük először adjon meg pár
                                                fontos adatot!
                                            </Dialog.Title>

                                            <form
                                                action={submitForm}
                                                id="userInfoForm"
                                                className="mt-6"
                                            >
                                                <div className="mt-3">
                                                    <label
                                                        htmlFor="fullName"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Teljes név
                                                    </label>
                                                    <div className="relative mt-2 rounded-md shadow-sm">
                                                        <input
                                                            ref={nameInputRef}
                                                            type="text"
                                                            name="fullname"
                                                            id="fullName"
                                                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mt-3">
                                                    <label
                                                        htmlFor="email"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        E-mail cím
                                                    </label>
                                                    <div className="relative mt-2 rounded-md shadow-sm">
                                                        <input
                                                            name="email"
                                                            type="email"
                                                            id="email"
                                                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            required
                                                            onChange={e =>
                                                                emailChange(
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                {showDuplicateEmailError ? (
                                                    <div>
                                                        Ez az email cím már
                                                        regisztrálva lett!
                                                    </div>
                                                ) : null}
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 mt-2 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="submit"
                                        form="userInfoForm"
                                        className="inline-flex w-full justify-center rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 sm:ml-3 sm:w-auto"
                                    >
                                        Mentés
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setOpen(false)}
                                    >
                                        Vissza
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
