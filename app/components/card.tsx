export default function Card({ onClick, day }: Record<string, any>) {
    const backgroundColor = day !== 3 ? 'bg-fuchsia-900' : 'bg-fuchsia-600';

    return (
        <div
            className={`cursor-pointer inline-block text-white advent-card border border-solid rounded-lg hover:-translate-y-1 transition ease-in-out delay-50 ${backgroundColor}`}
            onClick={onClick}
        >
            {`${day}. vasárnap`}
        </div>
    );
}
