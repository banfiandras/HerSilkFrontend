<script setup>
import DataService from "../services/dataservice";
import { ref, onMounted } from "vue";

const kategoriak = ref([]);
const valamik = ref([]);
const valasztottKategoriaNev = ref();
const valasztottKategoriaId = ref();
const kiválasztottValamik = ref([]);

onMounted(() => {
  // Ez akkor fut le, amikor betöltődik a HomeView komponens
}),
  DataService.getAllKategoria()
    .then((resp) => {
      kategoriak.value = resp;
      //console.log(kategoriak.value);
    })
    .catch((err) => {
      console.log(err);
    });

DataService.getAllValami()
  .then((resp) => {
    valamik.value = resp;
    //console.log(valamik.value);
  })
  .catch((err) => {
    console.log(err);
  });

const valaszto = () => {
  // Ha a backend-en nincs olyan végpont, ami csak a kiválasztott id-jű elemeket adja vissza,
  // akkor az összes elemet le kell kérni és kiválogatni közülük a megfelelőket:
  valasztottKategoriaId.value = kategoriak.value.find(
    (k) => k.nev === valasztottKategoriaNev.value
  ).id;
  console.log(valasztottKategoriaId.value);
  kiválasztottValamik.value = valamik.value.filter(
    (v) => v.kategoriaId === valasztottKategoriaId.value
  );
  console.log(kiválasztottValamik.value);

  // ha van megfelelő végpont (és kellene, hogy legyen) akkor használjuk azt (:
};
</script>

<template>
  <select v-model="valasztottKategoriaNev" @change="valaszto">
    <option v-for="kategoria in kategoriak">{{ kategoria.nev }}</option>
  </select>
  <ul class="m-4">
    <li v-for="valami in kiválasztottValamik">{{ valami.nev }}</li>
  </ul>
</template>
