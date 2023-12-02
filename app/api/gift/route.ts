import { NextResponse, type NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { Gift, Person } from '@prisma/client';

export interface GiftWithDay {
    gift: {
        id: string;
        name: string;
        content: string;
    };
    day: number;
}

export async function GET(request: NextRequest): Promise<
    | NextResponse<{
          errorMessage: string;
      }>
    | NextResponse<GiftWithDay[]>
> {
    const emailOfUser = request.nextUrl.searchParams.get('email-addr');

    if (!emailOfUser) {
        return NextResponse.json(
            { errorMessage: 'Hibás email cím.' },
            { status: 400 }
        );
    }

    try {
        let person = await prisma.person.findFirst({
            where: { email: emailOfUser },
            include: { giftsWon: { include: { gift: true } } },
        });

        if (!person) throw new Error('unregistered user');

        if (!person.giftsWon.length) {
            const giftsOfPerson = await autoGenerateGiftsForUser(person);
            return NextResponse.json(giftsOfPerson);
        }

        return NextResponse.json(
            person.giftsWon.map(gift => ({ gift: gift.gift, day: gift.day }))
        );
    } catch (err: unknown) {
        console.log(err);

        return NextResponse.json(
            { errorMessage: 'Ön még nem regisztrált.' },
            { status: 404 }
        );
    }
}

async function autoGenerateGiftsForUser(user: Person) {
    const allGifts = await prisma.gift.findMany();

    const days = Array.from({ length: 4 }).map((_, index) => index + 1);

    const giftsForUser = days.map(day => pickGiftForDay(day, allGifts));

    await prisma.giftOfPerson.createMany({
        data: giftsForUser.map(gift => ({
            giftId: gift.giftId,
            personId: user.id,
            day: gift.day,
        })),
    });

    const results = await prisma.giftOfPerson.findMany({
        where: { personId: user.id },
        include: { gift: true },
    });

    return results.map(gift => ({ gift: gift.gift, day: gift.day }));
}

function pickGiftForDay(day: number, allGifts: Gift[]) {
    const giftIndex = Math.floor(Math.random() * allGifts.length);
    return { day: day, giftId: allGifts[giftIndex].id };
}
