import { useAuthStore as UseAuthStore } from '@/stores/auth.store';
import { useUserStore as UseUserStore } from '@/stores/user.store';
import { useNavStore as UseNavStore } from '@/stores/nav.store';
import { useOtherStore as UseOtherStore } from '@/stores/other.store';

export const useAuthStore = () => UseAuthStore();
export const useUserStore = () => UseUserStore();
export const useNavStore = () => UseNavStore();
export const useOtherStore = () => UseOtherStore();
