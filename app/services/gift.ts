import type { GiftWithDay } from '../api/gift/route';

export function getGifts(userEmail: string): Promise<GiftWithDay[]> {
    return fetch(`api/gift?email-addr=${userEmail}`).then(resp => resp.json());
}
