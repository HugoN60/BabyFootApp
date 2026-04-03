<script setup lang="ts">
useHead({
  title: 'Babyfoot',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' }
  ]
})

const ranking = [
  { name: 'Thomas', elo: 1892 },
  { name: 'Julie', elo: 1845 },
  { name: 'Marc', elo: 1821 },
  { name: 'Sarah', elo: 1788 },
  { name: 'Lucas', elo: 1756 },
  { name: 'Emma', elo: 1723 },
  { name: 'Hugo', elo: 1698 },
  { name: 'Léa', elo: 1665 },
  { name: 'Nico', elo: 1632 },
  { name: 'Chloé', elo: 1598 }
]
</script>

<template>
 <div><h1 style="text-align: center;">BabyFoot IUT A</h1></div>


  <div
    class="flex min-h-dvh flex-col bg-stone-50 pt-[env(safe-area-inset-top)] pb-[max(0.75rem,env(safe-area-inset-bottom))]"
  >
    <header
      class="flex shrink-0 items-center justify-between border-b border-stone-200/80 bg-white px-3 py-2.5"
    >
      <UButton icon="i-lucide-home" variant="ghost" color="neutral" size="lg" square />
      <nav class="flex items-center gap-0.5">
        <UButton icon="i-lucide-trophy" variant="ghost" color="neutral" size="lg" square />
        <UButton icon="i-lucide-user-round" variant="ghost" color="neutral" size="lg" square />
        <UButton icon="i-lucide-menu" variant="ghost" color="neutral" size="lg" square />
      </nav>
    </header>

    <main class="flex flex-1 flex-col px-4 py-5">
      <div class="mb-5 flex justify-center">
        <div class="relative w-full max-w-sm">
          <div
            class="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 opacity-75 blur-sm"
            style="animation: match-border 3s ease-in-out infinite"
          />
          <UButton
            size="xl"
            color="primary"
            class="match-cta relative w-full overflow-hidden rounded-2xl px-6 py-4 text-base font-semibold ring-0"
            block
          >
            <span class="match-shimmer pointer-events-none absolute inset-0 z-0" />
            <span class="relative z-10 flex items-center justify-center gap-2">
              <UIcon name="i-lucide-swords" class="size-5" />
              Faire un match
            </span>
          </UButton>
        </div>
      </div>

      <UCard
        class="flex-1 ring-1 ring-stone-200/80"
        :ui="{ body: { padding: 'p-0 sm:p-0' } }"
      >
        <ul class="divide-y divide-stone-100">
          <li
            v-for="(row, i) in ranking"
            :key="row.name"
            class="flex items-center justify-between gap-3 px-4 py-3"
          >
            <div class="flex min-w-0 items-center gap-3">
              <span class="w-6 shrink-0 tabular-nums text-stone-400">{{ i + 1 }}</span>
              <span class="truncate font-medium text-stone-800">{{ row.name }}</span>
            </div>
            <span class="shrink-0 tabular-nums text-stone-600">{{ row.elo }}</span>
          </li>
        </ul>
      </UCard>
    </main>

    <footer class="shrink-0 border-t border-stone-200/80 bg-white py-3" />
  </div>
</template>

<style scoped>
.match-cta {
  box-shadow:
    0 10px 25px -5px rgb(5 150 105 / 0.4),
    0 0 0 0 rgb(16 185 129 / 0.35);
  animation: match-pulse 2.4s ease-in-out infinite;
}

@keyframes match-pulse {
  0%,
  100% {
    box-shadow:
      0 10px 25px -5px rgb(5 150 105 / 0.35),
      0 0 0 0 rgb(16 185 129 / 0.35);
  }
  50% {
    box-shadow:
      0 14px 30px -8px rgb(5 150 105 / 0.5),
      0 0 0 12px rgb(16 185 129 / 0);
  }
}

@keyframes match-border {
  0%,
  100% {
    opacity: 0.55;
    filter: hue-rotate(0deg);
  }
  50% {
    opacity: 0.95;
    filter: hue-rotate(12deg);
  }
}

.match-shimmer {
  background: linear-gradient(
    105deg,
    transparent 0%,
    transparent 40%,
    rgb(255 255 255 / 0.35) 50%,
    transparent 60%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: match-shimmer 2.2s ease-in-out infinite;
}

@keyframes match-shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
