import { useEffect, useState } from 'react';

const dayToDate: Record<number, Date> = {
    1: new Date(2023, 11, 3, 0, 0, 0),
    2: new Date(2023, 11, 10, 0, 0, 0),
    3: new Date(2023, 11, 17, 0, 0, 0),
    4: new Date(2023, 11, 24, 0, 0, 0),
};

export default function Countdown({ day }: any) {
    const date = dayToDate[day];

    const [now, setNow] = useState(Date.now());

    // useEffect(() => {
    //     setN
    // }, [now])

    date;

    // return (
    //     // <span>{date}</span>
    // )
}
