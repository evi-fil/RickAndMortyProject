import { useRoute } from 'vue-router';
import { computed } from 'vue';

export function usePageFromQuery() {
  const route = useRoute();
  
  const page = computed(() => {
    return Number(route.query.page) || 1;
  });
  
  return page;
}