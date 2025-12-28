import type { PiniaPluginContext } from 'pinia';
import type { ThemeInstance } from 'vuetify';
import { STORE_IDS } from '@/constants/stores';

export function createPiniaThemeSync (vuetifyTheme: ThemeInstance) {
  return ({ store }: PiniaPluginContext) => {
    if(store.$id===STORE_IDS.USER_PREFERENCES) {
      vuetifyTheme.global.name.value=store.theme;

      store.$subscribe((_mutation, state) => {
        if(state.theme!==vuetifyTheme.global.name.value) {
          vuetifyTheme.global.name.value=state.theme;
        }
      });
    }
  };
}
