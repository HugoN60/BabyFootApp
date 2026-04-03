<script setup lang="ts">
useHead({
  title: 'BabyFootApp',
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

const descSection = ref<HTMLElement | null>(null)
const descVisible = ref(false)

onMounted(() => {
  const el = descSection.value
  if (!el || typeof IntersectionObserver === 'undefined') {
    descVisible.value = true
    return
  }
  const ob = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry?.isIntersecting) {
        descVisible.value = true
        ob.disconnect()
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
  )
  ob.observe(el)
  onUnmounted(() => ob.disconnect())
})
</script>

<template>
  <div
    class="flex min-h-dvh flex-col bg-[linear-gradient(180deg,#f5f5f4_0%,#fafaf9_45%,#ecfdf5_100%)] pt-[env(safe-area-inset-top)] pb-[max(0.75rem,env(safe-area-inset-bottom))]"
  >
    <header
      class="sticky top-0 z-20 flex shrink-0 items-center justify-between border-b border-stone-200/90 bg-white/90 px-3 py-2.5 backdrop-blur-md"
    >
      <span class="pl-1 text-sm font-semibold tracking-tight text-stone-900">BabyFootApp</span>
      <nav class="flex items-center gap-0.5">
        <UButton
          icon="i-lucide-home"
          variant="ghost"
          color="neutral"
          size="lg"
          square
          class="text-stone-800 hover:bg-stone-100 hover:text-stone-950"
        />
        <UButton
          icon="i-lucide-trophy"
          variant="ghost"
          color="neutral"
          size="lg"
          square
          class="text-stone-800 hover:bg-stone-100 hover:text-stone-950"
        />
        <UButton
          icon="i-lucide-user-round"
          variant="ghost"
          color="neutral"
          size="lg"
          square
          class="text-stone-800 hover:bg-stone-100 hover:text-stone-950"
        />
        <UButton
          icon="i-lucide-menu"
          variant="ghost"
          color="neutral"
          size="lg"
          square
          class="text-stone-800 hover:bg-stone-100 hover:text-stone-950"
        />
      </nav>
    </header>

    <main class="flex flex-1 flex-col">
      <!-- Hero -->
      <section
        class="relative overflow-hidden px-5 pb-2 pt-8"
        aria-labelledby="hero-title"
      >
        <div
          class="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full bg-emerald-400/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          class="pointer-events-none absolute -bottom-8 -left-12 size-48 rounded-full bg-teal-400/20 blur-3xl"
          aria-hidden="true"
        />

        <p
          class="relative mb-3 inline-flex items-center rounded-full border border-emerald-200/80 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-800 shadow-sm backdrop-blur-sm"
        >
          IUT A · Babyfoot
        </p>

        <h1
          id="hero-title"
          class="relative text-4xl font-extrabold leading-[1.05] tracking-tight text-stone-900 sm:text-[2.75rem]"
        >
          BabyFootApp
        </h1>

        <p class="relative mt-3 max-w-[20rem] text-[15px] leading-snug text-stone-600">
          Enregistre tes matchs, calcule ton Elo et grimpe dans le classement.
        </p>
      </section>

      <!-- Description révélée au scroll -->
      <section
        ref="descSection"
        class="relative px-5 py-6"
        aria-label="À propos"
      >
        <div
          class="rounded-2xl border border-stone-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-sm"
          :class="[
            'reveal-wrap transition-shadow duration-500',
            descVisible ? 'shadow-md shadow-stone-200/60' : ''
          ]"
        >
          <p
            class="reveal-line text-sm font-medium text-stone-800"
            :class="{ 'reveal-line--on': descVisible }"
            style="--reveal-delay: 0ms"
          >
            Une appli pensée pour le babyfoot de l’IUT : rapide à utiliser sur mobile, centrée sur la compétition et le fair-play.
          </p>
          <p
            class="reveal-line mt-3 text-sm leading-relaxed text-stone-600"
            :class="{ 'reveal-line--on': descVisible }"
            style="--reveal-delay: 90ms"
          >
            Fais défiler </p>
          <p
            class="reveal-line mt-3 text-sm leading-relaxed text-stone-600"
            :class="{ 'reveal-line--on': descVisible }"
            style="--reveal-delay: 180ms"
          >
            Zaza
          </p>
        </div>
      </section>

      <!-- CTA -->
      <section class="px-5 pb-6">
        <div class="relative mx-auto w-full max-w-sm">
          <div
            class="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-500 opacity-80 blur-sm"
            style="animation: hero-glow 4s ease-in-out infinite"
            aria-hidden="true"
          />
          <UButton
            size="xl"
            color="primary"
            class="match-cta relative w-full overflow-hidden rounded-2xl px-6 py-4 text-base font-semibold ring-0"
            block
          >
            <span class="match-shimmer pointer-events-none absolute inset-0 z-0" />
            <span class="relative z-10 flex items-center justify-center gap-2 text-white">
              <UIcon name="i-lucide-swords" class="size-5" />
              Faire un match
            </span>
          </UButton>
        </div>
      </section>

      <!-- Classement -->
      <section class="flex flex-1 flex-col px-5 pb-6" aria-labelledby="ranking-heading">
        <h2
          id="ranking-heading"
          class="mb-3 text-xs font-semibold uppercase tracking-wider text-stone-500"
        >
          Classement Elo
        </h2>
        <UCard
          class="border border-stone-200/90 bg-white shadow-sm ring-0"
          :ui="{ body: { padding: 'p-0 sm:p-0' }, root: 'overflow-hidden rounded-2xl' }"
        >
          <ul class="divide-y divide-stone-100">
            <li
              v-for="(row, i) in ranking"
              :key="row.name"
              class="flex items-center justify-between gap-3 bg-white px-4 py-3.5"
            >
              <div class="flex min-w-0 flex-1 items-center gap-3">
                <span
                  class="flex size-8 shrink-0 items-center justify-center rounded-lg text-sm tabular-nums"
                  :class="
                    i < 3
                      ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200/80'
                      : 'bg-stone-100 text-stone-700'
                  "
                >
                  {{ i + 1 }}
                </span>
                <span class="truncate font-semibold text-stone-900">{{ row.name }}</span>
              </div>
              <span
                class="shrink-0 rounded-md bg-stone-100 px-2.5 py-1 text-sm tabular-nums text-stone-800"
              >
                {{ row.elo }}
              </span>
            </li>
          </ul>
        </UCard>
      </section>

      <footer class="shrink-0 border-t border-stone-200/80 bg-white/80 py-3 backdrop-blur-sm" />
    </main>
  </div>
