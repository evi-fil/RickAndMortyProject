import { onMounted, onBeforeUnmount } from 'vue';
import { useCharactersStore } from '@/stores/characters';
import { useRouter } from 'vue-router';

export function useKeyboardNavigation(prevCharacter, nextCharacter) {
  const store = useCharactersStore();
  const router = useRouter();

  function handleKeydown(event) {

    let character;

    if (event.key === 'ArrowLeft') {
        character = prevCharacter;
    } else if (event.key === 'ArrowRight') {
        character = nextCharacter;
    }

    if (character?.value?.id) {
        router.push({ path: "/character/" + character.value.id, query: { page: store.page } });
    }
  }

  onMounted(() => window.addEventListener('keydown', handleKeydown));
  onBeforeUnmount(() => window.removeEventListener('keydown', handleKeydown));
}