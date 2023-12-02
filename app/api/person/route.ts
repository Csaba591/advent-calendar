import { NextResponse, type NextRequest } from 'next/server';
import { Prisma } from '@prisma/client';
import prisma from '@/lib/prisma';
import { PersonSchema } from './person-schema';
import { Person } from '@prisma/client';

export async function POST(request: NextRequest): Promise<
    | NextResponse<{
          errorMessage: string;
      }>
    | NextResponse<PersonDTO>
> {
    const requestData = await request.json();
    const check = PersonSchema.safeParse(requestData);

    if (!check.success) {
        return NextResponse.json(
            { errorMessage: 'Helytelen név vagy e-mail cím.' },
            { status: 400 }
        );
    }

    let { fullname, email } = check.data;
    fullname = fullname.trim();
    email = email.trim();

    const existingPerson = await prisma.person.findUnique({
        where: { email: email, name: fullname },
    });
    if (existingPerson) {
        return NextResponse.json(toPersonDTO(existingPerson), { status: 200 });
    }

    try {
        const newPerson = await prisma.person.create({
            data: { name: fullname, email: email },
        });

        return NextResponse.json(toPersonDTO(newPerson), { status: 201 });
    } catch (err: unknown) {
        if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === 'P2002' // value of unique field (=email) already in use
        ) {
            const existingPerson = await prisma.person.findUnique({
                where: { email: email, name: fullname },
            });

            if (existingPerson) {
                return NextResponse.json(toPersonDTO(existingPerson), {
                    status: 200,
                });
            }
        }

        return NextResponse.json(
            {
                errorMessage:
                    'Váratlan hiba történt... próbáld újra egy kis idő múlva.',
            },
            { status: 500 }
        );
    }
}

export type PersonDTO = { email: string; id: string };

function toPersonDTO(person: Person): PersonDTO {
    return { email: person.email, id: person.id };
}
