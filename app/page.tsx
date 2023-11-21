'use client'

import { useRef, useState } from "react"

function Card({ openDialog }: Record<string, any>) {
    function handleClick() {
        openDialog()
    }

    return (
        <div className="advent-card border border-solid m-5" onClick={handleClick}>I'm a card</div>
    )
}

export default function AdventPage() {
    const dialogElement = useRef(null)

    function openDialog() {
        if (dialogElement.current) {
            (dialogElement.current as any).showModal()

        }
    }

    const cards = Array.from({ length: 24 }).map((_, index) => <Card key={index} openDialog={openDialog} />) as JSX.Element[]


    return (
        <>
            <h1>Advent!</h1>
            <main className="container mx-auto grid grid-cols-4">
                {cards}
            </main>


            <dialog ref={dialogElement}>
                <div className="modal">
                    <h1>Gratulálunk!</h1>
                    <p>Greetings, one and all!</p>
                    <form method="dialog">
                        <button>OK</button>
                    </form>
                </div>
            </dialog>
        </>
    )
}

