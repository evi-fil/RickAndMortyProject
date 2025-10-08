import { onMounted, onBeforeUnmount } from 'vue';
import { useCharactersStore } from '@/stores/characters';
import { useRoute, useRouter } from 'vue-router';

export function useKeyboardPagination() {
  const store = useCharactersStore();
  const router = useRouter();
  const route = useRoute();

  function handleKeydown(event) {
    if (event.key === 'ArrowLeft') {
      store.prevPage();
    } else if (event.key === 'ArrowRight') {
      store.nextPage();
    }
    router.push({ path: route.fullPath, query: { page: store.page } });
  }

  onMounted(() => window.addEventListener('keydown', handleKeydown));
  onBeforeUnmount(() => window.removeEventListener('keydown', handleKeydown));
}