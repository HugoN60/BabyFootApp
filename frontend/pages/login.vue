<script setup lang="ts">
useHead({ title: 'BabyFootApp — Connexion' })
</script>

<template>
  <div class="flex min-h-dvh flex-col items-center justify-center gap-4 px-4">
    <p class="text-xs font-semibold uppercase tracking-wider text-red-700">BabyFootApp</p>
    <h1 class="text-lg font-semibold text-stone-800">Connexion</h1>
    <p class="text-center text-sm text-stone-500">Page à brancher sur l’API d’authentification.</p>
    <UButton to="/" variant="soft" color="primary">Retour</UButton>
  </div>
</template>
