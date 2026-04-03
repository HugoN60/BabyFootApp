<script setup lang="ts">
useHead({ title: 'BabyFootApp — Connexion' })
</script>

<template>
  <div
    class="flex min-h-dvh flex-col items-center justify-center gap-4 bg-transparent px-4 dark:text-neutral-100"
  >
    <p class="text-xs font-semibold uppercase tracking-wider text-red-700 dark:text-red-400">
      BabyFootApp
    </p>
    <h1 class="text-lg font-semibold text-stone-800 dark:text-neutral-100">Connexion</h1>
    <p class="text-center text-sm text-stone-500 dark:text-neutral-400">
      Page à brancher sur l’API d’authentification.
    </p>
    <div class="flex flex-col items-center gap-3">
      <UButton to="/" variant="soft" color="primary">Retour</UButton>
      <UColorModeButton
        square
        size="lg"
        class="border border-stone-200 dark:border-neutral-700"
      />
    </div>
  </div>
</template>
