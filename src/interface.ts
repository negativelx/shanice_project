export interface InstallPromptEvent extends Event {
    readonly platforms: Array<string>;
    readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
    }>;

    prompt(): Promise<void>;
}

export interface MemberSession {
    member?: {
        address: string,
        avatar: string,
        avatar_ver: number,
        birthday_product_id: number,
        created_at: string,
        date_of_birth: string,
        email: string,
        gender: string,
        highest_tier: number,
        id: number,
        mobile: string,
        mobile_prefix: string,
        name: string,
    };
    token?: string;
}
