'use client';

import { useState } from 'react';
import Card from './components/card';
import GModal, { GiftModalContext } from './components/g-modal';
// import GiftModal, { GiftModalContext } from './components/gift-modal';
import Navbar from './components/navbar';
import UDModal from './components/ud-modal';
import UserDetailsModal from './components/user-details-modal';
import { getGifts } from './services/gift';
import { giftStore } from './stores/gift-store';
import { userStore } from './stores/user-store';
import { PersonDTO } from './api/person/route';

export default function AdventPage() {
    console.log('AdventPage()');

    const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(
        !userStore.currentUser
    );
    const [giftModalContext, setGiftModalContext] = useState<GiftModalContext>({
        isOpen: false,
    });

    function handleUserInfoProvided(user: PersonDTO) {
        console.log(user);
        userStore.currentUser = user;

        getGifts(user.email).then(gifts => {
            console.log(gifts);
            giftStore.gifts = gifts;
        });
    }

    function handleCardClick(dayIndex: number) {
        console.log('card click', isUserInfoModalOpen);

        if (isUserInfoModalOpen) setIsUserInfoModalOpen(false);

        if (!userStore.currentUser) {
            setTimeout(() => {
                setIsUserInfoModalOpen(true);
            }, 0);
            return;
        } else {
            const giftForDay = giftStore.getGiftByDay(dayIndex + 1);
            setGiftModalContext({ isOpen: true, gift: giftForDay! });
        }
    }

    function handleGiftModalClose() {
        setGiftModalContext({ isOpen: false });
    }

    const cards = Array.from({ length: 4 }).map((_, index) => (
        <Card
            key={index}
            onClick={() => handleCardClick(index)}
            day={index + 1}
        />
    )) as JSX.Element[];

    return <div>Jelenleg nem működik</div>;

    return (
        <>
            <Navbar />

            <main className="container mx-auto">
                {/* <div className="flex flex-row justify-center my-20">
                    <span className="mx-12">{cards[0]}</span>
                    <span className="mx-12">{cards[1]}</span>
                </div>
                <div className="flex flex-row justify-center my-20">
                    <span className="mx-12">{cards[2]}</span>
                    <span className="mx-12">{cards[3]}</span>
                </div> */}
                <div className="flex flex-row justify-center gap-x-12 mt-28">
                    {cards}
                </div>
            </main>

            {/* <GiftModal
                context={giftModalContext}
                onClose={handleGiftModalClose}
            /> */}

            <GModal context={giftModalContext} />

            {/* <UserDetailsModal
                onUserInfoProvided={handleUserInfoProvided}
                isOpen={isUserInfoModalOpen}
            /> */}

            <UDModal
                isOpen={isUserInfoModalOpen}
                onUserInfoProvided={handleUserInfoProvided}
            />
        </>
    );
}
