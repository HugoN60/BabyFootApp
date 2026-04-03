<script setup lang="ts">
useHead({
  title: 'BabyFootApp',
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' }
  ]
})

const ranking = computed(() =>
  Array.from({ length: 10 }, (_, i) => ({
    label: `Texte${12 + i}`,
    elo: 1892 - i * 32
  }))
)

const scrollRoot = ref<HTMLElement | null>(null)

onMounted(() => {
  const root = scrollRoot.value
  if (!root || typeof IntersectionObserver === 'undefined') {
    root?.querySelectorAll('[data-reveal-panel]').forEach((el) => el.classList.add('panel-visible'))
    return
  }
  const panels = root.querySelectorAll('[data-reveal-panel]')
  const ob = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('panel-visible')
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  )
  panels.forEach((p) => ob.observe(p))
  onUnmounted(() => ob.disconnect())
})
</script>

<template>
  <div
    class="flex min-h-dvh flex-col bg-[linear-gradient(180deg,#f5f5f4_0%,#fafaf9_38%,#fef2f2_100%)] pt-[env(safe-area-inset-top)] pb-[max(0.75rem,env(safe-area-inset-bottom))]"
  >
    <header
      class="sticky top-0 z-20 flex shrink-0 items-center justify-between border-b border-red-100/80 bg-white/90 px-3 py-2 backdrop-blur-md"
    >
      <span class="pl-1 text-sm font-bold tracking-tight text-red-700">BabyFootApp</span>
      <nav class="flex items-center gap-0.5">
        <UButton
          icon="i-lucide-home"
          variant="ghost"
          color="neutral"
          size="lg"
          square
          class="text-stone-800 hover:bg-stone-100 hover:text-stone-950"
          aria-label="Texte23"
        />
        <UButton
          icon="i-lucide-trophy"
          variant="ghost"
          color="neutral"
          size="lg"
          square
          class="text-stone-800 hover:bg-stone-100 hover:text-stone-950"
          aria-label="Texte24"
        />
        <UButton
          variant="ghost"
          color="neutral"
          size="lg"
          square
          class="profile-attn-btn text-stone-800 hover:bg-stone-100/80"
          aria-label="Texte25"
        >
          <span class="profile-attn-icon inline-flex items-center justify-center">
            <UIcon name="i-lucide-user-round" class="size-6" />
          </span>
        </UButton>
        <UButton
          icon="i-lucide-menu"
          variant="ghost"
          color="neutral"
          size="lg"
          square
          class="text-stone-800 hover:bg-stone-100 hover:text-stone-950"
          aria-label="Texte27"
        />
      </nav>
    </header>

    <main ref="scrollRoot" class="flex flex-1 flex-col">
      <!-- Hero (template Nuxt UI) -->
      <section
        data-reveal-panel
        class="panel panel-visible relative min-h-[58dvh] overflow-hidden py-8"
        aria-labelledby="hero-title"
      >
        <div
          class="pointer-events-none absolute -right-16 top-0 size-52 rounded-full bg-red-400/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          class="pointer-events-none absolute bottom-0 -left-12 size-44 rounded-full bg-rose-500/15 blur-3xl"
          aria-hidden="true"
        />

        <UPageHero
          class="relative"
          :ui="{
            root: 'py-0',
            container: 'px-5 sm:px-5',
            wrapper: 'gap-3 sm:gap-4',
            header: 'gap-2 sm:gap-3',
            title: 'text-4xl sm:text-5xl font-extrabold tracking-tight text-red-950',
            description: 'text-base sm:text-lg text-stone-600 leading-snug max-w-md'
          }"
        >
          <template #headline>
            <span
              class="panel-inner inline-flex w-fit rounded-full border border-red-200/90 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-red-800 shadow-sm backdrop-blur-sm"
              style="--reveal-delay: 0ms"
            >
              Texte3
            </span>
          </template>
          <template #title>
            <span id="hero-title" class="panel-inner block" style="--reveal-delay: 70ms">
              BabyFootApp
            </span>
          </template>
          <template #description>
            <span class="panel-inner block" style="--reveal-delay: 140ms">Texte5</span>
          </template>
        </UPageHero>
      </section>

      <UPageSection
        data-reveal-panel
        as="section"
        class="panel py-8"
        :ui="{
          container: 'px-5 sm:px-5',
          wrapper: 'gap-3',
          header: 'gap-2',
          title: 'text-2xl sm:text-3xl font-bold text-stone-900',
          description: 'text-base text-stone-600 leading-relaxed'
        }"
      >
        <template #title>
          <h2 class="panel-inner text-2xl font-bold text-stone-900 sm:text-3xl" style="--reveal-delay: 0ms">
            Texte6
          </h2>
        </template>
        <template #description>
          <p class="panel-inner text-base leading-relaxed text-stone-600" style="--reveal-delay: 80ms">
            Texte7
          </p>
        </template>
      </UPageSection>

      <UPageSection
        data-reveal-panel
        as="section"
        class="panel py-8"
        :ui="{
          container: 'px-5 sm:px-5',
          wrapper: 'gap-3',
          header: 'gap-2',
          title: 'text-2xl sm:text-3xl font-bold text-stone-900',
          description: 'text-base text-stone-600 leading-relaxed'
        }"
      >
        <template #title>
          <h2 class="panel-inner text-2xl font-bold text-stone-900 sm:text-3xl" style="--reveal-delay: 0ms">
            Texte8
          </h2>
        </template>
        <template #description>
          <p class="panel-inner text-base leading-relaxed text-stone-600" style="--reveal-delay: 80ms">
            Texte9
          </p>
        </template>
      </UPageSection>

      <!-- Classement -->
      <section data-reveal-panel class="panel px-5 pb-6 pt-4" aria-labelledby="ranking-heading">
        <h2
          id="ranking-heading"
          class="panel-inner text-2xl font-bold text-stone-900 sm:text-3xl"
          style="--reveal-delay: 0ms"
        >
          Texte10
        </h2>
        <p class="panel-inner mt-1 text-sm text-stone-500" style="--reveal-delay: 60ms">Texte11</p>

        <UCard
          class="panel-inner mt-4 border border-stone-200/90 bg-white shadow-sm ring-0"
          style="--reveal-delay: 120ms"
          :ui="{ body: { padding: 'p-0 sm:p-0' }, root: 'overflow-hidden rounded-2xl' }"
        >
          <ul class="divide-y divide-stone-100">
            <li
              v-for="(row, i) in ranking"
              :key="row.label"
              class="flex items-center justify-between gap-3 bg-white px-3 py-3"
            >
              <div class="flex min-w-0 flex-1 items-center gap-2.5">
                <UBadge
                  :label="String(i + 1)"
                  size="md"
                  variant="subtle"
                  :color="i < 3 ? 'warning' : 'neutral'"
                  class="min-w-8 justify-center tabular-nums"
                />
                <span class="truncate text-sm font-semibold text-stone-900">{{ row.label }}</span>
              </div>
              <span
                class="shrink-0 rounded-md bg-stone-100 px-2.5 py-1 text-xs font-medium tabular-nums text-stone-800"
              >
                {{ row.elo }}
              </span>
            </li>
          </ul>
        </UCard>
      </section>

      <!-- CTA -->
      <UPageCTA
        data-reveal-panel
        as="section"
        class="panel py-8 pb-10"
        :ui="{
          root: 'py-0',
          container: 'px-5 sm:px-5 max-w-sm mx-auto',
          wrapper: 'gap-4'
        }"
      >
        <template #body>
          <div class="panel-inner w-full" style="--reveal-delay: 0ms">
            <div class="relative w-full">
              <div
                class="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-red-400 via-rose-500 to-red-600 opacity-80 blur-sm"
                style="animation: hero-glow 4s ease-in-out infinite"
                aria-hidden="true"
              />
              <UButton
                size="xl"
                color="primary"
                icon="i-lucide-swords"
                label="Texte22"
                class="match-cta relative w-full overflow-hidden rounded-2xl px-5 py-3.5 text-base font-semibold ring-0"
                block
              />
            </div>
          </div>
        </template>
      </UPageCTA>

      <footer class="shrink-0 border-t border-stone-200/80 bg-white/80 py-3 backdrop-blur-sm" />
    </main>
  </div>
