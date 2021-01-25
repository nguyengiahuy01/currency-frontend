<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-custom-blue-dark">
        <q-toolbar-title>
          Currency Exchange
        </q-toolbar-title>
        <div>Gia Huy Nguyen</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      //
    }
  }
}
</script>