</template>

<style scoped>
.reveal-line {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--reveal-delay, 0ms);
}

.reveal-line--on {
  opacity: 1;
  transform: translateY(0);
}

.match-cta {
  box-shadow:
    0 12px 28px -8px rgb(5 150 105 / 0.45),
    0 0 0 0 rgb(16 185 129 / 0.3);
  animation: match-pulse 2.5s ease-in-out infinite;
}

@keyframes match-pulse {
  0%,
  100% {
    box-shadow:
      0 12px 28px -8px rgb(5 150 105 / 0.4),
      0 0 0 0 rgb(16 185 129 / 0.25);
  }
  50% {
    box-shadow:
      0 16px 32px -10px rgb(5 150 105 / 0.55),
      0 0 0 14px rgb(16 185 129 / 0);
  }
}

@keyframes hero-glow {
  0%,
  100% {
    opacity: 0.65;
    transform: scale(1) translateX(0);
  }
  50% {
    opacity: 0.95;
    transform: scale(1.03) translateX(2px);
  }
}

.match-shimmer {
  background: linear-gradient(
    105deg,
    transparent 0%,
    transparent 38%,
    rgb(255 255 255 / 0.28) 50%,
    transparent 62%,
    transparent 100%
  );
  background-size: 220% 100%;
  animation: match-shimmer 2.5s ease-in-out infinite;
}

@keyframes match-shimmer {
  0% {
    background-position: 120% 0;
  }
  100% {
    background-position: -120% 0;
  }
}
</style>