</template>

<style scoped>
.panel:not(.panel-visible) .panel-inner {
  opacity: 0;
  transform: translateY(16px);
}

.panel.panel-visible .panel-inner {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--reveal-delay, 0ms);
}

/*
  Connexion / profil : cycle long, puis fondu blanc → primaire → blanc
  + secousse gauche-droite rapide uniquement pendant ce laps de temps.
*/
.profile-attn-btn {
  animation: profile-bg 10s ease-in-out infinite;
}

.profile-attn-icon {
  display: inline-flex;
  animation: profile-shake 10s ease-in-out infinite;
}

@keyframes profile-bg {
  0%,
  72%,
  100% {
    background-color: transparent;
    color: rgb(41 37 36);
  }

  /* Fondu blanc → rouge primaire → blanc */
  73% {
    background-color: rgb(255 255 255);
    color: rgb(185 28 28);
  }
  76% {
    background-color: rgb(220 38 38);
    color: rgb(255 255 255);
  }
  79% {
    background-color: rgb(255 255 255);
    color: rgb(185 28 28);
  }
  /* Retour discret */
  82%,
  84% {
    background-color: transparent;
    color: rgb(41 37 36);
  }
}

@keyframes profile-shake {
  0%,
  72.4%,
  81.6%,
  100% {
    transform: translateX(0);
  }
  /* Gauche-droite rapide, calé sur le fondu du bouton (~73 % → ~81 %) */
  72.5% {
    transform: translateX(6px);
  }
  72.65% {
    transform: translateX(-6px);
  }
  72.8% {
    transform: translateX(6px);
  }
  72.95% {
    transform: translateX(-6px);
  }
  73.1% {
    transform: translateX(6px);
  }
  73.25% {
    transform: translateX(-6px);
  }
  73.4% {
    transform: translateX(6px);
  }
  73.55% {
    transform: translateX(-6px);
  }
  73.7% {
    transform: translateX(6px);
  }
  73.85% {
    transform: translateX(-6px);
  }
  74% {
    transform: translateX(6px);
  }
  74.15% {
    transform: translateX(-6px);
  }
  74.3% {
    transform: translateX(6px);
  }
  74.45% {
    transform: translateX(-6px);
  }
  74.6% {
    transform: translateX(6px);
  }
  74.75% {
    transform: translateX(-6px);
  }
  74.9% {
    transform: translateX(6px);
  }
  75.05% {
    transform: translateX(-6px);
  }
  75.2% {
    transform: translateX(6px);
  }
  75.35% {
    transform: translateX(-6px);
  }
  75.5% {
    transform: translateX(6px);
  }
  75.65% {
    transform: translateX(-6px);
  }
  75.8% {
    transform: translateX(6px);
  }
  75.95% {
    transform: translateX(-6px);
  }
  76.1% {
    transform: translateX(6px);
  }
  76.25% {
    transform: translateX(-6px);
  }
  76.4% {
    transform: translateX(6px);
  }
  76.55% {
    transform: translateX(-6px);
  }
  76.7% {
    transform: translateX(6px);
  }
  76.85% {
    transform: translateX(-6px);
  }
  77% {
    transform: translateX(6px);
  }
  77.15% {
    transform: translateX(-6px);
  }
  77.3% {
    transform: translateX(6px);
  }
  77.45% {
    transform: translateX(-6px);
  }
  77.6% {
    transform: translateX(6px);
  }
  77.75% {
    transform: translateX(-6px);
  }
  77.9% {
    transform: translateX(6px);
  }
  78.05% {
    transform: translateX(-6px);
  }
  78.2% {
    transform: translateX(6px);
  }
  78.35% {
    transform: translateX(-6px);
  }
  78.5% {
    transform: translateX(6px);
  }
  78.65% {
    transform: translateX(-6px);
  }
  78.8% {
    transform: translateX(6px);
  }
  78.95% {
    transform: translateX(-6px);
  }
  79.1% {
    transform: translateX(6px);
  }
  79.25% {
    transform: translateX(-6px);
  }
  79.4% {
    transform: translateX(6px);
  }
  79.55% {
    transform: translateX(-6px);
  }
  79.7% {
    transform: translateX(6px);
  }
  79.85% {
    transform: translateX(-6px);
  }
  80% {
    transform: translateX(6px);
  }
  80.15% {
    transform: translateX(-6px);
  }
  80.3% {
    transform: translateX(6px);
  }
  80.45% {
    transform: translateX(-6px);
  }
  80.6% {
    transform: translateX(0);
  }
}

.match-cta {
  box-shadow:
    0 10px 24px -8px rgb(220 38 38 / 0.45),
    0 0 0 0 rgb(239 68 68 / 0.3);
  animation: match-pulse 2.5s ease-in-out infinite;
}

@keyframes match-pulse {
  0%,
  100% {
    box-shadow:
      0 10px 24px -8px rgb(220 38 38 / 0.38),
      0 0 0 0 rgb(239 68 68 / 0.22);
  }
  50% {
    box-shadow:
      0 14px 28px -8px rgb(220 38 38 / 0.55),
      0 0 0 12px rgb(239 68 68 / 0);
  }
}

@keyframes hero-glow {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(1) translateX(0);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.02) translateX(2px);
  }
}
</style>
