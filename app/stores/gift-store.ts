import type { GiftWithDay } from '../api/gift/route';

class GiftStore {
    gifts: GiftWithDay[] = [];

    getGiftByDay(day: number) {
        return this.gifts.find(gift => gift.day === day);
    }
}

export const giftStore = new GiftStore();
