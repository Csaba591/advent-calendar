import { Fragment, useEffect, useRef, useState } from 'react';

export default function UserDetailsModal({
    isOpen,
    onUserInfoProvided,
}: Record<string, any>) {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    const [isModalOpen, setModalOpen] = useState(isOpen);

    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        const modalElement = dialogRef.current;
        if (!modalElement) return;

        if (isModalOpen) {
            modalElement.showModal();
        } else {
            modalElement.close();
        }
    }, [isModalOpen]);

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

                if (resp.status === 201) {
                    setModalOpen(false);
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
        <>
            <dialog ref={dialogRef}>
                <div className="modal">
                    <h1>Üdv az adventi naptárban!</h1>
                    <h2>Kérjük először adjon meg pár fontos adatot!</h2>

                    <form action={submitForm}>
                        <label>
                            <div>Teljes Név</div>
                            <input name="fullname" type="text" required />
                        </label>
                        <label>
                            <div>E-mail cím</div>
                            <input
                                onChange={e => emailChange(e.target.value)}
                                name="email"
                                type="email"
                                required
                            />
                        </label>
                        {showDuplicateEmailError ? (
                            <div>Ez az email cím már regisztrálva lett!</div>
                        ) : null}
                        <br />
                        <button type="submit">OK</button>
                    </form>
                </div>
            </dialog>

            {/* <div
                className="relative z-10"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"></div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3
                                            className="text-base font-semibold leading-6 text-gray-900"
                                            id="modal-title"
                                        >
                                            Üdv az adventi naptárban!
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Kérjük először adjon meg pár
                                                fontos adatot!
                                            </p>
                                            <form action={submitForm}>
                                                <div>
                                                    <label
                                                        htmlFor="fullName"
                                                        className="block text-sm font-medium leading-6 text-gray-900"
                                                    >
                                                        Teljes név
                                                    </label>
                                                    <div className="relative mt-2 rounded-md shadow-sm">
                                                        <input
                                                            type="text"
                                                            name="fullname"
                                                            id="fullName"
                                                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div>
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

                                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                    <button
                                                        type="submit"
                                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                    >
                                                        Mentés
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
}
